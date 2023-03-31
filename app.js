//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require("mongoose");


const homeStartingContent = "This is my coding journal to record my journey of coding. It has been 10 months since I decided to quite my job and learnig coding. I have experienced all differnt phases, including the exciting phase, and the honeymoon phase and the panicking phase, but all in all, I am proud of myself for the decision I made, things will turn out great and I will never regret devoting myself into programming. I got this! ";
const aboutContent = "My name is Lingling Gan and I was a teacher for the past 10 years, due to many reasons, I decided to become a programmer, and I am still pushing myself to be prepared for this job!";
const contactContent = "Email: MandyGan123@yahoo.com";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
mongoose.connect("mongodb+srv://LinglingGan:520258abc@cluster0.cyufohm.mongodb.net/?retryWrites=true&w=majority", {useNewUrlParser: true});

const postSchema = {

  title: String,
 
  content: String
 
 };

 const Post = mongoose.model("Post", postSchema);
 
// let posts = [];

app.get("/", function(req, res){

  Post.find({}).then(function(posts){
    res.render("home", {startingContent: homeStartingContent, posts: posts
      });
  })
});

app.get("/compose", function(req, res){
  res.render("compose");
});

app.get("/about", function(req, res){
  res.render("about", {aboutContent: aboutContent});
});

app.get("/contact", function(req, res){
  res.render("contact", {contactContent: contactContent});
});


app.post("/compose", function(req, res){
  const post = new Post({
    title: req.body.postTitle,
    content: req.body.postBody
  });
  post.save();
  res.redirect("/");

  });

app.get("/posts/:postId", function(req, res){

  const requestedPostId = req.params.postId;
  
    Post.findOne({_id: requestedPostId}).then(function(post){
      res.render("post", { title: post.title, content: post.content
      });
    });
  });
  

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
