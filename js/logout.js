'use strict'

const buttonLogout = document.getElementById('btnLogout');

const redirectDashboard = () => {
    window.location.href = '../index.html';
}

const validLogout = () => {
    setTimeout("redirectDashboard()", 1500);
}

buttonLogout.addEventListener('click', validLogout);