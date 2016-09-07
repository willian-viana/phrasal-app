var Crawler = require("js-crawler");
// var crawlerjs = require('crawler-js');
var cheerio = require('cheerio');


var $;
var verb; 
var objectPhrase = {};


new Crawler().configure({depth: 2})
  .crawl("https://www.englishclub.com/ref/Phrasal_Verbs", function onSuccess(page) {
    // console.log(page.url);
    $ = cheerio.load(page.content.toString('utf-8'));
    // console.log($('.linklisting h3.linktitle a').text());

    verb = $('.linklisting h3.linktitle a').text();

    if(!(verb in objectPhrase) && verb != '' && verb != undefined) {
      objectPhrase[verb] = true;
    }

  });
  
  console.log(Object.keys(objectPhrase));


// var phrasals = {
//   interval: 1000,
//   getSample: 'https://www.englishclub.com/ref/Phrasal_Verbs/A/',
//   get: 'https://www.englishclub.com/ref/Phrasal_Verbs/A/',
//   preview: 0,
//   extractors: [
//     {
//       selector: '.linklisting h3.linktitle',
//       callback: function(err, html, url, response){
//         // console.log('Crawled url:');
//         // console.log(url);
//         // console.log(response); // If you need see more details about request 
//         if(!err){
//           data = {};
//           data.world = html.children('a').text();
//           if(typeof data.world == 'undefined'){
//             delete data.world;
//           }
//           console.log(data);
//         }else{
//           console.log(err);
//         }
//       }
//     }
//   ]
// }
 
// crawlerjs(phrasals);
