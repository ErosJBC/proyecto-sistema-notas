'use strict'

const user = new Usuario('admin', 'admin')

const buttonLogin = document.getElementById('btnLogin');

const redirectDashboard = () => {
    window.location.href = './views/dashboard.html';
}

const validLogin = (event) => {

    event.preventDefault();
    const frmLogin= document.forms['frmLogin'];
    const username = frmLogin['inputUser'].value;
    const password = frmLogin['inputPassword'].value;

    if (user.username == username && user.password == password ) {
        alert('Ingreso éxitoso')
        setTimeout("redirectDashboard()", 3000);
    }else {
        alert('Ingrese un usuario y contraseña válida')
    }
}

buttonLogin.addEventListener('click', validLogin);