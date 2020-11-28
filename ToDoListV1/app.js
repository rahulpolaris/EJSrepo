const express = require('express');
const bodyParser =  require('body-parser');
const path = require ('path');
const app = express();
app.set('view engine', 'ejs');


var a = new Date() ;
var options = {
  weekday:'long',
  year: 'numeric',
  month:'long',
  day: 'numeric'
};
var fulDate = a.toLocaleDateString("en-US", options);
var fulTime = a.toLocaleTimeString("en-US")

var taskArray = [];
var taskJson;
var workArray = [];

app.use( express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: true}));

 app.get("/", function(req,res)
 {var currentDay = a.getDay();
  var nameOfDay;
  var kindOfDay;
  var pageName = "";
  if (currentDay >= 4 )
  {
    kindOfDay = "weekend";
  }
  else
  {
    kindOfDay="workday";
  }
console.log("current day is: "+ currentDay);

  res.render('list', {dayNum: currentDay, dayName: fulDate, kindOfDay: kindOfDay, newTask: taskArray, timeName: fulTime, nameOfPage:pageName});
  });
  



 app.post("/", function(req,res)
 {
   var task = req.body.task;
   var timeLog = req.body.timelog;
   var buttonValue = req.body.listButton;
   console.log("task and timelog is:"+ task + "  "+timeLog);
   taskJson = { taskjsn:task, tasktime:timeLog}
   if (buttonValue == "Work List")
   {
    workArray.push( taskJson);
    console.log("work array is " + workArray)
    res.redirect("/working");

   }
   else{
    taskArray.push( taskJson);
    console.log("task array is " + taskArray)
    res.redirect("/");
   }


   
  });




 app.get("/working", function(req,res)
 {var currentDay = a.getDay();
  var nameOfDay; 
  var kindOfDay;

 
    var pageName = "working"
    kindOfDay = "Work List";
    res.render('list', {dayNum: currentDay, dayName: fulDate, kindOfDay: kindOfDay, newTask: workArray, timeName: fulTime,  nameOfPage:pageName});
  

 });

 












 app.listen(3000, function()
 {
   
   var ah = a.getHours();

   if(ah>=12)
   {  if(ah>12){ah = ah-12;}
       
       if (a.getMinutes()>0){var b= 'pm';}
       
   } 
   else
   {
     var b = 'am';
   }
   console.log("cuurent time: "+ ah+ ":"+a.getMinutes()+":"+a.getSeconds()+b);
   console.log("server started at port 3000");
   console.log("<********************************************************>");
   console.log("full date is: "+fulDate);
   console.log("full time is: "+ fulTime);
 });