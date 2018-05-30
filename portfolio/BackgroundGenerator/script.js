var h4=document.querySelector("h4");
var color1=document.querySelector(".color1");             // STORING ELEMENTS IN VARIABLES
var color2=document.querySelector(".color2");
var body=document.querySelector("body");
var button=document.getElementById("btn");

//Defaults

body.style.background="linear-gradient(to right," + color1.value + "," + color2.value + ")"; // Default Background(Via getting Input "Value")
h4.textContent="linear-gradient(to right," + color1.value + "," + color2.value + ")";    // INITIAL CSS displayed on page-load


//Event Handling code for Input type colors

color1.addEventListener("input",colorPicker);        // EventListeners
color2.addEventListener("input",colorPicker);

function colorPicker()                               // EventHandling function          
{
  body.style.background="linear-gradient(to right," + color1.value + "," + color2.value + ")";
  h4.textContent=body.style.background;
}
        

//"Random Button" functionality

function randomNumber()                            // Function for random number logic
{
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';

    for(var i = 0; i < 6; i++ ) 
    {
     color += letters[Math.round(Math.random() * 15)];
    }
     return color;
}

function generate()                           // Finally Generating 2 random numbers on "TRY RANDOM" button's click
{

   var value1=randomNumber();   
   var value2=randomNumber();

   color1.value=value1;
   color2.value=value2; 

   var a=document.createElement("a");
   var att1=document.createAttribute("href");
   att1.value="#";
   a.setAttributeNode(att1);

   var att2=document.createAttribute("onclick");
   att2.value="apply()";
   a.setAttributeNode(att2);

   var att3=document.createAttribute("id");
   att3.value="link";
   a.setAttributeNode(att3);

   var txt=document.createTextNode("click to apply");
   a.appendChild(txt); 
          
   body.appendChild(a); 	

   button.disabled=true;                    // Button gets disabled & stays disabled until new element link is clicked and removed.
    
 }

function apply()                             // Clicking link invokes this function
{

   colorPicker();   // Using common code from the function

   var link = document.getElementById("link");
   body.removeChild(link);

   button.disabled=false;       // Activating button after link removal

}











                                          



