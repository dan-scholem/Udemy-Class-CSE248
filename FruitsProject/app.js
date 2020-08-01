// const MongoClient = require('mongodb').MongoClient;
// const assert = require('assert');

const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/fruitsDB", { useNewUrlParser: true, useUnifiedTopology: true});


// // Connection URL
// const url = 'mongodb://localhost:27017';
//
// // Database Name
// const dbName = 'fruitsDB';
//
// // Create a new MongoClient
// const client = new MongoClient(url);
//
// // Use connect method to connect to the Server
// client.connect(function(err) {
//   assert.equal(null, err);
//   console.log("Connected successfully to server");
//
//   const db = client.db(dbName);
//
//   // insertDocuments(db, function() {
//   //   client.close();
//   // });
//
//   findDocuments(db, function() {
//       client.close();
//     });
// });


//Replaces insertDocuments
const fruitSchema = new mongoose.Schema ({
  name: {
    type: String,
    required: [true, "Fruit name required"]
  },
  rating: {
    type: Number,
    min: 1,
    max: 10
  },
  review: String
});

const Fruit = mongoose.model("Fruit", fruitSchema);

const fruit = new Fruit ({
  rating: 10,
  review: "Peaches are so yummy"
});

//fruit.save();

//Challenge
const personSchema = new mongoose.Schema ({
  name: String,
  age: Number,
  favoriteFruit: fruitSchema
});

const Person = mongoose.model("Person", personSchema);

const mango = new Fruit({
  name: "Mango",
  score: 6,
  review: "Decent fruit"
})

mango.save();

Person.updateOne({name: "John"}, {favoriteFruit: mango}, function(err){
    if (err) {
      console.log(err);
    } else {
      console.log("Successfully updated the document");
    }
});

// const person = new Person ({
//   name: "Amy",
//   age: 12,
//   favoriteFruit: pineapple
// });

//person.save();

// const kiwi = new Fruit({
//   name: "Kiwi",
//   rating: 8,
//   review: "I come from the land down unda"
// });
//
// const orange = new Fruit ({
//   name: "Orange",
//   rating: 7,
//   review: "Tart yet delicious"
// });
//
// const banana = new Fruit ({
//   name: "Banana",
//   rating: 9,
//   review: "Gimme some peanut butter"
// });

// Fruit.insertMany([kiwi, orange, banana], function(err){
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("Successfully saved all the fruits to fruitsDB");
//   }
// });

// const insertDocuments = function(db, callback) {
//   // Get the documents collection
//   const collection = db.collection('fruits');
//   // Insert some documents
//   collection.insertMany([{
//     name: "Apple",
//     score: 8,
//     review: "Great fruit"
//   }, {
//     name: "Orange",
//     score: 6,
//     review: "Kinda sour"
//   }, {
//     name: "Banana",
//     score: 9,
//     review: "Great stuff!!"
//   }], function(err, result) {
//     assert.equal(err, null);
//     assert.equal(3, result.result.n);
//     assert.equal(3, result.ops.length);
//     console.log("Inserted 3 documents into the collection");
//     callback(result);
//   });
// }


Fruit.find(function(err, fruits){
  if (err) {
    console.log(err);
  } else {
    //console.log(fruits);
    mongoose.connection.close();
    fruits.forEach(function(fruit){
      console.log(fruit.name);
    });
  }
});

// Fruit.updateOne({_id: "5f25a0dbd370743af874be99"}, {name: "Peach"}, function(err){
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("Successfully updated the document");
//   }
// });

//Can use any identifier
// Fruit.deleteOne({_id: "5f25b04d5fe09b2a90c82e21"}, function(err){
//     if (err) {
//       console.log(err);
//     } else {
//       console.log("Successfully deleted content");
//     }
// });
//
// Person.deleteOne({_id: "5f25af79ce018a22380bad61"}, function(err){
//     if (err) {
//       console.log(err);
//     } else {
//       console.log("Successfully deleted content");
//     }
// });

// Person.deleteMany({name: "John"}, function(err){
//     if (err) {
//       console.log(err);
//     } else {
//       console.log("Successfully deleted content");
//     }
// });


const findDocuments = function(db, callback) {
  // Get the documents collection
  const collection = db.collection('fruits');
  // Find some documents
  collection.find({}).toArray(function(err, fruits) {
    assert.equal(err, null);
    console.log("Found the following records");
    console.log(fruits)
    callback(fruits);
  });
}
