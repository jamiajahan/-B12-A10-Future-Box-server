const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const contributionSchema = new Schema({
  issueId: { type: String, required: true },
  issueTitle: { type: String, required: true },
  category: { type: String, required: true },
  amount: { type: Number, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true }, // Contributor's email
  phone: { type: String, required: true },
  address: { type: String, required: true },
  date: { type: Date, required: true },
  additionalInfo: { type: String },
  contributorImage: { type: String } // For the details page table
}, { timestamps: true });

const Contribution = mongoose.model('Contribution', contributionSchema);
module.exports = Contribution;