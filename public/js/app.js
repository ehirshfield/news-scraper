$(document).ready(function(){

  $(".scraper").on("click", function(){
    $.get("/scrape", function(response){
      console.log("Scrape initiated! " + response.length);
    });
  });






});
