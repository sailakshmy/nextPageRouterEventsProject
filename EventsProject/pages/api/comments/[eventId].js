function handler(req, res) {
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
      id: new Date().toISOString(),
      email,
      name,
      text,
    };
    console.log("data", newComment);
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
    res.status(200).json({
      comments: dummyComments,
    });
  }
}

export default handler;
