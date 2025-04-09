function handler(req, res) {
  if (req.method === "POST") {
    const userEmail = req.body.email;
    if (!userEmail || !userEmail.includes("@")) {
      res.status(422).json({
        message: "Invalid user email!",
      });
      return;
    }
    console.log("userEmail", userEmail);
    res.status(201).json({
      message: "Signed up!",
    });
  }
}

export default handler;
