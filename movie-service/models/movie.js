const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    name: { type: String, required: true, maxlength: 128 },
    description: { type: String, required: true, maxlength: 4096 },
    rate: { type: Number, required: true, min: 1, max: 5 },
    duration: { type: Number, required: true, min: 1, max: 240 },
    hasReservationsAvailable: { type: Boolean, default: true },
    categories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }],
}, { timestamps: true });

module.exports = mongoose.model('Movie', movieSchema);