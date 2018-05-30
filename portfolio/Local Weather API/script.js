window.onload=function(){
	var ipUrl="https://ipinfo.io/json";         //First API to obtain user's location 
	var  appId="appid=caec8ff04628d7fc9c107dcc858739b9";
	var location=document.getElementById("location");
	
	var currentDate = new Date();
	var dayNight = "day";	
    //setting date for top Bar
    var date = document.getElementById("date");
	date.innerHTML = currentDate.toString();
    
    locationRequest(ipUrl);
	//ipinfo.io API request for user's Location info
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
       	var country=jsonData.country;
       	location.innerHTML=`${city}, ${country}`;
       	var lat=jsonData.loc.split(",")[0];
       	var lon=jsonData.loc.split(",")[1];
        // var weatherURL=`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&${appId}`;
	    // var weatherURL=`http://api.openweathermap.org/data/2.5/weather?id=524901&${appId}`;
	    var weatherURL=`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&${appId}`;
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
      	        var jsonWeatherData=JSON.parse(requestWeather.responseText);
                var weatherDesc = jsonWeatherData.weather[0].description;
				var id = jsonWeatherData.weather[0].id;
				var icon = `<i class="wi wi-owm-${id}"></i>`;
				var temperature = jsonWeatherData.main.temp;
				var tempFaren = Math.round(1.8 * (temperature - 273) + 32)
				// console.log(tempFaren)
				var humidity = jsonWeatherData.main.humidity;
				var windSpeed = jsonWeatherData.wind.speed; 
				var visibility = Math.round(jsonWeatherData.visibility / 1000); 
                var description = document.getElementById("description");

                 //find whether is day or night
				var sunSet = jsonWeatherData.sys.sunset;
				//sunset is 10 digits and currentDate 13 so div by 1000
				var timeNow = Math.round(currentDate / 1000);
				dayNight = (timeNow < sunSet) ? "day" : "night";

                //Displaying API call results after storing them in above variables
                description.innerHTML =`<i id="icon-desc" class="wi wi-owm-${dayNight}-${id}"></i><p>${weatherDesc}</p>`;
                document.getElementById("temperature").innerHTML=`${tempFaren}<i id="icon-thermometer" class="wi wi-thermometer"></i>`;
                document.getElementById("humidity").innerHTML=humidity + "%";
                document.getElementById("windSpeed").innerHTML=windSpeed + "m/h";                                                     
               document.getElementById("visibility").innerHTML=`${visibility} miles`;

       }
	}
	requestWeather.send();	
}
}