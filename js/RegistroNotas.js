'use strict'

class RegistroNotas{
    _id_uni;
    _lastname;
    _name
    _curse;
    _notas_pc;
    _nota_ep;
    _nota_ef;
    
    constructor(id_uni, lastname, name, curse, notas_pc, nota_ep, nota_ef) {
        this._id_uni = id_uni;
        this._lastname  = lastname;
        this._name = name;
        this._curse = curse;
        this._notas_pc = notas_pc;
        this._nota_ep = nota_ep;
        this._nota_ef = nota_ef;
    }

    get id() {
        return this._id_uni;
    }

    get lastName() {
        return this._lastname;
    }
    set lastName(lastname) {
        this._lastname = lastname;
    }

    get name() {
        return this._name;
    }
    set name(name) {
        this._name = name;
    }

    get curse() {
        return this._curse;
    }
    set curse(curse) {
        this._curse = curse;
    }

    get notasPC() {
        return this._notas_pc;
    }
    set notasPC(notas_pc) {
        this._notas_pc = notas_pc;
    }

    get notaEP() {
        return this._nota_ep;
    }
    set notaEP(nota_ep) {
        this._nota_ep = nota_ep;
    }

    get notaEF() {
        return this._nota_ef;
    }
    set notaEF(nota_ef) {
        this._nota_ef = nota_ef;
    }
}