const express= require('express');
const routes = express.Router();
const {
    addRegister,
    removeRegister,
    alteringRecords,
    ConsultDateBirthday,
    ConsultBirthdayMonth,
    ConsultBirthdayNamesLetter,
    ShowSortedByName,
    ShowSortedByMonth
} = require('../database/index');


routes.get('/', (req, res) => {
    return res.send('OK');
});

routes.post('/register/:nameUser/:day/:month', (req, res) => {
    const { name, month, day } = req.body;
    // dados dos usuários a ser registrado. 
    const data = addRegister({name, month, day});

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