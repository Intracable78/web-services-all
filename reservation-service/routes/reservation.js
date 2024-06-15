const express = require('express');
const router = express.Router();
const Reservation = require('../models/reservation');
const Sceance = require('../models/sceance');
const axios = require('axios');
const mongoose = require('mongoose');

/**
 * @swagger
 * components:
 *   schemas:
 *     Reservation:
 *       type: object
 *       required:
 *         - movieUid
 *         - sceance
 *         - seats
 *       properties:
 *         movieUid:
 *           type: string
 *         sceance:
 *           type: string
 *         seats:
 *           type: integer
 *         status:
 *           type: string
 *           enum:
 *             - open
 *             - confirmed
 *             - canceled
 *           default: open    
 */

/**
 * @swagger
 * /movie/{id}/reservations:
 *   post:
 *     summary: Créer une nouvelle réservation
 *     tags: [Reservations]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: L'_id du film
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Reservation'
 *     responses:
 *       201:
 *         description: Réservation créée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Reservation'
 *       400:
 *         description: Mauvaise requête
 *       404:
 *         description: Non trouvé
 */
router.post('/movie/:id/reservations', async (req, res) => {
    try {
        const movieId = req.params.id;
        console.log(`Received movie_id: ${movieId}`);
        
        const movieResponse = await axios.get(`http://movie-service:3000/movies/${movieId}`);
        if (movieResponse.status !== 200) {
            return res.status(404).send('Film non trouvé');
        }

        const movie = movieResponse.data.data;
console.log(movie)
        if (!movie.hasReservationsAvailable) {
            return res.status(400).send('Les réservations ne sont pas disponibles pour ce film.');
        }

        const reservation = new Reservation({
            rank: 0,
            status: 'open',
            seats: 1,
            sceance: new mongoose.Types.ObjectId()
        });

        await reservation.save();
        res.status(201).json(reservation);
    } catch (error) {
        if (error.response && error.response.status === 404) {
            return res.status(404).send('Film non trouvé');
        }
        res.status(400).send(error.message);
    }
});


/**
 * @swagger
 * /reservations/{id}/confirm:
 *   post:
 *     summary: Confirmer une réservation
 *     tags: [Reservations]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: L'_id de la réservation
 *     responses:
 *       200:
 *         description: Réservation confirmée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Reservation'
 *       400:
 *         description: Mauvaise requête
 *       404:
 *         description: Non trouvé
 *       500:
 *         description: Erreur interne du serveur
 */
router.post('/reservations/:id/confirm', async (req, res) => {
    try {
        const reservation = await Reservation.findById(req.params.id);
        if (!reservation) {
            return res.status(400).send({ message: 'Invalid reservation status or not found' });
        }
        
        reservation.status = 'confirmed';
        await reservation.save();

        res.status(200).send(reservation);
    } catch (error) {
        res.status(500).send({ message: 'Internal server error', error: error.message });
    }
});

/**
 * @swagger
 * /movie/{movieUid}/reservations:
 *   get:
 *     summary: Lister les réservations par film
 *     tags: [Reservations]
 *     parameters:
 *       - in: path
 *         name: movieUid
 *         schema:
 *           type: string
 *         required: true
 *         description: L'UID du film
 *     responses:
 *       200:
 *         description: Liste des réservations
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Reservation'
 *       404:
 *         description: Non trouvé
 *       500:
 *         description: Erreur interne du serveur
 */
router.get('/movie/:movieUid/reservations', async (req, res) => {
    try {
        const sceances = await Sceance.find({ movie: req.params.movieUid });
        const reservations = await Reservation.find({ sceance: { $in: sceances.map(s => s._id) } });
        res.send(reservations);
    } catch (error) {
        res.status(500).send(error);
    }
});

/**
 * @swagger
 * /reservations/{uid}:
 *   get:
 *     summary: Récupérer une réservation par UID
 *     tags: [Reservations]
 *     parameters:
 *       - in: path
 *         name: uid
 *         schema:
 *           type: string
 *         required: true
 *         description: L'UID de la réservation
 *     responses:
 *       200:
 *         description: Réservation récupérée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Reservation'
 *       404:
 *         description: Non trouvé
 *       500:
 *         description: Erreur interne du serveur
 */
router.get('/reservations/:id', async (req, res) => {
    try {
        const reservation = await Reservation.findById(req.params.id);
        if (!reservation) return res.status(404).send();
        res.send(reservation);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;
