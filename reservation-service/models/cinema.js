const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const cinemaSchema = new mongoose.Schema({
    uid: { type: String, default: uuidv4 },
    name: { type: String, required: true, maxlength: 128 }
}, { timestamps: true });

module.exports = mongoose.model('Cinema', cinemaSchema);
