const express = require('express');
const Movie = require('../models/movie');
const router = express.Router();

/**
 * @swagger
 * /movies:
 *   get:
 *     summary: Liste les films enregistrés
 *     tags: [Movies]
 *     responses:
 *       200:
 *         description: Liste des films trouvés
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Movie'
 *       204:
 *         description: Pas de résultat de recherche
 *       500:
 *         description: Erreur interne
 */
router.get('/', async (req, res) => {
    try {
        const movies = await Movie.find();
        if (movies.length === 0) {
            return res.status(204).send();
        }
        res.status(200).json(movies);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

/**
 * @swagger
 * /movies/{id}:
 *   get:
 *     summary: Récupère un film par son ID
 *     tags: [Movies]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: L'ID du film à récupérer
 *     responses:
 *       200:
 *         description: Retourne le film demandé
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Movie'
 *       404:
 *         description: Film non trouvé
 *       500:
 *         description: Erreur interne du serveur
 */

router.get('/:id', async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);
        if (!movie) {
            return res.status(404).send('Movie not found');
        }

        const baseUrl = `${req.protocol}://${req.get('host')}${req.baseUrl}`;
        const movieHAL = {
            _links: {
                self: { href: `${baseUrl}/${movie._id}` },
                allMovies: { href: `${baseUrl}` }
            },
            data: movie
        };

        res.json(movieHAL);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

/**
 * @swagger
 * /movies:
 *   post:
 *     summary: Crée un nouveau film
 *     tags: [Movies]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *               - parutionDate
 *             properties:
 *               name:
 *                 type: string
 *                 description: Le nom du film
 *                 example: 'Inception'
 *               description:
 *                 type: string
 *                 description: La description du film
 *                 example: 'Un voleur qui s’infiltre dans les rêves...'
 *               parutionDate:
 *                 type: string
 *                 format: date
 *                 description: La date de parution du film
 *                 example: '2010-07-16'
 *               note:
 *                 type: integer
 *                 description: La note du film, de 0 à 5
 *                 example: 5
 *               categories:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: IDs des catégories associées au film
 *                 example: ['5f8d0d55b54764421b7156fc']
 *     responses:
 *       201:
 *         description: Le film a été créé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Movie'
 *       400:
 *         description: Requête invalide
 */

router.post('/', async (req, res) => {
    const { name, description, parutionDate, note, categories } = req.body;
    const movie = new Movie({
        name,
        description,
        parutionDate,
        note,
        categories
    });

    try {
        const newMovie = await movie.save();

        const movieHAL = {
            _links: {
                self: { href: `/movies/${newMovie._id}` },
                allMovies: { href: '/movies' }
            },
            data: newMovie
        };

        res.status(201).json(movieHAL);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

/**
 * @swagger
 * /movies/{id}:
 *   put:
 *     summary: Met à jour un film spécifié par ID
 *     tags: [Movies]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID du film à mettre à jour
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Movie'
 *     responses:
 *       200:
 *         description: Le film a été mis à jour avec succès
 *       422:
 *         description: Validation des données impossible
 */

router.put('/:id', async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);
        if (!movie) return res.status(404).send('Movie not found');
        movie.name = req.body.name;
        movie.description = req.body.description;
        movie.parutionDate = req.body.parutionDate;
        movie.note = req.body.note;
        await movie.save();
        res.json(movie);
    } catch (err) {
        res.status(422).json({ message: err.message });
    }
});
/**
 * @swagger
 * /movies/{id}:
 *   delete:
 *     summary: Supprime un film spécifié par son ID
 *     tags: [Movies]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID du film à supprimer
 *     responses:
 *       200:
 *         description: Le film a été supprimé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 'Deleted Movie'
 *       404:
 *         description: Film non trouvé
 *       500:
 *         description: Erreur serveur
 */

router.delete('/:id', async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);
        if (!movie) return res.status(404).send('Movie not found');
        await Movie.deleteOne({ _id: req.params.id });
        res.json({ message: 'Deleted Movie' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
