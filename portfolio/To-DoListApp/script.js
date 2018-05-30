var inputItem=document.getElementById("inputItem");  //input field
var btn=document.getElementById("addItem");       //"Add" button
var incomplete=document.getElementById("incomplete");   //<ul>incomplete-items
var toDoListItems=document.querySelector("#incomplete li");

var deleteBtn=document.createElement("button");   //Creating delete button for defaults 
    deleteBtn.innerText="Delete";
    deleteBtn.className="delete";
    toDoListItems.appendChild(deleteBtn);



btn.addEventListener("click",checkInputLength); 
inputItem.addEventListener("keypress",checkKeyInput); 




function inputLength()                          
{
   return inputItem.value.length; 
}


function checkInputLength()                       
{
      if(inputLength()>0)
      {
         createItem();
      }
     
}

function checkKeyInput(event)               //function for Adding item to list when user presses enter inside the input field
{
   if(inputLength()>0 && event.keyCode===13)
      {
         createItem();
      }
}



function createItem()   //Function for Creating new list item with options "edit & delete"
{
   
   var item=document.createElement("li");
   item.appendChild(document.createTextNode(inputItem.value));
   inputItem.value="";

   var deleteBtn=document.createElement("button");
   deleteBtn.innerText="Delete";
   deleteBtn.className="delete";

   item.append(deleteBtn);
   incomplete.appendChild(item);

   
  deleteBtn.addEventListener('click',function()        
  {
      this.parentNode.style.display="none";
  });

 }

   
                                                                              
deleteBtn.addEventListener('click',function()        //Delete functionality for all delete buttons under 'complete'/'incomplete' List items
  {
      deleteBtn.parentNode.style.display="none";
  });

var list=document.querySelector("ul");
list.addEventListener('click',function(ev){
     ev.target.classList.toggle('checked');
})

