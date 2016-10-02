# Phrasal App

PhrasalApp is a simple app to look for english sentences.

  - Fast searching
  - Simple layout
  - User friendly

You can also:

  - Help to translate the sentences
  - Save the phrasal verbs


Phrasal Verbs is a couple of verbs who together have the meaning changed. e.g.:

  - Get up
  - Stand up
  - Look for
  - Look up


### Tools used

PhrasalApp uses:

* [AngularJS]
* [node.js]
* [Express]
* [Grunt]
* [CSS3]
* [jQuery]
* [Ionic]



### Installation

PhrasalApp requires [Node.js](https://nodejs.org/) v4+ to run.

Download and extract the [latest pre-built release](https://bitbucket.org/willian_batista/phrasal-verbs/downloads).

Install the dependencies and devDependencies and start the server.

```sh
$ cd phrasal-verbs
$ npm install
```

After that, you must run the crawler to use the phrasal verbs. (We supposed that you have the mongodb installed and running).


```sh
$ cd back-end
$ cd crawler
$ node index.js
```

If no problem happened, we have a collection on mongoDB and many phrasal verbs to use, so far. Now, we should run our API.

```sh
$ cd ..
$ node app.js
```


Our API is running on port 3000. If you wish to change it, you must change the "app.js" archive.


Congratulations!

You have our API running and many phrasal verbs to look for. 

Now, you can use it with [ours front-end](https://bitbucket.org/willian_batista/phrasal-verbs/downloads) or use yours.