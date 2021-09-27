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
function addRegister(nameUser = User.nameUser, day = User.day, month = User.month){
    const db = getDataBase();
    const newUser = {id: getID(), nameUser, day, month}

    db.push(newUser);
    saveData(db);

    return {message: 'User registered with success!'}
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

// ####################### SEM ROTAS ################################
// Consultar aniversariantes de uma data (dia e mês).
function ConsultDateBirthday(day = Birthday.day, month = Birthday.month){
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
function ShowSortedByName(nameUser = User.nameUser){
    const db = getDataBase();

    db.sort((a, b) => {
        const order = a.nameUser < b.nameUser ? -1 : 1;
        return order;
    });
}
// Mostrar toda a agenda ordenada por mês.
function ShowSortedByMonth(month = Birthday.month){
    const db = getDataBase();

    db.sort((a, b) => {
        const order = a.month < b.month ? -1 : 1;
        return order;
    });
}

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