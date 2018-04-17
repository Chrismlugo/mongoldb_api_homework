const express = require('express');
const parser = require('body-parser');
const server = express();

server.use(parser.json());
server.use(express.static('client/build'));
server.use(parser.urlencoded({extended: true}));

const MongoClient = require('mongodb').MongoClient

MongoClient.connect('mongodb://localhost:27017', function(err, client) {
  if (err) {
    console.log(err);
    return;
  }
  const db = client.db("hotel_reviews");

  console.log('Connected to database');

  server.post('/api/reviews', function(req, res){
  const quotesCollection = db.collection('reviews');
  const reviewToSave = req.body;
  quotesCollection.save(reviewToSave, function(err, result){
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

server.listen(3000, function(){
  console.log("Listening on port 3000");
});
})
