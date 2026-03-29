const express = require("express");
const { MessagingResponse } = require("twilio").twiml;

const app = express();

// IMPORTANT: Twilio uses urlencoded
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  return res.status(200).json({
    message: "robot is coming! wait a moment",
  });
});

// WhatsApp webhook
app.post("/whatsapp", (req, res) => {
  const incomingMsg = req.body.Body || "";
  const from = req.body.From;

  console.log(`Message from ${from}: ${incomingMsg}`);

  const twiml = new MessagingResponse();

  twiml.message(
    `Hello 👋\nWe received: "${incomingMsg}"\nWe will reply shortly.`
  );

  res.writeHead(200, { "Content-Type": "text/xml" });
  res.end(twiml.toString());
});

// fallback port
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});