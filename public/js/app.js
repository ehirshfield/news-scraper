$(document).ready(function(){

  //Call for our server to scrape the website for articles to view
  $(".scraper").on("click", function(){
    $(".articleContainer").empty();
    $.get("/scrape", function(response){
      console.log("Scrape initiated! " + response.length);
      for (i=0; i < response.length; i++){
        displayUnsavedArticles(response[i]);
      }

    });
  });

  //Generate all the articles onto the HTML
  function displayUnsavedArticles(articleData){
    if (articleData.thumbnail === undefined || articleData.thumbnail === ""){
      articleData.thumbnail = "/img/ocean.jpg";
      $("<div class='indivArticle'></div>").append("<h2>" + articleData.title + "</h2>")
      .append("<p class='link'>" + articleData.link + "</p>")
      .append("<img src=" + articleData.thumbnail + " width='70' height='70'>")
      .append("<div class='saveDiv'><a class='btn btn-default saveBtn'>Save</a></div>")
      .appendTo(".articleContainer");
    }
    else{
      $("<div class='indivArticle'></div>").append("<h2>" + articleData.title + "</h2>")
      .append("<p class='link'>" + articleData.link + "</p>")
      .append("<img src=" + articleData.thumbnail + " width='70' height='70'>")
      .append("<div class='saveDiv'><a class='btn btn-default saveBtn'>Save</a></div>")
      .appendTo(".articleContainer");
    }
  }

  //Save an article to the database
  $('body').on("click", "a.saveBtn", function(){
    console.log("click worked!");
    $(this).prop("disabled",true).html("Saved");
    $.post("/save", {
      title: $(this).parent().parent().children('h2').text(),
      link: $(this).parent().parent().children('p.link').text(),
      thumbnail: $(this).parent().parent().children('img').attr('src')
    })
    .done(function(response){
      console.log("Server post response");
    });

  });

  $('.deleteBtn').on("click", function(){
    getRecordID();
  });



  $('.noteBtn').on('show.bs.modal', function (event) {
    var button = $(event.relatedTarget) // Button that triggered the modal
    var title = button.parent().children('h2').text();
    var articleID = button.parent().children('h2').attr('data-id');
    var modal = $(this);
    //AJAX request for all the comments
    $.get("/api/articles/:id", {
      _id: articleID
    })
    .done(function(response){

      for (i=0; i < response.length; i++){
        console.log(response[i].comment);
        var comment = response[i].comment;
        modal.find('.modal-body')
        .append("<p>" + comment + "</p>")
        .append("<button class='btn btn-warning deleteBtn'>X</button>")
      }

    });

    modal.find('.modal-title').text('Notes for ' + title)
    // modal.find('.modal-body input').val(recipient)

  });

  $('.addNoteBtn').on('click', function(){

  })


});
