import { MongoClient } from "mongodb";

async function handler(req, res) {
  const client = await MongoClient.connect(
    "mongodb://Groot:IAmGroot@ac-lpjqpry-shard-00-00.87nimnv.mongodb.net:27017,ac-lpjqpry-shard-00-01.87nimnv.mongodb.net:27017,ac-lpjqpry-shard-00-02.87nimnv.mongodb.net:27017/events?replicaSet=atlas-ejgl3x-shard-0&ssl=true&authSource=admin&retryWrites=true&w=majority&appName=Cluster0"
  );
  const eventId = req.query.eventId;
  if (req.method === "POST") {
    const { email, name, text } = req.body;
    if (
      !email ||
      !email.includes("@") ||
      !name ||
      name.trim() === "" ||
      !text ||
      text.trim() === ""
    ) {
      res.status(422).json({
        message: "Invalid inputs",
      });
      return;
    }

    const newComment = {
      email,
      name,
      text,
      eventId,
    };

    const db = client.db();
    const result = await db.collection("comments").insertOne(newComment);
    console.log("data", newComment, result);
    newComment.id = result.insertedId.toString(); // Convert ObjectId to string
    res.status(201).json({
      message: "Added comments",
      comment: newComment,
    });
  }
  if (req.method === "GET") {
    const dummyComments = [
      {
        id: "c1",
        name: "xyz",
        email: "s@s.com",
        text: "Some comments",
      },
      {
        id: "c2",
        name: "xyaz",
        email: "s@as.com",
        text: "Some comments again",
      },
    ];
    const db = client.db();
    const documents = await db
      .collection("comments")
      .find()
      .sort({ _id: -1 }) // Sort by _id in descending order
      .toArray();
    console.log("documents", documents);
    res.status(200).json({
      comments: documents,
    });
    client.close();
  }
}

export default handler;
