'use strict'

class Usuario{
    _id_user;
    _username;
    _password;
    _active;
    _create_date;
    _update_date;
    
    constructor(id_user, username, password, active, create_date, update_date) {
        this._id_user = id_user;
        this._username = username;
        this._password = password;
        this._active = active;
        this._create_date = create_date;
        this._update_date = update_date;
    }

    get idUser() {
        return this._id_user;
    }

    get username() {
        return this._username;
    }
    set username(username) {
        this._username = username;
    }

    get password() {
        return this._password;
    }
    set password(password) {
        this._password = password;
    }

    get active() {
        return this._active;
    }
    set active(active) {
        this._active = active;
    }

    get createDate() {
        return this._create_date;
    }
    set createDate(create_date) {
        this._create_date = create_date;
    }

    get updateDate() {
        return this._update_date;
    }
    set password(update_date) {
        this._update_date = update_date;
    }
}