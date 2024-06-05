const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const locationRoutes = require('./routes/locationRoutes');
const { accountSid, authToken, twilioPhoneNumber } = require('./config'); // Load Twilio credentials from config file
const client = require('twilio')(accountSid, authToken);

const app = express();
const port = process.env.PORT || 5000;

mongoose.connect('mongodb://localhost:27017/wildtrack', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
app.post('/send-alert', (req, res) => {
  const { recipient, message } = req.body;

  client.messages
    .create({
      body: message,
      from: twilioPhoneNumber,
      to: recipient
    })
    .then(() => {
      res.json({ message: 'Alert sent successfully' });
    })
    .catch(err => {
      console.error('Error sending alert:', err);
      res.status(500).json({ error: 'Error sending alert' });
    });
});


app.use(bodyParser.json());
app.use('/api/locations', locationRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
