var btn=document.getElementById("btn");
var quote=document.getElementById("random-quote");
   	 
      btn.addEventListener("click",function()
      {

      var request=new XMLHttpRequest();

      request.open("GET","https://talaikis.com/api/quotes/random/",true);
      request.onload=function()
      {
            var data=JSON.parse(request.responseText);
            renderHTML(data);
                 	    
      }
      request.onerror=function()
      {
            console.log("Connection Error");
      }
      
      request.send();
      });
      
      function renderHTML(data)
      {
          var html=data.quote + "<br>" + "<p class='author text-right font-weight-bold'>- " + data.author + "</p>";
          quote.innerHTML=html; 
      }
