const fs = require('fs');
const randomId = require('random-id');
const {
    User,
    Birthday,
    BirthdayUpdate
} = require('../data/userData'); 

function getDataBase(){
    const file = fs.readFileSync(`${__dirname}/db.json`, {encoding:'utf8'});
    const dbObj = JSON.parse(User[file]);

    return dbObj;
}
function saveData(user = User){
    const file = JSON.stringify(user, null, 2);
    
    fs.readFileSync(`${__dirname}/db.json`, file, {encoding:'utf8'});
}
function getID(){
    const len = 32;
    const pattern = '';

    return id = randomId(len, pattern);
}


// Cadastrar pessoa na agenda de aniversariantes (nome, dia e mês do aniversário).
function addRegister(user = User){
    const db = getDataBase();
    const newUser = {id: getID(), user}

    try{
        db.push(newUser);
        saveData(db);
        return {message: 'User registered with success!'}

    }catch(e){
        return res.status(400).json({message: 'User not registered!'});
    }

}
// Excluir pessoa a partir do nome.
function removeRegister(nameUser = User.nameUser){
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
function alteringRecords(nameUser = User.nameUser, month = BirthdayUpdate.month, day = BirthdayUpdate.day ){
    const db = getDataBase();
    const updateUser = db.find((user) => nameUser === user.nameUser);
    
    try{
        updateUser.month = month;
        updateUser.day = day;
        saveData(db);
        
        return { message: 'User successfully changed it!' }
    }catch(err){
        throw new Error('User not changed!');
    }
}

// Consultar aniversariantes de uma data (dia e mês).
function ConsultDateBirthday(month = Birthday.month, day = Birthday.day){
    const db = getDataBase();
    
    if (!(month > 0 && month <= 12)){
        throw new Error('Entry of invalid month');
    } 
    if (!(day > 0 && day <= 31)){
        throw new Error('Entry of invalid day');
    } 
    const listUsers = db.filter((user) => user.day === day && user.month === month);
    
    return listUsers;
}
// ####################### SEM ROTAS ################################
// Consultar aniversariantes por mês.
function ConsultBirthdayMonth(month = Birthday.month){
    const db = getDataBase();

    if (!(month > 0 && month <= 12)){
        throw new Error('Entry of invalid month');
    } 
    const listUsersMonth = db.filter((user) => user.month === month);

    return listUsersMonth;
}
// Consultar aniversariantes pela letra inicial do nome.
function ConsultBirthdayNamesLetter(letter){}
// Mostrar toda a agenda ordenada pelo nome.
// Mostrar toda a agenda ordenada por mês.
function showUsers(order = User){
    const db = getDataBase();

    const orderBy = order === 'month'
      ? db.sort((a, b) => {
        const condition = a.month - b.month;

        return condition;
      })
      : db.sort((a, b) => {
        const condition = a.nameUser < b.nameUser ? -1 : 1;

        return condition;
      });
  
    return orderBy;
}


module.exports = {
    addRegister,
    removeRegister,
    alteringRecords,
    ConsultDateBirthday,
    ConsultBirthdayMonth,
    ConsultBirthdayNamesLetter,
    showUsers
}