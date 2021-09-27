/* eslint-disable linebreak-style */
const express = require('express');
const cors = require('cors');
const consign = require('consign');
const swagger = require('swagger-ui-express');
const routes = require('./controllers/routes');
const DOC = require('./doc/swagger.json');

const app = express();

consign()
  .include('controllers')
  .into('app');

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

// DOC da documentação do projeto utilizando o swagger
app.use('/doc', swagger.serve, swagger.setup(DOC));

export default app;
