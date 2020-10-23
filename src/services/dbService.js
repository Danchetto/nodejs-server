import dataBase from '../config';

export default class DataBaseService {
  constructor() {
    this._query = '';
    this._dataBase = dataBase.controller;
    this._pgp = dataBase.pgp;
  }

  checkUser(nickname) {
    return `SELECT * FROM users WHERE LOWER(users.nickname) = LOWER('${nickname}');`;
  }

  get pgp() {
    return this._pgp;
  }

  get dataBase() {
    return this._dataBase;
  }

  get query() {
    return this._query;
  }

  set query(string) {
    this._query = string;
  }
}
