import express from 'express';
import { configureRoutes } from './routes.js';
import { configureSwagger } from './swagger.js';
import { configureDependencies } from './dependencies.js';
import { configureMiddlewares } from './middlewares.js';
import { Dependency } from './libs/dependency.js';
import mongoose from 'mongoose';

configureDependencies();

const conf = Dependency.get('conf');

mongoose.connect(conf.mongodbUri)
    .then(() => console.log('Conexión a MongoDB exitosa'))
    .catch(err => console.error('Error al conectar a MongoDB', err));

const app = express();
const router = configureMiddlewares(app);
configureRoutes(router);
configureSwagger(router);

router.get('/', (req, res) => {
  res.send("Hola 'Mundo!'");
});

app.listen(conf.port, () =>
  console.log(`El servidor está aceptando conexiones en el puerto ${conf.port}`));