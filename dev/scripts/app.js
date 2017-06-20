var app = {};


//initializes the code
app.init = function(){
	navigator.geolocation.getCurrentPosition(function(position){
		app.sunsetInfo(position);
	});
}

//using geolocation of user, get sunrise and sunset times (sunrise-sunset api)
	app.sunsetInfo	= function(userPosition){

		//place user's position in variables lng and lat
	 	var userLng = userPosition.coords.longitude; //grabbing just long info
	 	var userLat = userPosition.coords.latitude;; //grabbing just lat info
	 	console.log(userLat, userLng);

	 	//get request of sunrise and susnset info thru ajax
		$.ajax ({
			url: `https://api.sunrise-sunset.org/json?lat=${userLat}&lng=${userLng}&date=today&callback=mycallback`,
			method: "GET",
			dataType: "jsonp",
			data: {
				lat: userLat,
				long: userLng,
				formatted: 0,
			}

			//then, get the result 
			}).then(function(res){

			//console log entire object
			// console.log(res);

			//place sunrise time in variable (results parameter > results object > sunrise object)
			var sunriseTime = res.results.sunrise; 

			//place sunset time in variable (results parameter > results object > sunset object)
			var sunsetTime = res.results.sunset;
			
			//log both times
			console.log(sunriseTime, sunsetTime);

			//convert time in UTC given into user's local time
			var sunriseDate = new Date(sunriseTime);
			var sunsetDate = new Date(sunsetTime);

			// var newSunriseTime = sunriseDate.toString.("MMMM Do YYYY, h:mm:ss a");
			var newSunriseTime = moment(sunriseDate).format("h:mm:ss a on MMMM Do, YYYY")
			var newSunsetTime = moment(sunsetDate).format("h:mm:ss a on MMMM Do, YYYY")

			console.log(newSunriseTime, newSunsetTime);

			//on click of get sunrise time button, display sunrise time and show locations
			$("#riseTime").on("click", function() {
				$(".riseDesc .riseTimeReturn").text(newSunriseTime);
					$(".places").removeClass("hidden");
					$(".riseTimeReturn").addClass("animated fadeInUp");
			});

			//on click of get sunset time button, display sunset time and show locations
			$("#setTime").on("click", function() {
				$(".setDesc .setTimeReturn").text(newSunsetTime);
					$(".places").removeClass("hidden");
					$(".setTimeReturn").addClass("animated fadeInDown");
			});

	 	//get request of places info thru google places api
		$.ajax ({
			url: 'http://proxy.hackeryou.com',
			method: "GET",
			dataType: "json",
			data: {
				reqUrl: `https://maps.googleapis.com/maps/api/place/nearbysearch/json`,
				params:{
					key: "AIzaSyCcvmslt61Bo6l1aqepnQxAo4Coc07eAJw",
					rankby: "distance",
					location: `${userLat},${userLng}`,
					keyword: "beach,park",
				} //params closing
			} //data closing
		//then, return result and place in variable res
		}).then(function(res) {
			res = res.results
			// console.log(res);
			//for each object in the res, console log the name property and vicinity of that object (place names and address)
			res.forEach (function(object){
				console.log(object.name, object.vicinity);
					$(".places").append(`<p class="placeName">${object.name}</p>`);
					$(".places").append(`<p class="placeAddress">${object.vicinity}</p>`);
				}) //res.forEach closing
			app.getLocation = function(){
				 var input = new google.maps.places.Autocomplete(
				 		(document.getElementById("userInput")),
			      {types: ["city"]});
				};
			}); //2nd then.res closing
		}); // 1st then.res closing

		// $("button.getLocation").on("click", function(e) {
		// 	e.preventDefault();

		// 	navigator.geolocation.getCurrentPosition(function(userPosition) {
		// 	// If user allows access to navigator geolocation, then run ajax request using their longitude & latitude coordinates
		// 	console.log(userPosition);
		// 	});
		// });


} //app.sunsetInfo closing

//only init should be in doc ready
$(function(){
	app.init();
});
