// models/Plant.js
const mongoose = require('mongoose');

const plantSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  species: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  careInstructions: {
    watering: String,
    sunlight: String,
    temperature: String,
    additionalNotes: String
  },
  images: [String],
  pricePerDay: {
    type: Number,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  careLevel: {
    type: String,
    enum: ['Easy', 'Medium', 'Expert'],
    required: true
  },
  availability: {
    type: Boolean,
    default: true
  },
  availableDates: [{
    startDate: Date,
    endDate: Date
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('Plant', plantSchema);
