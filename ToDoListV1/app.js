const express = require('express');
const bodyParser =  require('body-parser');
const path = require ('path');
const app = express();
const date = require(__dirname + "/date.js")
app.set('view engine', 'ejs');



const fulDate = date.getDate();


var taskArray = [{taskjsn:'Riding'}, {taskjsn:'surfing'},{taskjsn:'breakfast'}];
var taskJson;
var workArray = [];

app.use( express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: true}));

 app.get("/", function(req,res)
 {var currentDay = date.getDayy();
  
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

  res.render('list', {dayNum: currentDay, dayName: fulDate, kindOfDay: kindOfDay, newTask: taskArray, nameOfPage:pageName});
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
 {var currentDay = date.getDayy();
  
  var kindOfDay;

 
    var pageName = "working"
    kindOfDay = "Work List";
    res.render('list', {dayNum: currentDay, dayName: fulDate, kindOfDay: kindOfDay, newTask: workArray,  nameOfPage:pageName});
  

 });

 












 app.listen(3000, function()
 {
   
   
   
   console.log("server started at port 3000");
   console.log("<********************************************************>");
   console.log("full date is:    "+fulDate);
   console.log("current time is: "+ date.getTime());
   
 });