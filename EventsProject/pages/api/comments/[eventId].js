import {
  connectDatabase,
  getAllDocuments,
  insertDocument,
} from "../../../helpers/db-utils";

async function handler(req, res) {
  let client;
  try {
    client = await connectDatabase();
  } catch (error) {
    res.status(500).json({
      message: "Could not connect to database!",
    });

    return;
  }
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

      client.close();
      return;
    }

    const newComment = {
      email,
      name,
      text,
      eventId,
    };
    let result;
    try {
      result = await insertDocument(client, "comments", newComment);
      newComment._id = result.insertedId.toString(); // Convert ObjectId to string

      res.status(201).json({
        message: "Added comments",
        comment: newComment,
      });

      client.close();
    } catch (error) {
      res.status(500).json({
        message: "Inserting comment failed!",
      });

      client.close();
      return;
    }
  }
  if (req.method === "GET") {
    let documents;
    try {
      documents = await getAllDocuments(client, "comments", { _id: -1 });
      res.status(200).json({
        comments: documents,
      });

      client.close();
    } catch (error) {
      res.status(500).json({
        message: "Getting comments failed!",
      });

      client.close();
      return;
    }
  }
}

export default handler;
