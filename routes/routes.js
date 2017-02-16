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

});

//Scrape function
app.get("/scrape", function(req, res){
    request("https://www.reddit.com/r/aww", function(error, response, html) {

      if (error){
        console.log(error)
      }
      else {
        // Load the body of the HTML into cheerio
        var $ = cheerio.load(html);

        // Empty array to save our scraped data
        var result = [];

        // With cheerio, find each h4-tag with the class "headline-link"
        $("div.thing").each(function(i, element) {


          // Save the text of the h4-tag as "title"
          var title= $(element).children('div.entry').children('p.title').text();

          // Find the h4 tag's parent a-tag, and save it's href value as "link"
          var link = $(element).children('a.thumbnail').attr("href");

          var thumbnail = $(element).children('a.thumbnail').children().attr("src");

          // For each h4-tag, make an object with data we scraped and push it to the result array
          result.push({
            title: title,
            link: link,
            thumbnail: thumbnail
          });

        });


        console.log(result);
        res.json(result);
      }
    });

  });

app.post("/save", function(req, res){

    console.log(req.body);
    var newArticle = new Article(req.body);

    newArticle.save(function(error, docs){
      if (error){
        console.log(error);
      }
      else{
        console.log("success!");
      }
    });
  });

  //Go to the saved articles page
  app.get("/articles", function(req, res){

    Article.find({})
    .exec(function(err, doc){
      if (err) {
        console.log(err)
      }
      else{
        console.log(doc);
        res.render("saved", {article: doc});
      }
    });

  })

  app.get("/articles/:id", function(req, res){
    Article.findOne({"_id": req.params.id})
    .populate("comment")
    .exec(function(err, doc){
      if (err) {
        console.log("database error: " + err);
      }
      else {
        console.log(doc);
        res.json(doc);
      }
    })

  });

  app.post("/articles/:id", function(req, res){
    var newComment = new Comment(req.body);

    newComment.save(function(err, doc){
      if (err){
        console.log(err);
      }
      else{
        Article.findOneAndUpdate({"_id": req.params.id}, {$push: {"comment": doc._id}}, {new: true})
        .exec(function(err, doc){
          if (err){
            console.log("Error updating comment: " + err);
          }
          else{
            res.send(doc);
          }
        })
      }
    })
  })

  app.delete("/articles/:id", function(req, res){
    Article.findOneAndRemove({"_id": req.params.id})
    .exec(function(err, doc){
      if (err) {
        console.log("database error: " + err);
      }
      else {
        res.send(doc);
      }
    })
  });

  app.delete("/comments/:id", function(req, res){
    Comment.findOneAndRemove({"_id": req.params.id})
    .exec(function(err, doc){
      if (err) {
        console.log("database error: " + err);
      }
      else {
        res.send(doc);
      }
    })
  });

}
