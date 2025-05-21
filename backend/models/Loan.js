const mongoose = require('mongoose');

const loanSchema = new mongoose.Schema({
  book: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  dateBorrowed: { type: Date, default: Date.now },
  dateReturned: { type: Date },
}, {
  timestamps: true
});

module.exports = mongoose.model('Loan', loanSchema);
