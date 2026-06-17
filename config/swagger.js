import swaggerJsDoc from 'swagger-jsdoc';

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'API Sistema de Academia',
      version: '1.0.0',
      description: 'Documentação da API de controle de alunos, treinos e planos.',
      contact: { name: 'Teu Nome' },
      servers: [{ url: 'http://localhost:3000' }],
    },
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
  // Caminho para os ficheiros que contêm as anotações da documentação
  apis: ['./src/routes/*.js', './src/server.js'],
};

export const swaggerDocs = swaggerJsDoc(swaggerOptions);