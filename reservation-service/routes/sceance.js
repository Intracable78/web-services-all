const express = require('express');
const router = express.Router();
const Sceance = require('../models/sceance');
const Room = require('../models/room');

router.post('/:cinemaUid/rooms/:roomUid/sceances', async (req, res) => {
    try {
        const room = await Room.findOne({ uid: req.params.roomUid });
        if (!room) return res.status(404).send();
        const sceance = new Sceance({ ...req.body, room: room._id });
        await sceance.save();
        res.status(201).send(sceance);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.get('/:cinemaUid/rooms/:roomUid/sceances', async (req, res) => {
    try {
        const room = await Room.findOne({ uid: req.params.roomUid });
        if (!room) return res.status(404).send();
        const sceances = await Sceance.find({ room: room._id });
        res.send(sceances);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.get('/:cinemaUid/rooms/:roomUid/sceances/:uid', async (req, res) => {
    try {
        const sceance = await Sceance.findOne({ uid: req.params.uid });
        if (!sceance) return res.status(404).send();
        res.send(sceance);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.put('/:cinemaUid/rooms/:roomUid/sceances/:uid', async (req, res) => {
    try {
        const sceance = await Sceance.findOneAndUpdate({ uid: req.params.uid }, req.body, { new: true, runValidators: true });
        if (!sceance) return res.status(404).send();
        res.send(sceance);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.delete('/:cinemaUid/rooms/:roomUid/sceances/:uid', async (req, res) => {
    try {
        const sceance = await Sceance.findOneAndDelete({ uid: req.params.uid });
        if (!sceance) return res.status(404).send();
        res.send(sceance);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;
