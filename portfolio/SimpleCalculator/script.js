var display = document.getElementById("display");

function clr()        //Clearing Input Box
{ 
   display.value="";
}

function getNum(value)   //Getting Key Values and Display them on screen
{
  display.value=display.value+value;  
}

function getOp(op)       //Receiving operators
{
   
   display.value=display.value+op;
}

function calculate()    //calculation of available expression using eval() method
{
	var answer=eval(display.value);
    display.value=answer;
}
