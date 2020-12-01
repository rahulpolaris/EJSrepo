//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const date = require(__dirname + "/date.js");
const lowerCase = require("lodash/lowerCase");
const truncate = require("lodash/truncate");

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutStartingContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactStartingContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();
const blogPostArrays = [];
var pmtr;

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));




//rendering home page.................................
app.get("/",function(req,res)
{ var shortBlogs=[];
  let a = "home"

blogPostArrays.forEach((blogPostArray)=>
{
  var shortPost=
  {
    shortTitle: blogPostArray.blogTitle,
    shortMessage: truncate(blogPostArray.blogMessage,{'length':35})
  }
  shortBlogs.push(shortPost);
});

console.log("this should be path"+req.route.path)
console.log("this should be id: "+req.query.id)
res.render(a, {foo: "home", pageContent: homeStartingContent, contentArrays: blogPostArrays,shortBlogs:shortBlogs});
});








//rendering about page.................................
app.get("/about",function(req,res)
{
  let a = "about"
res.render(a, {foo: "home", pageContent: aboutStartingContent});

console.log("this should be path"+req.route.path)
console.log("this should be id: "+req.query.id)
});


//rendering contact page.................................
app.get("/contact",function(req,res)
{
  let a = "contact"
res.render(a, {foo: "home", pageContent: contactStartingContent});

console.log("this should be path"+req.route.path)
console.log("this should be id: "+req.query.id)
});



//rendering compose page.................................
app.get("/compose",function(req,res)
{
  let a = "compose"
res.render(a);

console.log("this should be path"+req.route.path)
console.log("this should be id: "+req.query.id)

});




//rendering post page.....................
app.get("/post/:topic",(req,res)=>
{  
  var compareParam = 0 ;
  pmtr = req.params.topic;
  console.log("this is the parameter:  >"+pmtr);
  // const result = blogPostArrays.find(({blogTitle})=>{blogTitle==="football";});
  blogPostArrays.forEach((blogPostArray)=>{
    if(lowerCase(blogPostArray.blogTitle) === lowerCase(pmtr))
    {
      compareParam = 1;
      res.render("post",{postsTitle:blogPostArray.blogTitle, postsMessage:blogPostArray.blogMessage})
    }

});
if(compareParam)
{
   console.log("parameter found");
  //  res.render("posts",{postsTitle:blogPostArray.blogTitle, postsMessage:blogPostArray.blogMessage})
  }
else{console.log("parameter not found");}

 
});




//form data collection from...compose page........
 app.post("/compose",function(req,res)
 {
  var blogPost = {
    blogMessage: req.body.blog,
    blogTitle: req.body.title
  }
  blogPostArrays.push(blogPost);
  console.log("message: "+ blogPost.blogMessage);
  console.log(blogPostArrays);
  res.redirect("/");

 });














app.listen(3000, function() {
  console.log("Server started on port 3000");
  console.log("current time is: "+date.getTime());
  // const array = [0,1,,,,5,6];
  // array.find(function(volu, index) {
  //   console.log('Visited index ', index, ' with value ', volu);  });  
});