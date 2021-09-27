/* eslint-disable linebreak-style */
/* eslint-disable no-unused-expressions */
/* eslint-disable space-before-blocks */
import fs from 'fs';
import { User, Birthday, BirthdayUpdate } from '../data/userData';

const randomId = require('random-id');

function getDataBase(){
  const file = fs.readFileSync(`${__dirname}/db.json`, { encoding: 'utf-8' });
  const dataObj: User[] = JSON.parse(file);

  return dataObj;
}
function saveData(dataObj: User[]){
  const file = JSON.stringify(dataObj, null, 2);

  fs.writeFileSync(`${__dirname}/db.json`, file, { encoding: 'utf-8' });
}
function getID(){
  const len = 32;
  const pattern = '';

  return randomId(len, pattern);
}

// Cadastrar pessoa na agenda de aniversariantes (nome, dia e mês do aniversário).
function addRegister(birthday: Birthday){
  const db = getDataBase();
  const newUser = { id: getID(), ...birthday };

  try {
    db.push(newUser);
    saveData(db);

    return { message: 'User registered with success!' };
  } catch (e){
    return { message: 'User not registered!' };
  }
}
// Excluir pessoa a partir do nome.
function removeRegister(nameUser: string){
  const db = getDataBase();
  const removeUser = db.find((user) => new RegExp(nameUser, 'i').test(user.nameUser));

  if (!removeUser){
    return { message: 'User not removed!' };
  }

  const index = db.indexOf(removeUser);
  db.splice(index, 1);
  saveData(db);

  return { message: 'User removed with success!' };
}
// Alterar dia ou mês a partir do nome***
function alteringRecords(nameUser: string, update: BirthdayUpdate){
  const db = getDataBase();
  const updateUser = db.find((user) => nameUser === user.nameUser);

  if (!updateUser) {
    return { message: 'User not changed!' };
  }
  updateUser.month = update.month;
  updateUser.day = update.day;
  saveData(db);

  return { message: 'User successfully changed it!' };
}

// Consultar aniversariantes de uma data (dia e mês).
function ConsultDateBirthday(month: number, day: number){
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
function ConsultBirthdayMonth(month: number) {
  const db = getDataBase();

  if (!(month > 0 && month <= 12)){
    throw new Error('Entry of invalid month');
  }
  const listUsersMonth = db.filter((user) => user.month === month);

  return listUsersMonth;
}
// Consultar aniversariantes pela letra inicial do nome.
// function ConsultBirthdayNamesLetter(letter){}
// Mostrar toda a agenda ordenada pelo nome.
function showUsersName(){
  const db = getDataBase();

  return db.sort((a, b) => {
    const i = a.nameUser < b.nameUser ? -1 : 1;
    return i;
  });
}
// Mostrar toda a agenda ordenada por mês.
function showUsersMonth(){
  const db = getDataBase();

  return db.sort((a, b) => {
    const i = a.month - b.month;
    return i;
  });
}

export = {
  addRegister,
  removeRegister,
  alteringRecords,
  ConsultDateBirthday,
  ConsultBirthdayMonth,
  showUsersName,
  showUsersMonth,
}
