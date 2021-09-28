/* eslint-disable linebreak-style */
/* eslint-disable object-curly-spacing */
/* eslint-disable comma-dangle */
/* eslint-disable import/order */
import express from 'express';
import cors from 'cors';
import swagger from 'swagger-ui-express';
import routes from './controllers/routes';
import DOC from './doc/swagger.json';

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

// DOC da documentação do projeto utilizando o swagger
app.use('/swagger', swagger.serve, swagger.setup(DOC));

export default app;
