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
const {
    User,
    Birthday,
    BirthdayUpdate
} = require('../data/userData'); 


// Rotas GET
routes.get('/', (req, res) => {
    return res.send('OK');
});

// Rotas POST
routes.post('/register', (req, res) => {
    const { name, month, day } = req.body;
    // dados dos usuários a ser registrado. 
    const data = addRegister({name, month, day});

    return res.status(201).json(data);
});

// Demais Funções
routes.delete('/removeRegister/:nameUser', (req, res) => {
    const {nameUser} = req.params;

    try{
        // dados dos usuários a serem deletados. 
        const data = removeRegister(nameUser);
        return res.status(200).json({message: 'User removed: '}, data);
    }
    catch(error){
        if(error instanceof Error){
            return res.status(400).json({message: error.message});
        }
    }
    return res.sendStatus(400);
});

module.exports = routes;