const express = require('express');
const router = express.Router();
const Room = require('../models/room');
const Cinema = require('../models/cinema');


router.post('/:cinemaUid/rooms', async (req, res) => {
    try {
        const cinema = await Cinema.findOne({ uid: req.params.cinemaUid });
        if (!cinema) return res.status(404).send();
        const room = new Room({ ...req.body, cinema: cinema._id });
        await room.save();
        res.status(201).send(room);
    } catch (error) {
        res.status(400).send(error);
    }
});


router.get('/:cinemaUid/rooms', async (req, res) => {
    try {
        const cinema = await Cinema.findOne({ uid: req.params.cinemaUid });
        if (!cinema) return res.status(404).send();
        const rooms = await Room.find({ cinema: cinema._id });
        res.send(rooms);
    } catch (error) {
        res.status(500).send(error);
    }
});


router.get('/:cinemaUid/rooms/:uid', async (req, res) => {
    try {
        const room = await Room.findOne({ uid: req.params.uid });
        if (!room) return res.status(404).send();
        res.send(room);
    } catch (error) {
        res.status(500).send(error);
    }
});


router.put('/:cinemaUid/rooms/:uid', async (req, res) => {
    try {
        const room = await Room.findOneAndUpdate({ uid: req.params.uid }, req.body, { new: true, runValidators: true });
        if (!room) return res.status(404).send();
        res.send(room);
    } catch (error) {
        res.status(400).send(error);
    }
});


router.delete('/:cinemaUid/rooms/:uid', async (req, res) => {
    try {
        const room = await Room.findOneAndDelete({ uid: req.params.uid });
        if (!room) return res.status(404).send();
        res.send(room);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;
