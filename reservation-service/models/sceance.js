const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const sceanceSchema = new mongoose.Schema({
    uid: { type: String, default: uuidv4 },
    movie: { type: String, required: true },
    date: { type: Date, required: true },
    room: { type: mongoose.Schema.Types.ObjectId, ref: 'Room' }
}, { timestamps: true });

module.exports = mongoose.model('Sceance', sceanceSchema);
