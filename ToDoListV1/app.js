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
var task;
var timeLog;
var taskArray = [];
var taskJson;

app.use( express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: true}));

 app.get("/", function(req,res)
 {var currentDay = a.getDay();
  var nameOfDay;
  
  
  var kindOfDay;

 
  
    kindOfDay = "workday";
    res.render('list', {dayNum: currentDay, dayName: fulDate, kindOfDay: kindOfDay, newTask: taskArray, timeName: fulTime});
  

 });

 app.post("/", function(req,res)
 {
    task = req.body.task;
    timeLog = req.body.timelog;
   console.log("task and timelog is:"+ task + "  "+timeLog);
   taskJson = { taskjsn:task, tasktime:timeLog}
   taskArray.push( taskJson);
   console.log("task array is " + taskArray)
   res.redirect("/");
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