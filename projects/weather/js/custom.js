$(document).ready(function(){
	

	//setting height of the section
	var back = ($(window).height()) - ($("header").height());
	$("section").css("min-height", back);
	

	
	var geoSuccess = function(position){
		var coords = position.coords;
		var lat = coords.latitude;
		var lon = coords.longitude;
		
			$(".geoInfo" ).fadeOut( "slow", function() {
				$(this).remove();
				});
			
			 $("#screen").fadeIn('slow');
			 $("#map").fadeIn('slow');
			 $(".date").fadeIn('slow');
			 $(".frame").fadeIn('slow');
			$("#loader").hide();
			var mapHeight = $("section").height() - $(".frame").height();
			
			var link = 'https://maps.googleapis.com/maps/api/staticmap?&zoom=13&size=630x'+mapHeight + '&markers=color:red%7C' + lat + ',' + lon + '&key=AIzaSyDKlBMGTiWEmkKc5lxrDS_c7IQclH4B0Sc';
			$("#map").append("<img src='images/imgcover.jpg' class='img-responsive'>");
			$("#map img").attr("src", link);
		
			//JESON call for weather data
			var call = $.getJSON('http://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&APPID=1a7e2e3ecdd4aa3685964b43ad913e2e',  function(data){
			var description = data.weather[0].description;
			var firstLetter = description.charAt(0);//
			var firstUpperCase = firstLetter.toUpperCase();
			description = description.replace( description.charAt(0), firstUpperCase);
			var id = data.weather[0].id;
			var icon = data.weather[0].icon;
			var city = data.name;
			var country = data.sys.country;
			var main = data.weather[0].main;
			var temp = data.main.temp;
			temp = Math.floor(temp - 273);//change temp to Celsius
			var city = data.name;
			
			$(".description").text(description);
			description = description.toLowerCase();
			
			$(".temp").text(temp +' °C');// Celscius as a default
			
			$(".city").text(city + ", "+ country);
		
				//temp converter
	 
			 $(".converter").click(function(){
				 var tempText = $(".temp").text();
				 	if(tempText.indexOf(" °C") != -1){
							
							
							var tempF = temp * 9/5 + 32;
							$(".temp").text(tempF + " °F");
							$(this).text("Change to °C");
							
							} else   {
								tempText = parseInt(tempText);
								var tempC = Math.floor((tempText - 32) * 5/9);
								$(".temp").text(tempC + " °C");
								$(this).text("Change to °F");
							}
		 
				});
			
			//changing weather condition img 
			
			switch(id){
				case 800:
				if (hour > 5 && hour < 19){
				$("#screen img").attr("src", "http://openweathermap.org/img/w/01d.png");
				} else {
				$("#screen img").attr("src", "http://openweathermap.org/img/w/01n.png");
				}
				break;
				
				case "500":
				case "501":
				case "502":
				case "503":
				case "504":
				if (hour > 5 && hour < 19){
				$("#screen img").attr("src", "http://openweathermap.org/img/w/10d.png");
				} else {
				$("#screen img").attr("src", "http://openweathermap.org/img/w/10n.png");
				}
				break;
				
				case 801:
				if (hour > 5 && hour < 19){
				$("#screen img").attr("src", "http://openweathermap.org/img/w/02d.png");
				} else {
				$("#screen img").attr("src", "http://openweathermap.org/img/w/02n.png");
				}
				break;
				
				case 802:
				if (hour > 5 && hour < 19){
					$("#screen img").attr("src", "http://openweathermap.org/img/w/03d.png");
				} else {
					$("#screen img").attr("src", "http://openweathermap.org/img/w/03n.png");
				}
				break;
				
				case 803:
				case 804:
				if (hour > 5 && hour < 19){
					$("#screen img").attr("src", "http://openweathermap.org/img/w/04d.png");
				} else {
					$("#screen img").attr("src", "http://openweathermap.org/img/w/04n.png");
				}
				break;
				
				
				case 520:
				case 521:
				case 522:
				case 531:
				if (hour > 5 && hour < 19){
					$("#screen img").attr("src", "http://openweathermap.org/img/w/09d.png");
				} else {
					$("#screen img").attr("src", "http://openweathermap.org/img/w/09n.png");
				}
				break;
				
				case 211:
				case 212:
				case 221:
				case 230:
				case 231:
				case 232:		
				if (hour > 5 && hour < 19){
					$("#screen img").attr("src", "http://openweathermap.org/img/w/11d.png");
				} else {
					$("#screen img").attr("src", "http://openweathermap.org/img/w/11n.png");
				}
				break;
				
				
						case 601:
						case 602:
						case 611:
						case 612:
						case 615:
						case 616:
						case 620:
						case 621:
						case 622:
						
				if (hour > 5 && hour < 19){
					$("#screen img").attr("src", "http://openweathermap.org/img/w/13d.png");
				} else {
					$("#screen img").attr("src", "http://openweathermap.org/img/w/13n.png");
				}
				break;
				
				
						case 701:
						case 711:
						case 721:
						case 731:
						case 741:
						case 751:
						case 761:
						case 762:
						case 771:
						case 781:
				if (hour > 5 && hour < 19){
					$("#screen img").attr("src", "http://openweathermap.org/img/w/50d.png");
				} else {
					$("#screen img").attr("src", "http://openweathermap.org/img/w/50n.png");
				}
				break;
				
				default:
				$("#screen img").remove();
				
			}

			$(".loader").remove();
			});

    };
	
	var geoError = function(errorObj){
		var error = errorObj.code;
		
		if (error == 1) {
			//Please enable geolocation
			$(".geoInfo").html("<p><strong>Please enable geolocation</strong></p>");
		}
		
		if (error == 2) {
		
			$(".geoInfo").html("<p><strong>There has been problem either with your network or positioning satellites can’t be contacted.</strong></p>");
		}
		
		if (error == 3) {
			$(".geoInfo").html("<p><strong>Times out. Tt takes too long to calculate your position</strong></p>");
		}
	}
	 
	 $("#screen").hide();
	 $("#map").hide();
	 $(".date").hide();
	 $(".frame").hide();
	 
	 navigator.geolocation.getCurrentPosition(geoSuccess, geoError);

	 
	//date
	
	function getMonthString(num){
	var month;    //Create a local variable to hold the string
	switch(num)
	{
	case 0:
	month = "January";
	break;
	case 1:
	month = "February";
	break;
	case 2:
	month = "March";
	break;
	case 3:
	month = "April";
	break;
	case 4:
	month = "May";
	break;
	case 5:
	month = "June";
	break;
	case 6:
	month = "July";
	break;
	case 7:
	month = "August";
	break;
	case 8:
	month = "September";
	break;
	case 9:
	month = "October";
	break;
	case 10:
	month = "November";
	break;
	case 11:
	month = "December";
	break;
	default:
	month="Invalid month";}
	return month;
	}
	
	var currentDate = new Date();
	
	var weekday = new Array(7);
		weekday[0] =  "Sunday";
		weekday[1] = "Monday";
		weekday[2] = "Tuesday";
		weekday[3] = "Wednesday";
		weekday[4] = "Thursday";
		weekday[5] = "Friday";
		weekday[6] = "Saturday";

		var weekDay = weekday[currentDate.getDay()];
	
	
	var day = currentDate.getDate();
	var month = getMonthString(currentDate.getMonth());
	console.log(month);
	var year = currentDate.getFullYear();
	
	$(".date").text(weekDay + ", " + day + " " + month + " " + year );
	
	var hour = currentDate.getHours();
	var min = currentDate.getMinutes();
	
	
	if (min < 10) {
		$(".time").text(hour + ":" + "0" + min);
	} else {
		$(".time").text(hour + ":" + min);
	}
	
	});
	