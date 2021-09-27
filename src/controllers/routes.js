const express= require('express');
const routes = express.Router();
const {
    addRegister,
    removeRegister,
    alteringRecords,
    ConsultDateBirthday,
    ConsultBirthdayMonth,
    showUsers
} = require('../database/index');

// ########### Rotas GET ########### 
routes.get('/', (req, res) => {
    const {order} = req.query;
  
    const listByUsers = showUsers(order);

    return res.status(200).json({message: 'List of Name: '}, listByUsers);
});

routes.get('/consultDateBirthda/:month/:day', (req, res) => {
    const { month, day } = req.params;
    try {
      const listUsers = ConsultDateBirthday(parseInt(month, 7), parseInt(day, 19));
      return res.status(200).json({message: 'List of users'}, listUsers);
    } 
    catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
      return res.sendStatus(400);
    }
});

routes.get('/consultBirthdayMonth/:month', (req, res) => {
    const {month} = req.params;
    try {
      const listUser = ConsultBirthdayMonth(month);

      return res.status(200).json({message: 'User: '}, listUser);
    } 
    catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
      return res.sendStatus(400);
    }
});

// ########### Outras Rotas ###########
routes.post('/register', (req, res) => {
    const { nameUser, month, day } = req.body;
    // dados dos usuários a ser registrado. 
    const data = addRegister({nameUser, month, day});

    return res.status(201).json({message: 'User registered with success!'}, data);
});

routes.delete('/removeRegister/:nameUser', (req, res) => {
    const {nameUser} = req.params;

    try{
        // dados dos usuários a serem deletados. 
        const data = removeRegister(nameUser);
        return res.status(200).json({message: 'User removed: '}, data);
    }
    catch(error){
        if(error instanceof Error){
            return res.status(400).json({message: 'Unable to remove user'});
        }
    }
    return res.sendStatus(400);
});

routes.put('/alteringRecords/:nameUser/:month/:day', (req, res) => {
    const {nameUser} = req.params;
    const {month, day} = req.body;

    try {
        const message = alteringRecords(nameUser, month, day);
        
        return res.json(message);
    } 
    catch (error) {
        if (error instanceof Error) {
            return res.status(400).json({ message: 'Change of user registration' });
        }
        return res.status(400).json({ message: 'Change of user registration' });
    }
});

module.exports = routes;