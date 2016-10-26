function isUnsafe(compareChar){
  var unsafeString = "\"<>%\\^[]`\+\$\,";
  if (unsafeString.indexOf(compareChar) == -1 && compareChar.charCodeAt(0) > 32 && compareChar.charCodeAt(0) < 123){
    return false;
  }else{return true;}
}
function decToHex(num, radix){
  var hexVals = new Array("0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F");
  var hexString = "";
  while (num >= radix){
    temp = num % radix;
    num = Math.floor(num / radix);
    hexString += hexVals[temp];
  }
  hexString += hexVals[num];
  return reversal(hexString);
}
function reversal(s){
  var len = s.length;
  var trans = "";
  for (i=0; i<len; i++){ trans = trans + s.substring(len-i-1, len-i); }
  s = trans;
  return s;
}
function convert(val){
  return "%" + decToHex(val.charCodeAt(0), 16);
}

module.exports = {
  getParams: function(qs){
    var qs = qs.split("+").join(" ");
    var params = {}, tokens,
    re = /[?&]?([^=]+)=([^&]*)/g;
    var first = 1;
    while (tokens = re.exec(qs)){
      if(first == 1){
        var tempParam = tokens[1].split('?');
        params[decodeURIComponent(tempParam[1])] = decodeURIComponent(tokens[2]);
        first = 0;
      }else{
      params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
      }
    }
    return params;
  },
  at: function(){
    return String(new Date().getTime());
  },
  objectLength: function(obj){
    var size = 0;
    for(var key in obj){
    if(obj.hasOwnProperty(key)) size++;
    }
    return size;
  },
  getUuid: function(mask){
    return mask.replace(/[xy]/g, function(c) {var r = Math.random()*16|0,v=c=='x'?r:r&0x3|0x8;return v.toString(16);});
  },
  clone: function(obj){
    if(obj === null || typeof obj  !== 'object'){
    return obj;
    }else{
    var temp = obj.constructor();
    for(var key in obj){
      temp[key] = this.clone(obj[key]);
    }
    return temp;
    }
  },
  rawUrl: function(val,encode){
    if(typeof encode == 'undefined'){encode=1;}
    var len = val.length;
    var backlen = len;
    var i = 0;
    var newStr = "";
    var frag = "";
    var encval = "";
    var original = val;
    if(encode == 0){
      while(backlen > 0){
        var lastpercent = val.lastIndexOf("%");
        if(lastpercent != -1){
          frag = val.substring(lastpercent+1,val.length);
          val  = val.substring(0,lastpercent);
          if(frag.length >= 2){
            encval = frag.substring(0,2);
            newStr = frag.substring(2,frag.length) + newStr;
            if("01234567890abcdefABCDEF".indexOf(encval.substring(0,1)) != -1 && "01234567890abcdefABCDEF".indexOf(encval.substring(1,2)) != -1){
              encval = String.fromCharCode(parseInt(encval, 16));
              newStr = encval + newStr;
            }
          }
          backlen = lastpercent;
        }else{newStr = val + newStr; backlen = 0;}
      }
    }else{
      for(i=0;i<len;i++){
        if (val.substring(i,i+1).charCodeAt(0) < 255){
          if(isUnsafe(val.substring(i,i+1)) == false){
            newStr = newStr + val.substring(i,i+1);
          }else{
            newStr = newStr + convert(val.substring(i,i+1));
          }
        }else{
          console.log("Found a non-ISO-8859-1 character at position: " + (i+1) + ",\nPlease eliminate before continuing.");
          document.forms[0].state.value = "none";
          document.forms[0].enc[0].checked = true;
          newStr = original; i=len;
        }
      }
    }
    return newStr;
  }
};
