

// Event listener for all button elements
    // $("button").on("click", function() {
      // In this case, the "this" keyword refers to the button that was clicked
      var person = $(this).attr("data-location");

      // Constructing a URL to search Giphy for the name of the person who said the quote
      var queryURL = https://developers.zomato.com/api/v2.1/search?entity_id=216

        apiKey = "a77859323ad5ee4a5ab226d9d3126128";

      // Performing our AJAX GET request
      $.ajax({
          url: queryURL,
          method: "GET"
        })
        // After the data comes back from the API
        .done(function(response) {
          // Storing an array of results in the results variable
          var results = response.data;
          console.log(results)

        });
    // });