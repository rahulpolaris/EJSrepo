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

app.use( express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: true}));

 app.get("/", function(req,res)
 {var currentDay = a.getDay();
  var nameOfDay;
  
  
  var kindOfDay;

 
  if (a.getDay() >= 4 && a.getDay()<=6)
  {
    kindOfDay = "weekend";
    res.render('list', { dayNum: currentDay, dayName: fulDate , kindOfDay: kindOfDay});
  }   
  else
  {
    kindOfDay = "workday";
    res.render('list', {dayNum: currentDay, dayName: fulDate, kindOfDay: kindOfDay});
  }

 });

 app.post("/", function(req,res)
 {
   var task = req.body.task;
   var timeLog = req.body.timelog;
   console.log("task and timelog is:"+ task + timeLog);
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
 });