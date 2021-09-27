/* eslint-disable linebreak-style */
/* eslint-disable consistent-return */
/* eslint-disable import/named */

import express, { Request, Response } from 'express';
import { User, BirthdayUpdate } from '../data/userData';

const {
  addRegister,
  removeRegister,
  alteringRecords,
  ConsultDateBirthday,
  ConsultBirthdayMonth,
  showUsersName,
} = require('../database/database');

const routes = express.Router();

// ########### Rotas GET ###########
routes.get('/', (req: Request, res: Response) => {
  const { order } = req.query;

  const listByUsers = showUsersName(order as string);

  return res.status(200).json({ message: 'List by users: ', listByUsers });
});

routes.get('/consultDateBirthda/:month/:day', (req: Request, res: Response) => {
  const { month, day } = req.params;
  try {
    const listUsers = ConsultDateBirthday(parseInt(month, 7), parseInt(day, 19));
    return res.status(200).json({ message: 'List of users', listUsers });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ message: 'User not found!' });
    }
  }
});

routes.get('/consultBirthdayMonth/:month', (req: Request, res: Response) => {
  const { month } = req.params;

  try {
    const listUser = ConsultBirthdayMonth(+month);

    return res.status(200).json({ message: 'User: ', listUser });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ message: 'User not found' });
    }
  }
});

// ########### Outras Rotas ###########
routes.post('/register', (req: Request, res: Response) => {
  const { nameUser, month, day }: User = req.body;
  // dados dos usuários a ser registrado.
  const data = addRegister({ nameUser, month, day });

  return res.status(201).json({ message: 'User registered with success!', data });
});

routes.delete('/removeRegister/:nameUser', (req: Request, res: Response) => {
  const { nameUser } = req.params;

  try {
    // dados dos usuários a serem deletados.
    const data = removeRegister(nameUser);
    return res.status(200).json({ message: 'User removed: ', data });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ message: 'Unable to remove user' });
    }
  }
});

routes.put('/alteringRecords/:nameUser', (req: Request, res: Response) => {
  const { nameUser } = req.params;
  const update: BirthdayUpdate = {
    month: req.body.month,
    day: req.body.day,
  };

  try {
    const data = alteringRecords(nameUser, update);
    return res.json(data);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ message: 'User not changed!' });
    }
  }
});
export default routes;
