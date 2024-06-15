const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const roomSchema = new mongoose.Schema({
    uid: { type: String, default: uuidv4 },
    name: { type: String, required: true, maxlength: 128 },
    seats: { type: Number, required: true, min: 1 },
    cinema: { type: mongoose.Schema.Types.ObjectId, ref: 'Cinema' }
}, { timestamps: true });

module.exports = mongoose.model('Room', roomSchema);
