'use strict'

var dataStudentsNotes = [];

// const getStudents = async () => {
//     const api = await fetch(`https://studentsapi-76cc7-default-rtdb.firebaseio.com/notes.json`);
//     const data = await api.json();

//     data.forEach(student => {
//         if (student != null) {
//             const st = new BuscadorAlumnos(student.id_uni,
//                 student.surname,
//                 student.second_surname,
//                 student.names,
//                 student.faculty[1],
//                 student.speciality[1],
//                 student.cycle_relative,
//                 student.approved_credits,
//                 student.condition,
//                 student.disciplinary_condition)
//             dataStudents.push(st);
//         }
//     });
// }

const buttonSaveNote = document.getElementById('btnSaveNote');

const sumar = (prevValue, nextValue) => prevValue + nextValue;

const viewDataNotes = () => {
    let studentsNotes = '';
    dataStudentsNotes.forEach((studentNote, i) => {
        let avgNote = (studentNote.notasPC.reduce(sumar) - Math.min(...studentNote.notasPC))/(studentNote.notasPC.length - 1);
        let avgCurse = ((avgNote + studentNote.EP + studentNote.EF)/3).toFixed(1);
        let condition = (avgNote > 11 ? 'APROBADO' : 'DESAPROBADO');
        let text_color_condition = (condition == 'APROBADO' ? 'text-success fw-bold' : 'text-danger fw-bold')
        studentsNotes += `
        <tr>
            <td>${studentNote.id}</td>
            <td>${studentNote.lastName}</td>
            <td>${studentNote.name}</td>
            <td>${studentNote.curse}</td>
            <td class="text-center">${studentNote.notasPC[0]}</td>
            <td class="text-center">${studentNote.notasPC[1]}</td>
            <td class="text-center">${studentNote.notasPC[2]}</td>
            <td class="text-center">${studentNote.notasPC[3]}</td>
            <td class="text-center">${studentNote.EP}</td>
            <td class="text-center">${studentNote.EF}</td>
            <td class="text-center">${avgCurse}</td>
            <td class="${text_color_condition}">${condition}</td>
        <tr>`
    });

    document.getElementById('dataStudentsNotes').innerHTML = studentsNotes;
}

const registerStudentsNotes = (event) => {
    event.preventDefault();
    const frmStudentsNote = document.forms['frmRegisterStudentsNotes'];
    const id = frmStudentsNote['inputId'].value;
    const lastName = frmStudentsNote['inputLastName'].value;
    const name = frmStudentsNote['inputName'].value;
    const curse = frmStudentsNote['inputCurse'].value;
    const PC1 = frmStudentsNote['inputPC1'].value;
    const PC2 = frmStudentsNote['inputPC2'].value;
    const PC3 = frmStudentsNote['inputPC3'].value;
    const PC4 = frmStudentsNote['inputPC4'].value;
    const EP = frmStudentsNote['inputEP'].value;
    const EF = frmStudentsNote['inputEF'].value;

    if (id != '' && lastName != '' && name != '' && curse != '' && PC1 != '' && PC2 != '' && PC3 != '' && PC4 != '' && EP != '' && EF != '') {
        const notasPC = [parseInt(PC1), parseInt(PC2), parseInt(PC3), parseInt(PC4)];
        const studentCalification = new RegistroNotas(id, lastName, name, curse, notasPC, parseInt(EP), parseInt(EF))
        dataStudentsNotes.push(studentCalification);
        document.getElementById('frmRegisterStudentsNotes').reset();
        alert('Notas registradas existosamente')
    } else {
        alert('Complete todos los campos')
    }

    viewDataNotes();
}

buttonSaveNote.addEventListener('click', registerStudentsNotes);