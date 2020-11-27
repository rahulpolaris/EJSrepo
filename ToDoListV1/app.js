const express = require('express');
const bodyParser =  require('body-parser');
const path = require ('path');
const app = express();
app.set('view engine', 'ejs');


var a = new Date() ;

app.use( express.static(path.join(__dirname, 'public')));

 app.get("/", function(req,res)
 {var currentDay = a.getDay();
  var nameOfDay;
  switch (currentDay)
  {
  case 0 : nameOfDay = "sunday"
  break;
  case 1 : nameOfDay = "monday"
  break;
  case 2 : nameOfDay =  "tueday"
  break;
  case 3 : nameOfDay = " wesnday"
  break;
  case 4 : nameOfDay = "thursday"
  break;
  case 5 : nameOfDay = "friday"
  break;
  case 6 : nameOfDay = "saturday"
  break;
  default:
    nameOfDay="oops"
    break;
  }
  console.log("current day is " + nameOfDay );
  res.render('list', {dayName: nameOfDay });
  if (a.getDay() >= 4 && a.getDay()<=6)
  {
    res.render('list', {kindOfDay: 'weekend' , dayName: nameOfDay, dayNum: currentDay});
  }   
  else
  {
    res.render('list', {kindOfDay: 'workday' ,dayName: nameOfDay ,dayNum: currentDay});
  }
 
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
 });