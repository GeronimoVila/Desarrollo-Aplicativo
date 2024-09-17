import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';

export function configureSwagger(router) {
  const swaggerDoc = swaggerJSDoc({
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Proyecto Desarrollo de Aplicativos',
        version: '1.0.0',
        description: 'Projecto para completar el curso',
      },
      servers: [{ url: '/api' }]
    },
    apis: [
      './components/**/*.yaml',
    ],
  });

  router.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDoc));
}