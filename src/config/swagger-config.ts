import swagerJsdoc from "swagger-jsdoc";

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API Documentation',
            version: '1.0.0',
            description: 'Documentación de la API para prueba técnica de la compañía Enmedio Comunicación digital realizada por Juan Felipe Jiménez Salazar',
        },
        servers: [
            {
                url: 'http://localhost:3000',
            }
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
    },
    apis: ['./src/routes/**/*.ts']
}

export const openapiSpecification = swagerJsdoc(options);