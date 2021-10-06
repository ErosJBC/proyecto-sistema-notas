'use strict'

class BuscadorAlumnos {
    _id_uni;
    _surname;
    _second_surname;
    _names
    _faculty;
    _speciality;
    _cycle_relative;
    _approved_credits;
    _condition;
    _disciplinary_condition;
    _photo;

    constructor(id_uni, surname, second_surname, names, faculty, speciality, cycle_relative, approved_credits, condition, disciplinary_condition, photo) {
        this._id_uni = id_uni;
        this._surname = surname;
        this._second_surname = second_surname;
        this._names = names;
        this._faculty = faculty
        this._speciality = speciality;
        this._cycle_relative = cycle_relative;
        this._approved_credits = approved_credits;
        this._condition = condition;
        this._disciplinary_condition = disciplinary_condition;
        this._photo = photo;
    }

    get idUni() {
        return this._id_uni;
    }

    get surname() {
        return this._surname;
    }
    set surname(second_surname) {
        this._surname = surname;
    }

    get secondSurname() {
        return this._second_surname;
    }
    set secondSurname(second_surname) {
        this._second_surname = second_surname;
    }

    get names() {
        return this._names;
    }
    set names(names) {
        this._names = names;
    }

    get faculty() {
        return this._faculty;
    }
    set faculty(faculty) {
        this._faculty = faculty;
    }

    get speciality() {
        return this._speciality;
    }
    set speciality(speciality) {
        this._speciality = speciality;
    }

    get cycleRelative() {
        return this._cycle_relative;
    }
    set cycleRelative(cycle_relative) {
        this._cycle_relative = cycle_relative;
    }

    get approvedCredits() {
        return this._approved_credits;
    }
    set approvedCredits(approved_credits) {
        this._approved_credits = approved_credits;
    }

    get condition() {
        return this._condition;
    }
    set condition(condition) {
        this._condition = condition;
    }

    get disciplinaryCondition() {
        return this._disciplinary_condition;
    }
    set disciplinaryCondition(disciplinary_condition) {
        this._disciplinary_condition = disciplinary_condition;
    }

    get photo() {
        return this._photo;
    }
    set photo(photo) {
        this._photo = photo;
    }
}