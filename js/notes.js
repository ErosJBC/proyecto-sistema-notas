'use strict'

let dataStudentsNotes = [];
let dataStudents = [];

const buttonSaveNote = document.getElementById('btnSaveNote');

const sumar = (prevValue, nextValue) => prevValue + nextValue;

const viewDataNotes = () => {
    dataStudentsNotes = saveDataStudent();
    console.log(dataStudentsNotes);
    let studentsNotes = '';
    dataStudentsNotes.forEach((studentNote, i) => {
        let avgNote = (studentNote.notasPC.reduce(sumar) - Math.min(...studentNote.notasPC))/(studentNote.notasPC.length - 1);
        let avgCurse = ((avgNote + studentNote.notaEP + studentNote.notaEF)/3).toFixed(1);
        let condition = (avgCurse >= 11 ? 'APROBADO' : 'DESAPROBADO');
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
            <td class="text-center">${studentNote.notaEP}</td>
            <td class="text-center">${studentNote.notaEF}</td>
            <td class="text-center">${avgCurse}</td>
            <td class="${text_color_condition}">${condition}</td>
        <tr>`
    });

    document.getElementById('dataStudentsNotes').innerHTML = studentsNotes;
}

const registerStudentsNotes = (event) => {
    event.preventDefault();
    if (getDataStudentStorage() != null){
        dataStudents = getDataStudentStorage();
    }
    console.log(dataStudents);
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
        const student = {id: id, lastName: lastName, name: name, curse: curse, notasPC: notasPC, notaEP: parseInt(EP), notaEF: parseInt(EF)}
        dataStudents.push(student)
        localStorage.setItem('student', JSON.stringify(dataStudents))
        // const studentCalification = new RegistroNotas(id, lastName, name, curse, notasPC, parseInt(EP), parseInt(EF))
        // dataStudentsNotes.push(studentCalification);
        document.getElementById('frmRegisterStudentsNotes').reset();
        alert('Notas registradas exitosamente')
    } else {
        alert('Complete todos los campos')
    }
    viewDataNotes();
}

const getDataStudentStorage = () => {
    let data = JSON.parse(localStorage.getItem('student'))
    return data;
}

const saveDataStudent = () => {
    const data = getDataStudentStorage();
    const list_student = []
    console.log(data);
    if (data != null){
        data.forEach(student => {
            const studentCalification = new RegistroNotas(student.id, student.lastName, student.name, student.curse, student.notasPC, student.notaEP, student.notaEF);
            list_student.push(studentCalification);
        })
    }
    return list_student;
}

buttonSaveNote.addEventListener('click', registerStudentsNotes);

$(window).on('load', () => {
    viewDataNotes();
});
