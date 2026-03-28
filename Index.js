const express = require('express')
const messagingReponse = require("twilio")
const app = express()
app.use(express.json())

app.get('/', (req,res)=>{
 return res.status(200).json({
   message:"robot is coming ! wait amoment"
 })
})

app.post("/sentmsg", (req, res)=>{
  const chatbx = new messagingReponse()
  chatbx.message("robot is busy wait a moment")
  return res.status(200).send(chatbx.toString())
})

app.post("/whatsapp", (req, res) => {
  const incomingMsg = req.body.Body || "";
  const from = req.body.From;

  console.log(`Message from ${from}: ${incomingMsg}`);

  // Create Twilio response
  const twiml = new MessagingResponse();
  twiml.message(
    `Hello! 👋\nWe received your message: "${incomingMsg}".\nThank you for contacting us!`
  );

  res.writeHead(200, { "Content-Type": "text/xml" });
  res.end(twiml.toString());
});


app.listen(3000, ()=>{
  console.log("app listen on port 3000")
})