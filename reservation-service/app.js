const express = require('express');
const mongoose = require('mongoose');
const cinemaRoutes = require('./routes/cinema');
const roomRoutes = require('./routes/room');
const sceanceRoutes = require('./routes/sceance');
const reservationRoutes = require('./routes/reservation');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
require('./database');

const app = express();

app.use(express.json());
app.use('/api/cinema', cinemaRoutes);
app.use('/api/cinema', roomRoutes);
app.use('/api/cinema', sceanceRoutes);
app.use('/api', reservationRoutes);

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Reservation Service API',
            version: '1.0.0',
            description: 'API documentation for the Reservation Service',
        },
        servers: [
            {
                url: 'http://localhost:3001/api',
            },
        ],
    },
    apis: ['./routes/*.js'],
};

const specs = swaggerJsdoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

module.exports = app;

