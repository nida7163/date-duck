 // Initialize Firebase
  var config = {
    apiKey: "AIzaSyA8c0Kk-Ei2y4URupPcyNzXCiTJfofE6HY",
    authDomain: "date-duck.firebaseapp.com",
    databaseURL: "https://date-duck.firebaseio.com",
    projectId: "date-duck",
    storageBucket: "date-duck.appspot.com",
    messagingSenderId: "359049402122"
  };
  firebase.initializeApp(config);



// WEATHER UNDERGROUND API HERE

  // Weather Underground API key
  var wuAPIKey = "a4c27a2f36ce4003";

  // Here we are building the URL we need to query the database
  var queryURL = "http://api.wunderground.com/api/" + wuAPIKey + "/conditions/q/GA/Atlanta.json";

  // AJAX call to the Weather Underground API
  $.ajax({
    url: queryURL,
    method: "GET"
  })

      
  // retrieved data "response"
  .done(function(response) {
    console.log(queryURL);
    console.log(response);
    console.log("Current weather: " + response.current_observation.weather);
    console.log("Current temperature: " + response.current_observation.temp_f + " degrees(f)")

    $("#conditions").html("Weather conditions: " + response.current_observation.weather);
    $("#temperature").html("Temperature: " + response.current_observation.temp_f + " degrees(f)");
  });
  


//FOURSQUARE API HERE

var app = {};

var clientId = 'JFYFDNW4QYLUK5AKHG2LLQBJ2OMGE1J24X0NUHJTED0EQT4H'
var clientSecret = 'T5TVNZ4L3X0M3XFXURPGSA040NWBR4MCQG1VU05PWEI1ASZA'

app.romantic = function(query) {
	$.ajax({
		url: 'https://api.foursquare.com/v2/venues/search', 
		type: 'GET',
		dataType: 'jsonp',
		data: {
			client_id: clientId,
			client_secret: clientSecret,
			intent: 'browse',
			v: 20150513,
			format: 'jsonp', 
			near: 'Atlanta, GA',
			query: query, 
			limit: 6,
			openNow : true,
			sortByDistance: 1,
			venuePhotos : 1
		}, 
		success: function(data) {
			app.dataIwant = data.response.venues;
			app.displayRomantic(app.dataIwant);
		}
	});
};


app.displayRomantic = function(dateRomantic) {
	$('#dateNightResults').empty();
	$.each(dateRomantic, function(item, venue){
		// var photoSize = '500x500';
		// var photoPrefix = venue.photos.groups[0].items[0];
		var $venueTitle = '<h2>' + venue.name + '</h2>';
		var $venueLocation = '<p>' + venue.location.address + '</p>';
		// var $venuePhotos = $('<img>').attr('src', photoPrefix.prefix + photoPrefix.photoSize + photoPrefix.suffix);
		var $venueContainer = $('<div>').addClass('dateContainer').append($venueTitle, $venueLocation);

		$('#dateNightResults').append($venueContainer);
	});

}


// var $venuePhotos = $('<img>').attr('src', item.venue.photos.groups[0].items[0].prefix + photoSize + item.venue.photos.groups[0].items[0].suffix);

//OR

//venue photo
		// var photoPrefix = places[i].venue.photos.groups[0].items[0];
		// var photo = $('<img>').attr('src',photoPrefix.prefix + photoPrefix.height + photoPrefix.suffix);



	// Using dateType need to get a random number and select a random element from date type
	// With random date we need to display part 1, part 2, part 3
	// With those displayed, we then need to allow user to click on an icon(part) and make a call to Foursquare api to get information
	// With this information we need to display it on the page

app.events = function(){

	$('.vibes li').on('click', function() {
		var getDates = $(this).text();
		

		if(getDates==='Romantic'){
			//display a random romanticDate
			app.displayDate(romanticDates);

		}
		if(getDates==='Fun'){
			//display a random classicDate
			app.displayDate(funDates);
		}
		if(getDates==='Sporty'){
			//display a random sportyDate
			app.displayDate(sportyDates);
		}
		if(getDates==='Chill'){
			//display a random chillDate
			app.displayDate(chillDates);
		}
		if(getDates==='Extreme'){
			//display a random extremeDate
			app.displayDate(extremeDates);
		}

		app.dateRandomizer(getDates);
	});

};

app.randomNumber = function(n) {
	return (Math.floor(Math.random() * n) );
};

app.dateRandomizer = function(datesArray) {
	var randomDateIndex = app.randomNumber(datesArray.length)
	var randomDate = datesArray[randomDateIndex];
	return randomDate;
};


app.displayDate = function(dateType){

	var myDate = app.dateRandomizer(dateType)
	

	var firstIdea = '<p>' + myDate.part1.title + '</p>';
	var firstImg = '<img src="' + myDate.part1.icon + '"/>';
	var firstDiv = '<div class="first dateIdeas" data-date="' + myDate.part1.query + '">' + firstImg + firstIdea  + '</div>';

	var secondIdea = '<p>' + myDate.part2.title + '</p>';
	var secondImg = '<img src="' + myDate.part2.icon + '"/>';
	var secondDiv = '<div class="second dateIdeas" data-date="' + myDate.part2.query + '">' + secondImg + secondIdea  + '</div>';

	var thirdIdea = '<p>' + myDate.part3.title + '</p>';
	var thirdImg = '<img src="' + myDate.part3.icon + '"/>';
	var thirdDiv = '<div class="third dateIdeas" data-date="' + myDate.part3.query + '">' + thirdImg+ thirdIdea  + '</div>';

	$('.dateOptions').empty();
	$('.dateOptions').append(firstDiv, secondDiv, thirdDiv);
	app.searchDates();
	
}

app.searchDates = function() {

	$('.dateOptions').on('click', '.dateIdeas', function() {
		var idea = $(this).data('date');
		app.romantic(idea);
	});

}




// DATE COMBOS!!! :) There are five categories of dates: Romantic, Sporty, Chill, Classic and Extreme. Each of those have objects in the (date options), and those date options each have 3 parts. 

// The date OPTIONS will be randomized. The date parts will remain the same. 

// Using ".on(click)" - on the li's (in the UL with a class of "vibes") - link them to these variables: 
// (SOO!! when you click on the sporty li, a random sporty date with 3 parts will appear)

var romanticDates = [
	{
		part1: {
			title: 'Grab Some Icecream',
			icon: 'images/icecream.png',
			query: 'icecream'
		},
		part2: {
			title: 'Take a Stroll in the Park',
			icon: 'images/acorn.png',
			query: 'park'
		},
		part3: {
			title: 'Gaze up at the Stars',
			icon: 'images/stars.png',
			query: 'observatory'
		}
	},
	{
		part1: {
			title: 'Morning Cup of Joe',
			icon: 'images/coffee.png',
			query: 'coffee'
		},
		part2: {
			title: 'Picnic in the Park',
			icon: 'images/picnic.png',
			query: 'park'
		},
		part3: {
			title: 'Fly a Kite',
			icon: 'images/kite.png',
			query: 'park'
		}
	},
	{
		part1: {
			title: 'Strawberry Picking',
			icon: 'images/strawberry.png',
			query: 'strawberry picking'
		},	
		part2: {
			title: 'Bird Watching in the Park',
			icon: 'images/birdy.png',
			query: 'park'
		},
		part3: {
			title: 'Martini Lounge',
			icon: 'images/martini.png',
			query: 'martini'
		}
	}
]

var sportyDates = [
	{
		part1: {
			title: 'Shopping for Plaid',
			icon: 'images/plaid.png',
			query: 'mall'
		},
		part2: {
			title: 'Axe Throwing',
			icon: 'images/axe.png',
			query: 'axe throwing'
		},
		part3: {
			title: 'Burger\'s & Beer',
			icon: 'images/beer.png',
			query: 'pub'
		}
	},
	{
		part1: {
			title: 'Dinner',
			icon: 'images/burger.png', 
			query: 'burgers'
		},
		part2: {
			title: 'Ping Pong Challenge',
			icon: 'images/pingpong.png',
			query: 'ping pong bar'
		},
		part3: {
			title: 'Beers',
			icon: 'images/beer.png',
			query: 'pub',
		}
	},
	{
		part1: {
			title: 'Coffee Date',
			icon: 'images/coffee2.png',
			query: 'coffee'
		},
		part2: {
			title: 'Bike Tour',
			icon: 'images/bike.png',
			query: 'bike path'
		},
		part3: {
			title: 'Hit Up The Pub',
			icon: 'images/burger.png',
			query: 'pub'
		}
	},
	{
		part1: {
			title: 'Bike to Beach',
			icon: 'images/bike.png',
			query: 'bike path'
		},
		part2: {
			title: 'Beach Volleyball',
			icon: 'images/volleyball.png',
			query: 'beach volleyball'
		},
		part3: {
			title: 'Icecream',
			icon: 'images/icecream.png',
			query: 'icecream'
		}
	}
]

var chillDates = [
	{
		part1: {
			title: 'Title 1',
			icon: 'http://unsplash.it/200/200'
		},
		part2: {
			title: 'Title 1',
			icon: 'http://unsplash.it/200/200'
		},
		part3: {
			title: 'Title 1',
			icon: 'http://unsplash.it/200/200'
		}
	},
	{
		part1: {
			title: 'Title 1',
			icon: 'http://unsplash.it/200/200'
		},
		part2: {
			title: 'Title 1',
			icon: 'http://unsplash.it/200/200'
		},
		part3: {
			title: 'Title 1',
			icon: 'http://unsplash.it/200/200'
		}
	},
	{
		part1: {
			title: 'Title 1',
			icon: 'http://unsplash.it/200/200'
		},
		part2: {
			title: 'Title 1',
			icon: 'http://unsplash.it/200/200'
		},
		part3: {
			title: 'Title 1',
			icon: 'http://unsplash.it/200/200'
		}
	}
]

var funDates = [
	{
		part1: {
			title: 'Icecream',
			icon: 'images/icecream.png',
			query: 'icecream'
		},
		part2: {
			title: 'Zoo',
			icon: 'images/flamingo.png', 
			query: 'zoo'
		},
		part3: {
			title: 'Evening Drinks',
			icon: 'images/martini.png',
			query: 'martini'
		}
	},
	{
		part1: {
			title: 'Cupcake',
			icon: 'images/cupcake.png',
			query: 'cupcake'
		},
		part2: {
			title: 'Aquarium',
			icon: 'images/fish.png',
			query: 'aquarium'
		},
		part3: {
			title: 'Beers',
			icon: 'images/beer.png',
			query: 'beer'
		}
	},
	{
		part1: {
			title: 'Morning Coffee',
			icon: 'images/coffee2.png',
			query: 'coffee'
		},
		part2: {
			title: 'Science Centre',
			icon: 'images/science.png',
			query: 'science center'
		},
		part3: {
			title: 'Cupcakes',
			icon: 'images/cupcake.png',
			query: 'cupcake bakery'
		}
	},
	{
		part1: {
			title: 'Diner Date',
			icon: 'images/burger.png',
			query: 'diner'
		},
		part2: {
			title: 'Movies',
			icon: 'images/popcorn.png',
			query: 'movie cinema'
		},
		part3: {
			title: 'Martinis',
			icon: 'images/martini.png',
			query: 'martini'
		}
	}

]

var extremeDates = [
	{
		part1: {
			title: 'Title 1',
			icon: 'http://unsplash.it/200/200'
		},
		part2: {
			title: 'Title 1',
			icon: 'http://unsplash.it/200/200'
		},
		part3: {
			title: 'Title 1',
			icon: 'http://unsplash.it/200/200'
		}
	},
	{
		part1: {
			title: 'Title 1',
			icon: 'http://unsplash.it/200/200'
		},
		part2: {
			title: 'Title 1',
			icon: 'http://unsplash.it/200/200'
		},
		part3: {
			title: 'Title 1',
			icon: 'http://unsplash.it/200/200'
		}
	},
	{
		part1: {
			title: 'Title 1',
			icon: 'http://unsplash.it/200/200'
		},
		part2: {
			title: 'Title 1',
			icon: 'http://unsplash.it/200/200'
		},
		part3: {
			title: 'Title 1',
			icon: 'http://unsplash.it/200/200'
		}
	}
]


app.init = function() {
	app.events();
	
};

$(function() {
	app.init()
});