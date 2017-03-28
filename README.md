![N|Solid](https://media4.giphy.com/media/26gssIytJvy1b1THO/200_s.gif)

# Reddit Aww Article Scraper
RAAS is a news scraper that takes all of the articles from the website reddit.com/r/aww and puts them in a neat list to save and explore.

  - Hit the "Scrape" button
  - Watch as the current front page results populate the page
  - Save any article you like using MongoDB

### Tech

RAAS uses a number of open source projects to work properly:

* [Cheerio](https://cheerio.js.org/) - Server-side jQuery
* [MongoDB](https://www.mongodb.com/) - Document oriented database program
* [Mongoose](http://mongoosejs.com/) - MongoDB object modeling tool
* [mLab](https://mlab.com/) - Online MongoDB database
* [jQuery](http://jquery.com/) - JavaScript library good for AJAX calls and DOM manipulation
* [Twitter Bootstrap](http://getbootstrap.com/) - Front-end framework
* [Node.js](https://nodejs.org/en/) - Server-side platform
* [Express](https://expressjs.com/) - Light-weight web application framework for Node.js
* [Handlebars](http://handlebarsjs.com/) - Templating engine
* [Body-Parser](https://www.npmjs.com/package/body-parser) - Node.js body parsing middleware


### Installation

RAAS requires [Node.js](https://nodejs.org/) v4+ to run.

Install the dependencies and devDependencies and start the server.

```sh
$ cd news-scraper
$ npm install -d
$ node server
```

For production environments...

* https://news-scraper-aww.herokuapp.com/

### Development

Found a bug or want to contribute?

Email me at ehirshfield@gmail.com


### Todos

 - Add more sites than one to scrape from
 - Solve issue with links on reddit so users can click on links once scraped
 - Improve UI/UX of app

License
----

MIT
