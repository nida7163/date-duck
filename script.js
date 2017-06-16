$("#search").on("click",function(){

 //url request to the eventful API(this will access our events)
  var eventfulAPI ="http://api.eventful.com/json/events/search?q=events&l=atlanta&app_key=hgq8L8N2RrKJmWBr"
  
//run ajax to send a request to the eventful server
     $.ajax({
      url: eventfulAPI,
      method: "GET"
      }) 






     
-