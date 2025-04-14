import { MongoClient } from "mongodb";

async function connectDatabase() {
  const client = await MongoClient.connect(
    "mongodb://Groot:IAmGroot@ac-lpjqpry-shard-00-00.87nimnv.mongodb.net:27017,ac-lpjqpry-shard-00-01.87nimnv.mongodb.net:27017,ac-lpjqpry-shard-00-02.87nimnv.mongodb.net:27017/events?replicaSet=atlas-ejgl3x-shard-0&ssl=true&authSource=admin&retryWrites=true&w=majority&appName=Cluster0"
  );
  return client;
}

async function insertDocument(client, document) {
  const db = client.db();
  const result = await db.collection("newsletter").insertOne(document);
  return result;
}

async function handler(req, res) {
  if (req.method === "POST") {
    const userEmail = req.body.email;
    if (!userEmail || !userEmail.includes("@")) {
      res.status(422).json({
        message: "Invalid user email!",
      });
      return;
    }
    let client;
    try {
      client = await connectDatabase();
    } catch (error) {
      res.status(500).json({
        message: "Could not connect to database!",
      });
      return;
    }
    try {
      await insertDocument(client, { email: userEmail });

      client.close();
    } catch (error) {
      res.status(500).json({
        message: "Inserting data failed!",
      });
      client.close();
      return;
    }

    console.log("userEmail", userEmail);
    res.status(201).json({
      message: "Signed up!",
    });
  }
}

export default handler;

// jRZTEHBvQHx2vGjA
