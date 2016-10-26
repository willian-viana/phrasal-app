###Crawler-js
---
Open source crawler framework

I was upset not to have something simple to extract information to do experiments. Thus was born the CrawlerJS, a platform that enables extract information from any websites without having to keep worrying about developing.

Rodrigo Matheus

## Example to use

```js
var crawlerjs = require('crawler-js');

var worlds = {
  interval: 1000,
  getSample: 'http://www.tibia.com/community/?subtopic=worlds',
  get: 'http://www.tibia.com/community/?subtopic=worlds',
  preview: 0,
  extractors: [
    {
      selector: '.TableContentContainer table.TableContent tr',
      callback: function(err, html, url, response){
        console.log('Crawled url:');
        console.log(url);
        // console.log(response); // If you need see more details about request
        if(!err){
          data = {};
          data.world = html.children('td').eq(0).children('a').attr('href');
          if(typeof data.world == 'undefined'){
            delete data.world;
          }
          console.log(data);
        }else{
          console.log(err);
        }
      }
    }
  ]
}

crawlerjs(worlds);
```

## See more examples on Examples path
