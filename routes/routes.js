var request = require("request");
// Scrapes our HTML
var cheerio = require("cheerio");
//Bring in models
var Article = require("../models/Article.js");
var Comment = require("../models/Comment.js");



module.exports = function(app) {

//Redirect to homepage
app.get("/", function(req, res){
    res.redirect("/home");
});

//Load the homepage
app.get("/home", function(req,res){

    res.render("home");

})

//Scrape function
app.get("/scrape", function(req, res){
    request("https://www.reddit.com/r/gaming", function(error, response, html) {

      if (error){
        console.log(error)
      }
      else {
        // Load the body of the HTML into cheerio
        var $ = cheerio.load(html);

        // Empty array to save our scraped data
        var result = [];

        // With cheerio, find each h4-tag with the class "headline-link"
        $("p.title").each(function(i, element) {

          var result = {};
          // Save the text of the h4-tag as "title"
          result.title = $(this).text();

          // Find the h4 tag's parent a-tag, and save it's href value as "link"
          result.link = $(element).children().attr("href");

          // For each h4-tag, make an object with data we scraped and push it to the result array
          var entry = new Article(result);

          entry.save(function(err, doc){
            if (err){
              console.log(err);
            }
            else{
              console.log(doc);
            }
          });

        });
      }


    });
    res.redirect("/home");
  });

app.get("/save", function(req, res){

});




}
// Making a request call for nhl.com's homepage
