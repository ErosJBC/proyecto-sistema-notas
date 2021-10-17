'use strict'

$(document).ready(() => {
    $('#toogle-sidebar').on('click', () => {
        $('#main-container').toggleClass("close");
    });

    $('#view-faculty').on('click', () => {
        $('#first-card').slideToggle('slow');
    });

    $('#view-speciality').on('click', () => {
        $('#second-card').slideToggle('slow');
    });
});



