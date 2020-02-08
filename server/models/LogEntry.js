const mongoose = require('mongoose');

const { Schema } = mongoose;

const requiredNumberType = { type: Number, required: true };
const defaultRequiredDate = { type: Date, default: Date.now, required: true };

const logEntrySchema = new Schema({
  title: { type: String, required: true },
  description: String,
  comments: String,
  rating: {
    type: Number,
    min: 0,
    max: 10,
    default: 0,
  },
  image: String,
  date: { type: Date, default: Date.now },
  latitude: { ...requiredNumberType, min: -90, max: 90 },
  logitude: { ...requiredNumberType, min: -180, max: 180 },
  createdAt: defaultRequiredDate,
  updatedAt: defaultRequiredDate,
});

module.exports = mongoose.model('LogEntry', logEntrySchema);
