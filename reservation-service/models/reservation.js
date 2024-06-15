const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
    rank: { type: Number, required: true, min: 0 },
    status: { type: String, enum: ['open', 'expired', 'confirmed'], required: true },
    seats: { type: Number, required: true, min: 1 },
    sceance: { type: mongoose.Schema.Types.ObjectId, ref: 'Sceance' }
}, { timestamps: true });

module.exports = mongoose.model('Reservation', reservationSchema);
