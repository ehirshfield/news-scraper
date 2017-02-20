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
      var captionDiv = $('<div class="caption article-title">').append('<h3 clss="article-title">'+ articleData.title + '</h3>')
      .append('<p hidden>'+ articleData.link +'</p>')
      .append("<div class='saveDiv'><a class='btn btn-default saveBtn'>Save</a></div>");
      $('<div class="indivArticle thumbnail col-md-4">').append('<img src=' + articleData.thumbnail + ' data-holder-rendered="true" style="height: 100px; width: 100px; display: block;">')
      .append(captionDiv)
      .appendTo(".articleContainer");
    }
    else{
      var captionDiv = $('<div class="caption article-title">').append('<h3 clss="article-title">'+ articleData.title + '</h3>')
      .append('<p hidden>'+ articleData.link +'</p>')
      .append("<div class='saveDiv'><a class='btn btn-default saveBtn'>Save</a></div>");
      $('<div class="indivArticle thumbnail col-md-4">').append('<img src=' + articleData.thumbnail + ' data-holder-rendered="true" style="height: 100px; width: 100px; display: block;">')
      .append(captionDiv)
      .appendTo(".articleContainer");

    }
  }

  //Save an article to the database
  $('body').on("click", "a.saveBtn", function(){
    console.log("click worked!");
    $(this).prop("disabled",true).html("Saved");
    $.post("/save", {
      title: $(this).parent().parent().children('h3').text(),
      link: $(this).parent().parent().children('p').text(),
      thumbnail: $(this).parent().parent().parent().children('img').attr('src')
    })
    .done(function(response){
      console.log("Server post response");
    });

  });

  $('.noteBtn').on('show.bs.modal', function (event) {
    $('.comment-section').empty();
    var button = $(event.relatedTarget) // Button that triggered the modal
    var title = button.parent().children('a').children('h2').text();
    var articleID = button.parent().children('a').children('h2').attr('data-id');
    var modal = $(this);
    //AJAX request for all the comments
    $.ajax({
    method: "GET",
    url: "/articles/" + articleID
    })
    .done(function(response){
        console.log(response.comment[0]);
        for (i=0; i< response.comment.length; i++){
          var comment = response.comment[i].comment;
          modal.find('.comment-section')
          .prepend("<div class='commentDiv'><p class='inlineTry pComment' >" + comment + "</p><button class='btn btn-warning deleteCommentBtn inlineTry' data-dismiss='modal' data-comment-id="+response.comment[i]._id+">X</button></div>");

        }
        $('.inlineTry').css('display', 'inline-block');
        $('.pComment').css('margin-right', '10px');

      });
      modal.find('.modal-title').text('Comments for ' + title)


    $('.addNoteBtn').on('click', function(){
      var newNote = $("#comment-text").val().trim();
      if (newNote === "") {
        return;
      }
      else{
        $.ajax({
          method: "POST",
          url: "/articles/" + articleID,
          data: {
            comment: $("#comment-text").val()
          }
        })
        .done(function(response){
          console.log("Successfully posted: " + response);
          $("#comment-text").val("");
        });
      }
    });

    $('div').on("click", "button.deleteCommentBtn", function(event){

      var commentID = $(this).attr('data-comment-id');
      console.log(commentID);
      $.ajax({
        method: "DELETE",
        url: "/comments/" + commentID
      })
      .done(function(response){
        console.log("Deleted!");

      });
    });

  });

  $('.noteBtn').on('hidden.bs.modal', function (event) {
    location.reload();
  });

  $(".deleteArticleBtn").on("click", function(event){
    var articleID = $(this).parent().children('a').children('h2').attr('data-id');
    $.ajax({
      method: "DELETE",
      url: "/articles/" + articleID
    })
    .done(function(response){
      console.log("Deleted!");
      location.reload();
    });
  });

  $body = $("body");

  $(document).on({
      ajaxStart: function() { $body.addClass("loading");    },
      ajaxStop: function() { $body.removeClass("loading"); }
  });

});
