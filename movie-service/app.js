const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const movieRoutes = require('./routes/movies');
const categoryRoutes = require('./routes/categories');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
require('./database');

app.use(bodyParser.json());

app.use('/movies', movieRoutes);
app.use('/categories', categoryRoutes);

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API de gestion de films',
            version: '1.0.0',
            description: 'Une API simple pour gérer une collection de films',
        },
        servers: [
            {
                url: 'http://localhost:3000',
            },
        ],
        components: {
            schemas: {
                Movie: {
                    type: 'object',
                    required: ['uid', 'name', 'description', 'rate', 'duration'],
                    properties: {
                        uid: {
                            type: 'string',
                            format: 'uuid',
                            example: '123e4567-e89b-12d3-a456-426614174000'
                        },
                        name: {
                            type: 'string',
                            example: 'Inception'
                        },
                        description: {
                            type: 'string',
                            example: 'Un voleur qui s’infiltre dans les rêves...'
                        },
                        rate: {
                            type: 'integer',
                            example: 5
                        },
                        duration: {
                            type: 'integer',
                            example: 148
                        },
                        hasReservationsAvailable: {
                            type: 'boolean',
                            example: true
                        },
                        createdAt: {
                            type: 'string',
                            format: 'date-time',
                            example: '2021-05-19T15:12:00Z'
                        },
                        updatedAt: {
                            type: 'string',
                            format: 'date-time',
                            example: '2021-05-19T15:12:00Z'
                        }
                    }
                }
            }
        }
    },
    apis: ['./routes/*.js'],
};

const specs = swaggerJsdoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.listen(3000, () => {
    console.log('Server is On at http://localhost/3000')
})