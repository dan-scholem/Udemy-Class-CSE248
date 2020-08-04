//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const _ = require("lodash");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/todolistDB", {
  useNewUrlParser: true
});

const itemsSchema = new mongoose.Schema({
  name: String
});

const Item = new mongoose.model("Item", itemsSchema);

const Beer = new Item({
  name: "Beer"
});

const Water = new Item({
  name: "Water"
});

const Soda = new Item({
  name: "Soda"
});

const defaultItems = [Beer, Water, Soda];

const listSchema = {
  name: String,
  items: [itemsSchema]
};

const List = mongoose.model("List", listSchema);

app.get("/", function(req, res) {

  Item.find({}, function(err, items) {

    if (items.length === 0) {
      Item.insertMany(defaultItems, function(err) {
        if (err) {
          console.log();
        } else {
          console.log("Successfully inserted items to DB");
        }
      });
      res.redirect("/");
    } else {
      if (err) {
        console.log(err);
      } else {
        res.render("list", {
          listTitle: "Today",
          newListItems: items
        });
      }
    }
  });
});

app.get("/:customListName", function(req, res) {
  const customListName = _.capitalize(req.params.customListName);

  List.findOne({
    name: customListName
  }, function(err, foundList) {
    if (!err) {
      if (!foundList) {
        const list = new List({
          name: customListName,
          items: defaultItems
        });
        list.save();
        res.redirect("/" + customListName);
        //console.log("Doesn't exist");
      } else {
        res.render("list", {
          listTitle: foundList.name,
          newListItems: foundList.items
        });
        //console.log("Exists");
      }
    }
  });
});

app.post("/", function(req, res) {

  const itemName = req.body.newItem;
  const listName = req.body.list;

  const item = new Item({
    name: itemName
  });

  if (listName === "Today") {
    item.save();
    res.redirect("/");
  } else {
    List.findOne({
      name: listName
    }, function(err, foundList) {
      if (!err) {
        foundList.items.push(item);
        foundList.save();
        res.redirect("/" + listName);
      }
    })
  }



  // if (req.body.list === "Work") {
  //   workItems.push(item);
  //   res.redirect("/work");
  // } else {
  //   items.push(item);
  //   res.redirect("/");
  // }
});

app.post("/delete", function(req, res) {
  //console.log(req.body.checkBox);

  const checkedItemId = req.body.checkBox;
  const listName = req.body.listName;
  if (listName === "Today") {
    Item.findByIdAndRemove(checkedItemId, function(err) {
      if (!err) {
        console.log("Successfully removed checked item");
        res.redirect("/");
      }
    });
  } else {
    List.findOneAndUpdate({name: listName}, {$pull: {items: {_id: checkedItemId}}}, function(err, foundList){
      if(!err) {
        res.redirect("/" + listName);
      }
  });
  }
});

// app.get("/work", function(req, res) {
//   res.render("list", {
//     listTitle: "Work List",
//     newListItems: workItems
//   });
// });

app.get("/about", function(req, res) {
  res.render("about");
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
