'use strict'

class RegistroNotas{
    _id_uni;
    _curse;
    _credits;
    _section;
    _notas_pc;
    
    constructor(id_uni, curse, credits, section, notas_pc) {
        this._id_uni = id_uni;
        this._curse  = curse;
        this._credits = credits;
        this._section = section;
        this._notas_pc = notas_pc;
    }

    get id() {
        return this._id;
    }

    get curse() {
        return this._curse;
    }
    set curse(lastNames) {
        this._curse = curse;
    }

    get credits() {
        return this._credits;
    }
    set credits(credits) {
        this._credits = credits;
    }

    get section() {
        return this._section;
    }
    set section(section) {
        this._section = section;
    }

    get notas_pc() {
        return this._notas_pc;
    }
    set notas_pc(notas_pc) {
        this._notas_pc = notas_pc;
    }
}