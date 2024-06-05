const mongoose = require('mongoose');

const AnimalSchema = new mongoose.Schema({
  animalId: String,
  name: String,
  locationHistory: [
    {
      latitude: Number,
      longitude: Number,
      timestamp: { type: Date, default: Date.now }
    }
  ]
});

module.exports = mongoose.model('Animal', AnimalSchema);
