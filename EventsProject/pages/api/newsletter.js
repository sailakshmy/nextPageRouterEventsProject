import { MongoClient } from "mongodb";

function handler(req, res) {
  if (req.method === "POST") {
    const userEmail = req.body.email;
    if (!userEmail || !userEmail.includes("@")) {
      res.status(422).json({
        message: "Invalid user email!",
      });
      return;
    }
    MongoClient.connect(
      "mongodb://Groot:IAmGroot@ac-lpjqpry-shard-00-00.87nimnv.mongodb.net:27017,ac-lpjqpry-shard-00-01.87nimnv.mongodb.net:27017,ac-lpjqpry-shard-00-02.87nimnv.mongodb.net:27017/?replicaSet=atlas-ejgl3x-shard-0&ssl=true&authSource=admin&retryWrites=true&w=majority&appName=Cluster0"
    );
    console.log("userEmail", userEmail);
    res.status(201).json({
      message: "Signed up!",
    });
  }
}

export default handler;

// jRZTEHBvQHx2vGjA
