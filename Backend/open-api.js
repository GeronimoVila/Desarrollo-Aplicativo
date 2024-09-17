import swaggerUi  from 'swagger-ui-express';
import swaggerJSDoc from "swagger-jsdoc";

export function configureOpenApi(router){
    const swaggerDoc = swaggerJSDoc({
        definition:{
            openapi: '3.0.0',
            info:{
                title: 'Proyecto Desarrollo de Aplicativos',
                version: '1.0.0',
                description:'Proyecto para completaar el curso',
            },
            servers: [{url : '/api' }]
        },

        apis: [
            './components/users/*',
        ]
    })

    router.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDoc));
}
