const { Client, GatewayIntentBits } = require("discord.js");
const mongoose = require('mongoose');
const shortid = require('shortid');
const express = require('express');

// Define MongoDB connection URL and options
const mongoURI = 'mongodb://localhost:27017/bot';


// Define Mongoose schema for URL data
const urlSchema = new mongoose.Schema({
  originalUrl: String,
  shortId: String,
});

// Create Mongoose model based on the schema
const UrlModel = mongoose.model('Url', urlSchema);

// Connect to MongoDB
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  bufferCommands: false, // Disable command buffering
  bufferTimeoutMS: 0, // Set buffer timeout to 0 (no timeout)
})
  .then(() => {
    console.log('Connected to the database');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });

// Create Express app
const app = express();

// Define a route for handling custom short URLs
app.get('/:shortId', async (req, res) => {
  const { shortId } = req.params;

  try {
    // Find the URL document with the matching short ID
    const urlDoc = await UrlModel.findOne({ shortId });

    if (urlDoc) {
      // Redirect to the original URL
      res.redirect(urlDoc.originalUrl);
    } else {
      res.status(404).send('Short URL not found');
    }
  } catch (err) {
    console.error('Error finding URL in the database:', err);
    res.status(500).send('Internal Server Error');
  }
});

// Start the Express server
const PORT = 3000; // Choose a port for your server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Create Discord bot client
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.on("messageCreate", async (message) => {
  if (message.author.bot) return; // Ignore messages from bots

  // Check if the message contains a URL
  const urlRegex = /(https?:\/\/[^\s]+)/;
  const matchedUrl = message.content.match(urlRegex);

  if (matchedUrl) {
    const originalUrl = matchedUrl[0];
    const shortId = shortid.generate(); // Generate a short ID

    try {
      // Save the URL and short ID in the database
      const urlDoc = await UrlModel.create({ originalUrl, shortId });
      
      // Reply to the user with the custom short URL
      const customShortUrl = `https://127.0.0.1/${urlDoc.shortId}`;
      message.reply(`Your short URL is: ${customShortUrl}`);
    } catch (err) {
      console.error('Error saving URL to the database:', err);
      message.reply('An error occurred while processing your request.');
    }
  }
});

// Login the Discord bot client
client.login("MTIxODYwMDEzNTI3ODIwMjkxNg.GLpx7X.5DPufSzYiBvBEuMqRP8cwidF1w0I5BZzC7C_RA");
