window.onload=function()
{
	var ipUrl="http://api.ipstack.com/check?access_key=923859bb52659542b61ef350d22fcfad";         //First API to obtain user's location 
	var appId="appid=371bf7389ac5d249b605d1d93ecad3f4";     //openweather api key
	var location=document.getElementById("location");
	var currentDate = new Date();
	var dayNight = "day";	
    //setting date for top Bar
    var date = document.getElementById("date");
	date.innerHTML = currentDate.toString();
    
    locationRequest(ipUrl);
	//API request for user's Location info
	function locationRequest(url,callback)
{
	var requestIp=new XMLHttpRequest();
	requestIp.open('GET',url,true);
	requestIp.onload=function()
	{
     if(requestIp.readyState==4 && requestIp.status==200)
	{
      	var jsonData=JSON.parse(requestIp.responseText);
       	var city=jsonData.city;
       	var country=jsonData.country_name;
       	location.innerHTML=`${city}, ${country}`;
       	// var lat=jsonData.latitude;
       	// var lon=jsonData.longitude;
       	// console.log(lat);
       	// console.log(lon);
	    var weatherURL=`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&${appId}`;
	    weatherRequest(weatherURL);
	}
	}
	requestIp.send();
}
  // OpenWeather API Call for obtaining local weather information
    function weatherRequest(url,callback)
{
	var requestWeather=new XMLHttpRequest();
	requestWeather.open('GET',url,true);
	requestWeather.onload=function()
	{
        if(requestWeather.readyState==4 && requestWeather.status==200)
	   {
	   	        console.log("Successful call");
      	        var jsonWeatherData=JSON.parse(requestWeather.responseText);
                var weatherDesc = jsonWeatherData.weather[0].description;
				console.log(weatherDesc);
				var id = jsonWeatherData.weather[0].id;
				var icon = `<i class="wi wi-owm-${id}"></i>`;
				var temperature = jsonWeatherData.main.temp;
				// var tempFaren = Math.round(1.8 * (temperature - 273) - 32);
				// var tempFaren = tempFaren - 32 * 5 / 9;
				// Deduct 32, then multiply by 5, then divide by 9
				// console.log(tempFaren)
				var humidity = jsonWeatherData.main.humidity;
				var windSpeed = jsonWeatherData.wind.speed; 
				var visibility = Math.round(jsonWeatherData.visibility / 1000); 
                var description = document.getElementById("descTitle");

                 //find whether is day or night
				var sunSet = jsonWeatherData.sys.sunset;
				//sunset is 10 digits and currentDate 13 so div by 1000
				var timeNow = Math.round(currentDate / 1000);
				dayNight = (timeNow < sunSet) ? "day" : "night";

                //Displaying API call results after storing them in above variables
                description.innerHTML =`<i id="icon-desc" class="wi wi-owm-${dayNight}-${id}"></i><p>${weatherDesc}</p>`;
                document.getElementById("temperature").innerHTML=`${temperature}<i id="icon-thermometer" class="wi wi-thermometer"></i>`;
                document.getElementById("humidity").innerHTML=humidity + "%";
                document.getElementById("windSpeed").innerHTML=windSpeed + "m/h";                                                     
               document.getElementById("visibility").innerHTML=`${visibility} miles`;

       }
	}
	requestWeather.send();	
}
}