const randomId = require('random-id');
const {
    User,
    Birthday,
    BirthdayUpdate
} = require('../data/userData'); 


function getDataBase(){
    const file = filehandle.appendFile(`${__dirname}/db.json`, { encoding: 'utf-8' });
    const dbObj = JSON.parse(file);

    return dbObj;
}
function saveData(user = User){
    const file = JSON.stringify(user, null, 2);
    
    filehandle.appendFile(`${__dirname}/db.json`, file, { encoding: 'utf-8' });
}
function getID(){
    const len = 32;
    const pattern = '';

    return id = randomId(len, pattern);
}


// Cadastrar pessoa na agenda de aniversariantes (nome, dia e mês do aniversário).
function addRegister(day = Birthday.day, month = Birthday.month){
    const db = getDataBase();
    const newUser = {id: getID(), day, month}

    db.push(newUser);
    saveData(db);

    return {message: 'User registered with success!'}
}
// Excluir pessoa a partir do nome.
function removeRegister(nameUser){
    const db = getDataBase();
    const removeUser = db.find((user) => new RegExp(nameUser, 'i').test(user.nameUser));

    try{
        const index = db.indexOf(removeUser);
        db.splice(index, 1);
        saveData(db);
    }
    catch(e){
        return res.status(400).json({message: 'User not removed!'});
    }

    return { message: 'User removed with success!' }
}
// Alterar dia ou mês a partir do nome.
function alteringRecords(){}
// Consultar aniversariantes de uma data (dia e mês).
function ConsultDateBirthday(){}
// Consultar aniversariantes por mês.
function ConsultBirthdayMonth(){}
// Consultar aniversariantes pela letra inicial do nome.
function ConsultBirthdayNamesLetter(){}
// Mostrar toda a agenda ordenada pelo nome.
function ShowSortedByName(){}
// Mostrar toda a agenda ordenada por mês.
function ShowSortedByMonth(){}

module.exports = {
    addRegister,
    removeRegister,
    alteringRecords,
    ConsultDateBirthday,
    ConsultBirthdayMonth,
    ConsultBirthdayNamesLetter,
    ShowSortedByName,
    ShowSortedByMonth
}