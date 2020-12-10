const express = require('express');
const bodyParser =  require('body-parser');
const path = require ('path');
const app = express();
const mongoose = require('mongoose');
const { getDayType } = require('./date');
const date = require(__dirname + "/date.js")
const lowerCase = require("lodash/lowerCase");

app.set('view engine', 'ejs');
app.use( express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: true}));
mongoose.connect("mongodb://localhost:27017/toDoListDB", {useNewUrlParser: true, useUnifiedTopology: true},()=>{console.log("connected to database")});



const fulDate = date.getDate();
var taskArray = [];
var dbItemArray=[];
var taskJson;
var workArray = [];



// var listObj

















const itemSchema = new mongoose.Schema({
  // title: {type: String},
  taskjsn :{type:String, required: "Title must be entered"},
  buttontype:{type:String}
})
const listSchema = new mongoose.Schema(
  {
    listName: {
      type: String
      // ,
      //  required: 'enter list name'
      },
    listItems: [itemSchema]
  })

 const List = new mongoose.model('List',listSchema); 
 const Item = new mongoose.model("Item",itemSchema);


//here we created (item and list) model and schema.......and below a few default items for root(home) list
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
//now i create a few default items for /:somelist parameter(express routing)...first some default listItems...then a default list
const default1 = new Item(
  {
    taskjsn: 'default item 1',
    buttontype: this.listName
  })

 const default2 = new Item(
   {
     taskjsn: 'default item 2',
     buttontype: this.listName
     
   })
// this is a default list model for test
   const work = new List(
     {
       listName: 'work',
       listItems: [default1,default2]
     })
    //  work.save()
    var defaultItems = [default1,default2]

  
    function tempTest()
    { 
      
      
      List.find({},(err,lists)=>
      {   
      if (err)
      {
        console.log(err)
      }
      else
      {
        console.log("this is array of lists [] [] [] [] [] [] []");
        // console.log(lists);
        listObj = lists;  
        console.log(listObj + "heheeeeeeeeeeeeeeee")   
       
      }
    })
        

    }



  






















 app.get("/", function(req,res)
 {
  var currentDay = date.getDayy();
  var kindOfDay;
  var pageName = "home";
  
    kindOfDay=date.getDayType();
  
console.log("current day is: "+ currentDay);
// here we initiated model.prototype.find method that also checks if list is empty, then it inserts default items into that list
Item.find({},(err, dbitems)=>
{
  // console.log("here is dbitems"+ dbitems)
  // res.render('list', {dayNum: currentDay, dayName: fulDate, kindOfDay: kindOfDay, newTasks: dbitems, nameOfPage:pageName});
  if(dbitems.length == 0)
  {
    Item.insertMany([riding,swim,default1,default2],function(err)
    {
      if(err){console.log(err)}
      else{console.log("default items inserted    ---------------->[]")}
    })
    res.redirect("/");
  }
  else
  {  
    
    console.log("no item was inserted");
    List.find({},(err,listoflists)=>
    {
      if(err){console.log(err)}
      else
      {
    res.render('list', {dayNum: currentDay, dayName: fulDate, kindOfDay: kindOfDay, newTasks: dbitems, nameOfPage:pageName, listoflists: listoflists})
      }
       })
  }
})
// console.log(listObj + "hoooooooooooohooooooooooooooooo")
});
  
    

    


  
  








 app.post("/", function(req,res)
 {
   var task = req.body.task;
   var timeLog = req.body.timelog;
   var buttonValue = req.body.listButton;
   console.log("task and timelog is:"+ task + "  "+timeLog);
   console.log("this is button value "+ buttonValue )
   taskJson = { taskjsn:task, tasktime:timeLog};
   const postMainItem = new Item({ taskjsn: task, buttontype: buttonValue});

   if (buttonValue == "home")
   {
    // workArray.push( taskJson);
    // console.log("work array is " + workArray)
    // const postMainItem = new Item({ taskjsn: task, buttontype: buttonValue});
    postMainItem.save();
    res.redirect("/");
   }
  else 
  {
   // taskArray.push( taskJson);
   List.findOne({listName: buttonValue}, (err,foundList)=>
   {
      //  if(err){console.log(err)}
      //  else
      //  {
         foundList.listItems.push(postMainItem)
         foundList.save();
        //  setTimeout(()=>{res.redirect("/lists/"+buttonValue)},1500)
         res.redirect("/lists/"+buttonValue)
         
      //  }
      console.log("found list is: "+ foundList)
   }) 


  }

 });

    
    

   




 app.get("/lists/:somelist", function(req,res)
 { 
    var currentDay = date.getDayy();
  var kindOfDay = date.getDayType();
  var temp = 0;
  console.log("bruh this is parameter obj for rooot..----------->"+"xxxxx"+"<---------------")
  console.log(req.params)
  const parameter = req.params.somelist;
  console.log("bruh this is parameter for rooot..----------->"+parameter+"<---------------")

 

    // List.find({},(err,allLists)=>{
    //   if (allLists.length == 0)
    //   {
    //     list.save()
    //     console.log("Listcollection was empty just saved one")
    //     res.redirect("/" + parameter)


    //   }
    //   else
    //   {
    //     console.log("ListCollection was not empty....[]X")
    //     res.render("list",{dayName:fulDate,dayNum:currentDay,kindOfDay:kindOfDay,newTasks:[{taskjsn: "work1"},{taskjsn:"work2"}],nameOfPage:parameter})

    //   }
    // }) 
     
     
  List.findOne({listName: parameter},(err,list)=>
  {
     if(err)
     {
       console.log(err)
       
     }
     else
     { 
       if(list)
       {       
          console.log("here is that specific list "+parameter + " :------------ ");
          console.log(list)
          console.log("specific list")
          List.find({},(err,listoflists)=>
          {
            if(err){console.log(err)}
            else
            {
              res.render("list",{dayName:fulDate,dayNum:currentDay,kindOfDay:kindOfDay,newTasks:list.listItems,nameOfPage:parameter,listoflists:listoflists})
            }
          })
         

        }              
       else
       {
        console.log("specific list "+parameter+" doesnt XXXXXXX ........EXIST.........XXXX")
        const list = new List(
          {
            listName: parameter,
            listItems: defaultItems
          })
          list.save();
          
          List.find({},(err,listoflists)=>
          {
            if(err){console.log(err)}
            else
            {
              res.render("list",{dayName:fulDate,dayNum:currentDay,kindOfDay:kindOfDay,newTasks:list.listItems,nameOfPage:parameter,listoflists:listoflists})
            }
          })
       }
     }
   })
    
      
  
   
 });
        
       
      
  














app.post("/delete",(req,res)=>
{
  console.log(req.body.listCheckBox)
  Item.findByIdAndDelete(req.body.listCheckBox,function(err)
  {
    if(err){console.log(err)}
    else
    {
      console.log("successfully deleted")
      res.redirect("/")
    }
  })
})

 
  


 


















 app.listen(3000, function()
 {
   
   console.log("server started at port 3000");
   console.log("<********************************************************>");
   console.log("full date is:    "+fulDate);
   console.log("current time is: "+ date.getTime());
  //  tempTest();
  
  });
   
  