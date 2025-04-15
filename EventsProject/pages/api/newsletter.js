import { connectDatabase, insertDocument } from "../../helpers/db-utils";

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
      await insertDocument(client, "newsletter", { email: userEmail });

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
