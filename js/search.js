'use strict'

var dataStudents = [];
let dataSt = [];
let students;

const buttonSave = document.getElementById('btnSearch');

const getStudents = async () => {
    const api = await fetch(`https://studentsapi-76cc7-default-rtdb.firebaseio.com/students.json`);
    const data = await api.json();

    data.forEach(student => {
        if (student != null) {
            const st = new BuscadorAlumnos(student.id_uni,
                student.surname,
                student.second_surname,
                student.names,
                student.faculty[1],
                student.speciality[1],
                student.cycle_relative,
                student.approved_credits,
                student.condition,
                student.disciplinary_condition,
                student.photo)
            dataStudents.push(st);
        }
    });

    viewDataStudents();
}

const viewDataStudents = () => {

    document.getElementById('dataStudents').innerHTML = '';

    const frmStudents = document.forms['frmRegisterStudents'];
    const id = frmStudents['inputId'].value;
    const surname = frmStudents['inputSurname'].value;
    const second_surname = frmStudents['inputSecondSurname'].value;
    const names = frmStudents['inputNames'].value;
    const speciality = frmStudents['inputSpeciality'].value;

    students = '';

    if (id == "" && surname == "" && second_surname == "" && names == "" && speciality == "") {
        dataStudents.forEach((student, i) => {
            if (i < 10) {
                students += `
                <tr>
                    <td class="text-center">${student.idUni}</td>
                    <td class="text-center">${student.surname + " " + student.secondSurname}</td>
                    <td class="text-center">${student.names}</td>
                    <td class="text-center">${student.speciality}</td>
                    <td class="text-center">${student.cycleRelative}</td>
                    <td><a data-bs-toggle="modal" href="#viewDetailStudent" role="button" onclick="viewDetailStudent('${student.idUni}')" class="btn btn-dark fw-bold btn-small text-center">Ver más</a></td>
                <tr>`
            }
        });

        document.getElementById('dataStudents').insertAdjacentHTML("afterbegin", students);
    }
}

const viewDataStudent = () => {

    document.getElementById('dataStudents').innerHTML = '';
    students = '';
    dataSt.forEach((st) => {
        students += `
        <tr>
            <td class="text-center">${st.idUni}</td>
            <td class="text-center">${st.surname + " " + st.secondSurname}</td>
            <td class="text-center">${st.names}</td>
            <td class="text-center">${st.speciality}</td>
            <td class="text-center">${st.cycleRelative}</td>
            <td><a data-bs-toggle="modal" href="#viewDetailStudent" role="button" onclick="viewDetailStudent('${st.idUni}')" class="btn btn-dark fw-bold btn-small text-center">Ver más</a></td>
        <tr>`
    });

    document.getElementById('dataStudents').insertAdjacentHTML("afterbegin", students);
}

const searchStudents = (event) => {
    event.preventDefault();
    dataSt = []
    const frmStudents = document.forms['frmRegisterStudents'];
    const id = frmStudents['inputId'].value.toUpperCase();
    const surname = frmStudents['inputSurname'].value.toUpperCase();
    const second_surname = frmStudents['inputSecondSurname'].value.toUpperCase();
    const names = frmStudents['inputNames'].value.toUpperCase();
    const speciality = frmStudents['inputSpeciality'].value.toUpperCase();

    if (id != '' || surname != '' || second_surname != '' || names != '' || speciality != '') {
        const std = dataStudents.filter(ds => {
            return (
                ds.idUni == id ||
                ds.surname == surname ||
                ds.secondSurname == second_surname ||
                ds.names == names ||
                ds.speciality == speciality
            );
        })
        console.log(std)
        if (std.length != 0) {
            dataSt = std;
            console.log(dataSt);
            viewDataStudent();
        } else {
            document.getElementById('dataStudents').innerHTML = '';
            const result = `<tr class="text-center fw-bold">
            <td colspan="6">No se encontraron resultados para la consulta realizada</td>
            </tr>`;
            document.getElementById('dataStudents').insertAdjacentHTML("afterbegin", result);
        }
        document.getElementById('frmRegisterStudents').reset();
    } else {
        getStudents();
    }
}

const viewDetailStudent = (id_uni) => {

    const stdInfo = dataStudents.find(ds => { return ds.idUni == id_uni });

    document.querySelector('#detailStudent').innerHTML = '';
    document.querySelector('#imageStudent').innerHTML = '';

    const studentImage = `<img src="${stdInfo.photo}" class="d-flex align-items-center my-md-4 w-100" alt="${stdInfo.idUni}">`;
    const studentInformation = `
        <tr>
            <td class="fw-bold py-md-0 f-size">Código UNI: </td>
            <td class="py-md-0 f-size">${stdInfo.idUni}</td>
        </tr>
        <tr>
            <td class="fw-bold py-md-0 f-size">Apellidos: </td>
            <td class="py-md-0 f-size">${stdInfo.surname + " " + stdInfo.secondSurname}</td>
        </tr>
        <tr>
            <td class="fw-bold py-md-0 f-size">Nombres: </td>
            <td class="py-md-0 f-size">${stdInfo.names}</td>
        </tr>
        <tr>
            <td class="fw-bold py-md-0 f-size">Facultad: </td>
            <td class="py-md-0 f-size">${stdInfo.faculty}</td>
        </tr>
        <tr>
            <td class="fw-bold py-md-0 f-size">Especialidad: </td>
            <td class="py-md-0 f-size">${stdInfo.speciality}</td>
        </tr>
        <tr>
            <td class="fw-bold py-md-0 f-size">Ciclo Relativo: </td>
            <td class="py-md-0 f-size">${stdInfo.cycleRelative}</td>
        </tr>
        <tr>
            <td class="fw-bold py-md-0 f-size">Créditos Aprobados: </td>
            <td class="py-md-0 f-size">${stdInfo.approvedCredits}</td>
        </tr>
        <tr>
            <td class="fw-bold py-md-0 f-size">Situación: </td>
            <td class="py-md-0 f-size">${stdInfo.condition}</td>
        </tr>        
        <tr>
            <td class="fw-bold py-md-0 f-size">Medida Disciplinaria: </td>
            <td class="py-md-0 f-size">${stdInfo.disciplinaryCondition}</td>
        </tr>
    `

    document.querySelector('#imageStudent').insertAdjacentHTML("afterbegin", studentImage);
    document.querySelector('#detailStudent').insertAdjacentHTML("afterbegin", studentInformation);
    
    console.log('Hola!')
}

buttonSave.addEventListener('click', searchStudents);

window.addEventListener('load', getStudents);