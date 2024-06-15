const express = require('express');
const router = express.Router();
const Cinema = require('../models/cinema');
const verifyToken = require('../middlewares/isAuthenticate');

router.post('/',verifyToken, async (req, res) => {
    try {
        const cinema = new Cinema(req.body);
        await cinema.save();
        res.status(201).send(cinema);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.get('/', async (req, res) => {
    try {
        const cinemas = await Cinema.find();
        res.send(cinemas);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.get('/:uid', async (req, res) => {
    try {
        const cinema = await Cinema.findOne({ uid: req.params.uid });
        if (!cinema) return res.status(404).send();
        res.send(cinema);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.put('/:uid', async (req, res) => {
    try {
        const cinema = await Cinema.findOneAndUpdate({ uid: req.params.uid }, req.body, { new: true, runValidators: true });
        if (!cinema) return res.status(404).send();
        res.send(cinema);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.delete('/:uid', async (req, res) => {
    try {
        const cinema = await Cinema.findOneAndDelete({ uid: req.params.uid });
        if (!cinema) return res.status(404).send();
        res.send(cinema);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;
