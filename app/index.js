const tracer = require("./tracing")("todo-service"); // todo-service is the name given to this service; feel free to change this to your own name
const express = require("express");
const { MongoClient } = require("mongodb");
const app = express();
app.use(express.json());
const port = 3000;
let db;
app.get("/todo", async (req, res) => {
  const todos = await db.collection("todos").find({}).toArray();
  res.send(todos);
});
app.get("/todo/:id", async (req, res) => {
  // uncomment next line to introduce a pause of 1 second in 30% of the requests  
  // if (Math.random() < 0.3)  { await sleep(1000)  }   
  const todo = await db
    .collection("todos")
    .findOne({ id: req.params.id });
  res.send(todo);
});
const startServer = () => {
  MongoClient.connect("mongodb://localhost:27017", (err, client) => {
    db = client.db("todo");
    db.collection("todos").insertMany([
     { id: "1", title: "Buy groceries" },
     { id: "2", title: "Install Aspecto" },
     { id: "3", title: "buy my own name domain" },
   ]);
 })
  };
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });

startServer();

function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }