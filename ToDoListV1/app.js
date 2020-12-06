const express = require('express');
const bodyParser =  require('body-parser');
const path = require ('path');
const app = express();
const mongoose = require('mongoose')
const date = require(__dirname + "/date.js")
app.set('view engine', 'ejs');


mongoose.connect("mongodb://localhost:27017/toDoListDB", {useNewUrlParser: true, useUnifiedTopology: true},()=>{console.log("connected to database")});

const fulDate = date.getDate();

const itemSchema = new mongoose.Schema({
  // title: {type: String},
  taskjsn :{type:String, required: "Title must be entered"},
  buttontype:{type:String}
})
 const Item = new mongoose.model("Item",itemSchema);
//here we created item model and schema.......and below a few default items for root
const riding = new Item(
{
  taskjsn: 'today we ridin',
  buttontype:"not Work List"
})
const swim = new Item(
{
  taskjsn: 'today we swiming',
  buttontype:" not Work List"
})
//now i create a few default items for /working
const code = new Item(
  {
    taskjsn: 'do some coidng practice',
    buttontype: 'Work List'
  })

 const project = new Item(
   {
     taskjsn: 'finish your projects',
     buttontype: 'Work List'
     
   })




  




var taskArray = [];
var dbItemArray=[];





// we are checking if database is empty or not if empty we insert default items to be displayed in the list
// if (dbitem.length === 0){
//   Item.insertMany([riding,swim],function(err){
//   if(err){
//     console.log(err)
//   }
//   else{
//     console.log("data added into Items collection")
//   }
// })
// }
// else{
//   console.log("no default item was inserted")
// }





var taskJson;
var workArray = [];

app.use( express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: true}));






 app.get("/", function(req,res)
 {
  var currentDay = date.getDayy();
  var kindOfDay;
  var pageName = "";
  if (currentDay >= 4 || currentDay == 0 )
  {
    kindOfDay = "weekend";
  }
  else
  {
    kindOfDay="workday";
  }
console.log("current day is: "+ currentDay);

// here we initiated mongo find method that also checks if list is empty then it inserts default items into that list
Item.find({},(err, dbitems)=>
{
  console.log("here is dbitems"+ dbitems)
  
  // res.render('list', {dayNum: currentDay, dayName: fulDate, kindOfDay: kindOfDay, newTasks: dbitems, nameOfPage:pageName});
  if(dbitems.length == 0)
  {
    Item.insertMany([riding,swim,code,project],function(err)
    {
      if(err){console.log(err)}
      else{console.log("default items inserted    ---------------->[]")}
    })
    res.redirect("/");
  }
  else
  {  
    // dbitems.forEach(dbitem => 
    //   {
    //     if (dbitem.buttontype == "Work List")
    //     {  
    //       console.log("this is current taskArray"+ taskArray);
           
    //     }
    //     else
    //     {
    //       taskArray.push(dbitem);        }
        
    //   });

    console.log("no item was inserted");
    res.render('list', {dayNum: currentDay, dayName: fulDate, kindOfDay: kindOfDay, newTasks: dbitems, nameOfPage:pageName})
  }
  // dbitems.forEach((dbitem) => {
  //   dbItemArray = dbitem;

    
  //       if(dbitem.buttontype == "Work List"){
  //        workArray.push(dbitem)
  //       }
  //       else{
  //         taskArray.push(dbitem)
  //       }
  //     });
    
   
    
      
})


  });
  
  





 app.post("/", function(req,res)
 {
   var task = req.body.task;
   var timeLog = req.body.timelog;
   var buttonValue = req.body.listButton;
   console.log("task and timelog is:"+ task + "  "+timeLog);
   taskJson = { taskjsn:task, tasktime:timeLog};
   

   if (buttonValue == "Work List")
   {
    workArray.push( taskJson);
    console.log("work array is " + workArray)
    res.redirect("/working");
    const postMainItem = new Item({ taskjsn: task, buttontype: buttonValue});
    Item.insertOne()

   }
   else{
    // taskArray.push( taskJson);
    console.log("task array is " + taskArray)
    res.redirect("/");
    const postMainItem = new Item({ taskjsn: task, buttontype: buttonValue});
    
   }

  });

   




 app.get("/working", function(req,res)
 {var currentDay = date.getDayy();
  
  var kindOfDay;
  Item.find({},(err,dbitems)=>
  {
    dbitems.forEach(dbitem => 
    {
      if (dbitem.buttontype == "Work List")
      {
         workArray.push(dbitem);
      }
      else
      {
          console.log("this is current workArray"+ workArray);
      }
      
    });
  })

 
    var pageName = "working"
    kindOfDay = "Work List";
    res.render('list', {dayNum: currentDay, dayName: fulDate, kindOfDay: kindOfDay, newTasks: workArray, 
       nameOfPage:pageName});
      });
  


 












 app.listen(3000, function()
 {
   
   console.log("server started at port 3000");
   console.log("<********************************************************>");
   console.log("full date is:    "+fulDate);
   console.log("current time is: "+ date.getTime());
   
  });
   
  