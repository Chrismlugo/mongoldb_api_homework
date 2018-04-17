const express = require('express');
const parser = require('body-parser');
const server = express();

server.use(parser.json());
server.use(express.static('client/build'));
server.use(parser.urlencoded({extended: true}));

const MongoClient = require('mongodb').MongoClient
const ObjectID = require('mongodb').ObjectID;

MongoClient.connect('mongodb://localhost:27017', function(err, client) {
  if (err) {
    console.log(err);
    return;
  }
  const db = client.db("hotel_reviews");

  console.log('Connected to database');

  server.post('/api/reviews', function(req, res){
  const reviewCollection = db.collection('reviews');
  const reviewToSave = req.body;
  reviewCollection.save(reviewToSave, function(err, result){
    if (err) {
      console.log(err);
      res.status(500)
      res.send();
    }

    console.log('saved to database');
    res.status(201);
    res.json(result.ops[0]);
  });
});

server.get('/api/reviews', function(req,res){
  const reviewCollection = db.collection('reviews');
  reviewCollection.find().toArray(function(err, allReviews){
    if(err){
      console.log(err);
      res.status(500);
      res.send();
    }

    res.json(allReviews);
  })
})

server.delete("/api/reviews", function(req,res){
  const reviewCollection = db.collection("reviews");
  const filterObject = {};
  reviewCollection.deleteMany(filterObject, function(err, result){
    if(err){
      console.log(err);
      res.status(500);
      res.send();
    }
    res.status(204);
    res.send();
  });
})

server.put("/api/reviews/:id", function(req,res){
  const reviewCollection = db.collection("reviews");
  const objectID = ObjectID(req.params.id);
  const filterObject = {_id: objectID};
  const updatedData = req.body;
  reviewCollection.update(filterObject, updatedData, function(err, result){
    if(err){
      res.status(500);
      res.send();
    }
    res.status(204);
    res.send();
  })
})

server.listen(3000, function(){
  console.log("Listening on port 3000");
});
})
