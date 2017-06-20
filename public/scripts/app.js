(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

var app = {};

//initializes the code
app.init = function () {
	navigator.geolocation.getCurrentPosition(function (position) {
		app.sunsetInfo(position);
	});
};

//using geolocation of user, get sunrise and sunset times (sunrise-sunset api)
app.sunsetInfo = function (userPosition) {

	//place user's position in variables lng and lat
	var userLng = userPosition.coords.longitude; //grabbing just long info
	var userLat = userPosition.coords.latitude;; //grabbing just lat info
	console.log(userLat, userLng);

	//get request of sunrise and susnset info thru ajax
	$.ajax({
		url: "https://api.sunrise-sunset.org/json?lat=" + userLat + "&lng=" + userLng + "&date=today&callback=mycallback",
		method: "GET",
		dataType: "jsonp",
		data: {
			lat: userLat,
			long: userLng,
			formatted: 0

			//then, get the result 
		} }).then(function (res) {

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
		var newSunriseTime = moment(sunriseDate).format("h:mm:ss a on MMMM Do, YYYY");
		var newSunsetTime = moment(sunsetDate).format("h:mm:ss a on MMMM Do, YYYY");

		console.log(newSunriseTime, newSunsetTime);

		//on click of get sunrise time button, display sunrise time and show locations
		$("#riseTime").on("click", function () {
			$(".riseDesc .riseTimeReturn").text(newSunriseTime);
			$(".places").removeClass("hidden");
			$(".riseTimeReturn").addClass("animated fadeInUp");
		});

		//on click of get sunset time button, display sunset time and show locations
		$("#setTime").on("click", function () {
			$(".setDesc .setTimeReturn").text(newSunsetTime);
			$(".places").removeClass("hidden");
			$(".setTimeReturn").addClass("animated fadeInDown");
		});

		//get request of places info thru google places api
		$.ajax({
			url: 'http://proxy.hackeryou.com',
			method: "GET",
			dataType: "json",
			data: {
				reqUrl: "https://maps.googleapis.com/maps/api/place/nearbysearch/json",
				params: {
					key: "AIzaSyCcvmslt61Bo6l1aqepnQxAo4Coc07eAJw",
					rankby: "distance",
					location: userLat + "," + userLng,
					keyword: "beach,park" //params closing
				} //data closing
				//then, return result and place in variable res
			} }).then(function (res) {
			res = res.results;
			// console.log(res);
			//for each object in the res, console log the name property and vicinity of that object (place names and address)
			res.forEach(function (object) {
				console.log(object.name, object.vicinity);
				$(".places").append("<p class=\"placeName\">" + object.name + "</p>");
				$(".places").append("<p class=\"placeAddress\">" + object.vicinity + "</p>");
			}); //res.forEach closing
			app.getLocation = function () {
				var input = new google.maps.places.Autocomplete(document.getElementById("userInput"), { types: ["city"] });
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

}; //app.sunsetInfo closing

//only init should be in doc ready
$(function () {
	app.init();
});

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJkZXYvc2NyaXB0cy9hcHAuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0FBLElBQUksTUFBTSxFQUFWOztBQUdBO0FBQ0EsSUFBSSxJQUFKLEdBQVcsWUFBVTtBQUNwQixXQUFVLFdBQVYsQ0FBc0Isa0JBQXRCLENBQXlDLFVBQVMsUUFBVCxFQUFrQjtBQUMxRCxNQUFJLFVBQUosQ0FBZSxRQUFmO0FBQ0EsRUFGRDtBQUdBLENBSkQ7O0FBTUE7QUFDQyxJQUFJLFVBQUosR0FBaUIsVUFBUyxZQUFULEVBQXNCOztBQUV0QztBQUNDLEtBQUksVUFBVSxhQUFhLE1BQWIsQ0FBb0IsU0FBbEMsQ0FIcUMsQ0FHUTtBQUM3QyxLQUFJLFVBQVUsYUFBYSxNQUFiLENBQW9CLFFBQWxDLENBQTJDLENBSk4sQ0FJUTtBQUM3QyxTQUFRLEdBQVIsQ0FBWSxPQUFaLEVBQXFCLE9BQXJCOztBQUVBO0FBQ0QsR0FBRSxJQUFGLENBQVE7QUFDUCxvREFBZ0QsT0FBaEQsYUFBK0QsT0FBL0Qsb0NBRE87QUFFUCxVQUFRLEtBRkQ7QUFHUCxZQUFVLE9BSEg7QUFJUCxRQUFNO0FBQ0wsUUFBSyxPQURBO0FBRUwsU0FBTSxPQUZEO0FBR0wsY0FBVzs7QUFHWjtBQU5NLEdBSkMsRUFBUixFQVdJLElBWEosQ0FXUyxVQUFTLEdBQVQsRUFBYTs7QUFFckI7QUFDQTs7QUFFQTtBQUNBLE1BQUksY0FBYyxJQUFJLE9BQUosQ0FBWSxPQUE5Qjs7QUFFQTtBQUNBLE1BQUksYUFBYSxJQUFJLE9BQUosQ0FBWSxNQUE3Qjs7QUFFQTtBQUNBLFVBQVEsR0FBUixDQUFZLFdBQVosRUFBeUIsVUFBekI7O0FBRUE7QUFDQSxNQUFJLGNBQWMsSUFBSSxJQUFKLENBQVMsV0FBVCxDQUFsQjtBQUNBLE1BQUksYUFBYSxJQUFJLElBQUosQ0FBUyxVQUFULENBQWpCOztBQUVBO0FBQ0EsTUFBSSxpQkFBaUIsT0FBTyxXQUFQLEVBQW9CLE1BQXBCLENBQTJCLDRCQUEzQixDQUFyQjtBQUNBLE1BQUksZ0JBQWdCLE9BQU8sVUFBUCxFQUFtQixNQUFuQixDQUEwQiw0QkFBMUIsQ0FBcEI7O0FBRUEsVUFBUSxHQUFSLENBQVksY0FBWixFQUE0QixhQUE1Qjs7QUFFQTtBQUNBLElBQUUsV0FBRixFQUFlLEVBQWYsQ0FBa0IsT0FBbEIsRUFBMkIsWUFBVztBQUNyQyxLQUFFLDJCQUFGLEVBQStCLElBQS9CLENBQW9DLGNBQXBDO0FBQ0MsS0FBRSxTQUFGLEVBQWEsV0FBYixDQUF5QixRQUF6QjtBQUNBLEtBQUUsaUJBQUYsRUFBcUIsUUFBckIsQ0FBOEIsbUJBQTlCO0FBQ0QsR0FKRDs7QUFNQTtBQUNBLElBQUUsVUFBRixFQUFjLEVBQWQsQ0FBaUIsT0FBakIsRUFBMEIsWUFBVztBQUNwQyxLQUFFLHlCQUFGLEVBQTZCLElBQTdCLENBQWtDLGFBQWxDO0FBQ0MsS0FBRSxTQUFGLEVBQWEsV0FBYixDQUF5QixRQUF6QjtBQUNBLEtBQUUsZ0JBQUYsRUFBb0IsUUFBcEIsQ0FBNkIscUJBQTdCO0FBQ0QsR0FKRDs7QUFNQTtBQUNELElBQUUsSUFBRixDQUFRO0FBQ1AsUUFBSyw0QkFERTtBQUVQLFdBQVEsS0FGRDtBQUdQLGFBQVUsTUFISDtBQUlQLFNBQU07QUFDTCwwRUFESztBQUVMLFlBQU87QUFDTixVQUFLLHlDQURDO0FBRU4sYUFBUSxVQUZGO0FBR04sZUFBYSxPQUFiLFNBQXdCLE9BSGxCO0FBSU4sY0FBUyxZQUpILENBS0w7QUFMSyxLQUZGLENBUUo7QUFDSDtBQVRPLElBSkMsRUFBUixFQWNHLElBZEgsQ0FjUSxVQUFTLEdBQVQsRUFBYztBQUNyQixTQUFNLElBQUksT0FBVjtBQUNBO0FBQ0E7QUFDQSxPQUFJLE9BQUosQ0FBYSxVQUFTLE1BQVQsRUFBZ0I7QUFDNUIsWUFBUSxHQUFSLENBQVksT0FBTyxJQUFuQixFQUF5QixPQUFPLFFBQWhDO0FBQ0MsTUFBRSxTQUFGLEVBQWEsTUFBYiw2QkFBNEMsT0FBTyxJQUFuRDtBQUNBLE1BQUUsU0FBRixFQUFhLE1BQWIsZ0NBQStDLE9BQU8sUUFBdEQ7QUFDQSxJQUpGLEVBSnFCLENBUWpCO0FBQ0osT0FBSSxXQUFKLEdBQWtCLFlBQVU7QUFDMUIsUUFBSSxRQUFRLElBQUksT0FBTyxJQUFQLENBQVksTUFBWixDQUFtQixZQUF2QixDQUNULFNBQVMsY0FBVCxDQUF3QixXQUF4QixDQURTLEVBRVIsRUFBQyxPQUFPLENBQUMsTUFBRCxDQUFSLEVBRlEsQ0FBWjtBQUdBLElBSkY7QUFLQyxHQTVCRixFQXZDc0IsQ0FtRWpCO0FBQ0osRUEvRUQsRUFSc0MsQ0F1RmxDOztBQUVKO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFHRCxDQW5HQSxDLENBbUdDOztBQUVGO0FBQ0EsRUFBRSxZQUFVO0FBQ1gsS0FBSSxJQUFKO0FBQ0EsQ0FGRCIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJ2YXIgYXBwID0ge307XG5cblxuLy9pbml0aWFsaXplcyB0aGUgY29kZVxuYXBwLmluaXQgPSBmdW5jdGlvbigpe1xuXHRuYXZpZ2F0b3IuZ2VvbG9jYXRpb24uZ2V0Q3VycmVudFBvc2l0aW9uKGZ1bmN0aW9uKHBvc2l0aW9uKXtcblx0XHRhcHAuc3Vuc2V0SW5mbyhwb3NpdGlvbik7XG5cdH0pO1xufVxuXG4vL3VzaW5nIGdlb2xvY2F0aW9uIG9mIHVzZXIsIGdldCBzdW5yaXNlIGFuZCBzdW5zZXQgdGltZXMgKHN1bnJpc2Utc3Vuc2V0IGFwaSlcblx0YXBwLnN1bnNldEluZm9cdD0gZnVuY3Rpb24odXNlclBvc2l0aW9uKXtcblxuXHRcdC8vcGxhY2UgdXNlcidzIHBvc2l0aW9uIGluIHZhcmlhYmxlcyBsbmcgYW5kIGxhdFxuXHQgXHR2YXIgdXNlckxuZyA9IHVzZXJQb3NpdGlvbi5jb29yZHMubG9uZ2l0dWRlOyAvL2dyYWJiaW5nIGp1c3QgbG9uZyBpbmZvXG5cdCBcdHZhciB1c2VyTGF0ID0gdXNlclBvc2l0aW9uLmNvb3Jkcy5sYXRpdHVkZTs7IC8vZ3JhYmJpbmcganVzdCBsYXQgaW5mb1xuXHQgXHRjb25zb2xlLmxvZyh1c2VyTGF0LCB1c2VyTG5nKTtcblxuXHQgXHQvL2dldCByZXF1ZXN0IG9mIHN1bnJpc2UgYW5kIHN1c25zZXQgaW5mbyB0aHJ1IGFqYXhcblx0XHQkLmFqYXggKHtcblx0XHRcdHVybDogYGh0dHBzOi8vYXBpLnN1bnJpc2Utc3Vuc2V0Lm9yZy9qc29uP2xhdD0ke3VzZXJMYXR9JmxuZz0ke3VzZXJMbmd9JmRhdGU9dG9kYXkmY2FsbGJhY2s9bXljYWxsYmFja2AsXG5cdFx0XHRtZXRob2Q6IFwiR0VUXCIsXG5cdFx0XHRkYXRhVHlwZTogXCJqc29ucFwiLFxuXHRcdFx0ZGF0YToge1xuXHRcdFx0XHRsYXQ6IHVzZXJMYXQsXG5cdFx0XHRcdGxvbmc6IHVzZXJMbmcsXG5cdFx0XHRcdGZvcm1hdHRlZDogMCxcblx0XHRcdH1cblxuXHRcdFx0Ly90aGVuLCBnZXQgdGhlIHJlc3VsdCBcblx0XHRcdH0pLnRoZW4oZnVuY3Rpb24ocmVzKXtcblxuXHRcdFx0Ly9jb25zb2xlIGxvZyBlbnRpcmUgb2JqZWN0XG5cdFx0XHQvLyBjb25zb2xlLmxvZyhyZXMpO1xuXG5cdFx0XHQvL3BsYWNlIHN1bnJpc2UgdGltZSBpbiB2YXJpYWJsZSAocmVzdWx0cyBwYXJhbWV0ZXIgPiByZXN1bHRzIG9iamVjdCA+IHN1bnJpc2Ugb2JqZWN0KVxuXHRcdFx0dmFyIHN1bnJpc2VUaW1lID0gcmVzLnJlc3VsdHMuc3VucmlzZTsgXG5cblx0XHRcdC8vcGxhY2Ugc3Vuc2V0IHRpbWUgaW4gdmFyaWFibGUgKHJlc3VsdHMgcGFyYW1ldGVyID4gcmVzdWx0cyBvYmplY3QgPiBzdW5zZXQgb2JqZWN0KVxuXHRcdFx0dmFyIHN1bnNldFRpbWUgPSByZXMucmVzdWx0cy5zdW5zZXQ7XG5cdFx0XHRcblx0XHRcdC8vbG9nIGJvdGggdGltZXNcblx0XHRcdGNvbnNvbGUubG9nKHN1bnJpc2VUaW1lLCBzdW5zZXRUaW1lKTtcblxuXHRcdFx0Ly9jb252ZXJ0IHRpbWUgaW4gVVRDIGdpdmVuIGludG8gdXNlcidzIGxvY2FsIHRpbWVcblx0XHRcdHZhciBzdW5yaXNlRGF0ZSA9IG5ldyBEYXRlKHN1bnJpc2VUaW1lKTtcblx0XHRcdHZhciBzdW5zZXREYXRlID0gbmV3IERhdGUoc3Vuc2V0VGltZSk7XG5cblx0XHRcdC8vIHZhciBuZXdTdW5yaXNlVGltZSA9IHN1bnJpc2VEYXRlLnRvU3RyaW5nLihcIk1NTU0gRG8gWVlZWSwgaDptbTpzcyBhXCIpO1xuXHRcdFx0dmFyIG5ld1N1bnJpc2VUaW1lID0gbW9tZW50KHN1bnJpc2VEYXRlKS5mb3JtYXQoXCJoOm1tOnNzIGEgb24gTU1NTSBEbywgWVlZWVwiKVxuXHRcdFx0dmFyIG5ld1N1bnNldFRpbWUgPSBtb21lbnQoc3Vuc2V0RGF0ZSkuZm9ybWF0KFwiaDptbTpzcyBhIG9uIE1NTU0gRG8sIFlZWVlcIilcblxuXHRcdFx0Y29uc29sZS5sb2cobmV3U3VucmlzZVRpbWUsIG5ld1N1bnNldFRpbWUpO1xuXG5cdFx0XHQvL29uIGNsaWNrIG9mIGdldCBzdW5yaXNlIHRpbWUgYnV0dG9uLCBkaXNwbGF5IHN1bnJpc2UgdGltZSBhbmQgc2hvdyBsb2NhdGlvbnNcblx0XHRcdCQoXCIjcmlzZVRpbWVcIikub24oXCJjbGlja1wiLCBmdW5jdGlvbigpIHtcblx0XHRcdFx0JChcIi5yaXNlRGVzYyAucmlzZVRpbWVSZXR1cm5cIikudGV4dChuZXdTdW5yaXNlVGltZSk7XG5cdFx0XHRcdFx0JChcIi5wbGFjZXNcIikucmVtb3ZlQ2xhc3MoXCJoaWRkZW5cIik7XG5cdFx0XHRcdFx0JChcIi5yaXNlVGltZVJldHVyblwiKS5hZGRDbGFzcyhcImFuaW1hdGVkIGZhZGVJblVwXCIpO1xuXHRcdFx0fSk7XG5cblx0XHRcdC8vb24gY2xpY2sgb2YgZ2V0IHN1bnNldCB0aW1lIGJ1dHRvbiwgZGlzcGxheSBzdW5zZXQgdGltZSBhbmQgc2hvdyBsb2NhdGlvbnNcblx0XHRcdCQoXCIjc2V0VGltZVwiKS5vbihcImNsaWNrXCIsIGZ1bmN0aW9uKCkge1xuXHRcdFx0XHQkKFwiLnNldERlc2MgLnNldFRpbWVSZXR1cm5cIikudGV4dChuZXdTdW5zZXRUaW1lKTtcblx0XHRcdFx0XHQkKFwiLnBsYWNlc1wiKS5yZW1vdmVDbGFzcyhcImhpZGRlblwiKTtcblx0XHRcdFx0XHQkKFwiLnNldFRpbWVSZXR1cm5cIikuYWRkQ2xhc3MoXCJhbmltYXRlZCBmYWRlSW5Eb3duXCIpO1xuXHRcdFx0fSk7XG5cblx0IFx0Ly9nZXQgcmVxdWVzdCBvZiBwbGFjZXMgaW5mbyB0aHJ1IGdvb2dsZSBwbGFjZXMgYXBpXG5cdFx0JC5hamF4ICh7XG5cdFx0XHR1cmw6ICdodHRwOi8vcHJveHkuaGFja2VyeW91LmNvbScsXG5cdFx0XHRtZXRob2Q6IFwiR0VUXCIsXG5cdFx0XHRkYXRhVHlwZTogXCJqc29uXCIsXG5cdFx0XHRkYXRhOiB7XG5cdFx0XHRcdHJlcVVybDogYGh0dHBzOi8vbWFwcy5nb29nbGVhcGlzLmNvbS9tYXBzL2FwaS9wbGFjZS9uZWFyYnlzZWFyY2gvanNvbmAsXG5cdFx0XHRcdHBhcmFtczp7XG5cdFx0XHRcdFx0a2V5OiBcIkFJemFTeUNjdm1zbHQ2MUJvNmwxYXFlcG5ReEFvNENvYzA3ZUFKd1wiLFxuXHRcdFx0XHRcdHJhbmtieTogXCJkaXN0YW5jZVwiLFxuXHRcdFx0XHRcdGxvY2F0aW9uOiBgJHt1c2VyTGF0fSwke3VzZXJMbmd9YCxcblx0XHRcdFx0XHRrZXl3b3JkOiBcImJlYWNoLHBhcmtcIixcblx0XHRcdFx0fSAvL3BhcmFtcyBjbG9zaW5nXG5cdFx0XHR9IC8vZGF0YSBjbG9zaW5nXG5cdFx0Ly90aGVuLCByZXR1cm4gcmVzdWx0IGFuZCBwbGFjZSBpbiB2YXJpYWJsZSByZXNcblx0XHR9KS50aGVuKGZ1bmN0aW9uKHJlcykge1xuXHRcdFx0cmVzID0gcmVzLnJlc3VsdHNcblx0XHRcdC8vIGNvbnNvbGUubG9nKHJlcyk7XG5cdFx0XHQvL2ZvciBlYWNoIG9iamVjdCBpbiB0aGUgcmVzLCBjb25zb2xlIGxvZyB0aGUgbmFtZSBwcm9wZXJ0eSBhbmQgdmljaW5pdHkgb2YgdGhhdCBvYmplY3QgKHBsYWNlIG5hbWVzIGFuZCBhZGRyZXNzKVxuXHRcdFx0cmVzLmZvckVhY2ggKGZ1bmN0aW9uKG9iamVjdCl7XG5cdFx0XHRcdGNvbnNvbGUubG9nKG9iamVjdC5uYW1lLCBvYmplY3QudmljaW5pdHkpO1xuXHRcdFx0XHRcdCQoXCIucGxhY2VzXCIpLmFwcGVuZChgPHAgY2xhc3M9XCJwbGFjZU5hbWVcIj4ke29iamVjdC5uYW1lfTwvcD5gKTtcblx0XHRcdFx0XHQkKFwiLnBsYWNlc1wiKS5hcHBlbmQoYDxwIGNsYXNzPVwicGxhY2VBZGRyZXNzXCI+JHtvYmplY3QudmljaW5pdHl9PC9wPmApO1xuXHRcdFx0XHR9KSAvL3Jlcy5mb3JFYWNoIGNsb3Npbmdcblx0XHRcdGFwcC5nZXRMb2NhdGlvbiA9IGZ1bmN0aW9uKCl7XG5cdFx0XHRcdCB2YXIgaW5wdXQgPSBuZXcgZ29vZ2xlLm1hcHMucGxhY2VzLkF1dG9jb21wbGV0ZShcblx0XHRcdFx0IFx0XHQoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ1c2VySW5wdXRcIikpLFxuXHRcdFx0ICAgICAge3R5cGVzOiBbXCJjaXR5XCJdfSk7XG5cdFx0XHRcdH07XG5cdFx0XHR9KTsgLy8ybmQgdGhlbi5yZXMgY2xvc2luZ1xuXHRcdH0pOyAvLyAxc3QgdGhlbi5yZXMgY2xvc2luZ1xuXG5cdFx0Ly8gJChcImJ1dHRvbi5nZXRMb2NhdGlvblwiKS5vbihcImNsaWNrXCIsIGZ1bmN0aW9uKGUpIHtcblx0XHQvLyBcdGUucHJldmVudERlZmF1bHQoKTtcblxuXHRcdC8vIFx0bmF2aWdhdG9yLmdlb2xvY2F0aW9uLmdldEN1cnJlbnRQb3NpdGlvbihmdW5jdGlvbih1c2VyUG9zaXRpb24pIHtcblx0XHQvLyBcdC8vIElmIHVzZXIgYWxsb3dzIGFjY2VzcyB0byBuYXZpZ2F0b3IgZ2VvbG9jYXRpb24sIHRoZW4gcnVuIGFqYXggcmVxdWVzdCB1c2luZyB0aGVpciBsb25naXR1ZGUgJiBsYXRpdHVkZSBjb29yZGluYXRlc1xuXHRcdC8vIFx0Y29uc29sZS5sb2codXNlclBvc2l0aW9uKTtcblx0XHQvLyBcdH0pO1xuXHRcdC8vIH0pO1xuXG5cbn0gLy9hcHAuc3Vuc2V0SW5mbyBjbG9zaW5nXG5cbi8vb25seSBpbml0IHNob3VsZCBiZSBpbiBkb2MgcmVhZHlcbiQoZnVuY3Rpb24oKXtcblx0YXBwLmluaXQoKTtcbn0pO1xuIl19
