//jshint esversion:6

const express = require("express");
const app = express();

app.get("/", function(req, res) {
  res.send("<h1>Hello, world!</h1><h2>Again</h2>");
});

app.get("/contact", function(req, res) {
  res.send("Contact me at: dan.scholem@gmail.com");
});

app.get("/about", function(req, res) {
  res.send("<h1>My name is Dan Scholem!</h1><h2>I'm an aspiring web dev and cyber security analyst</h2><p>I love to code, eat pizza, sleep, and play video games</p>")
})

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
