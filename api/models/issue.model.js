const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const issueSchema = new Schema({
  title: { type: String, required: true },
  category: { type: String, required: true },
  location: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  amount: { type: Number, required: true },
  email: { type: String, required: true }, // Reporter's email
  date: { type: Date, required: true },
  status: { type: String, required: true, default: 'ongoing' } // 'ongoing' or 'ended'
}, { timestamps: true }); // Automatically adds createdAt and updatedAt

const Issue = mongoose.model('Issue', issueSchema);
module.exports = Issue;