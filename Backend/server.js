import express from 'express';
import { configureRoutes } from './routes';
import { configureSwagger } from './swagger';
import { configureDependencies } from './dependencies';
import { configureMiddlewares } from './middlewares';
import { Dependency } from './libs/dependency';
import mongoose from 'mongoose';

configureDependencies();

const conf = Dependency.get('conf');

mongoose.connect(conf.db);

const app = express();
const router = configureMiddlewares(app);
configureRoutes(router);
configureSwagger(routes);

router.get('/', (req, res) => {
    res.send("Hola 'mundo!'");
});

app.listen(
    conf.port,
    /*eslint no-console: "off"*/
    () => console.log
)