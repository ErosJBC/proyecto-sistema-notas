'use strict'

$(window).on('load', () => {
    const spinner = `<div id="spinner-preload" class="spinner-preloader">
                        <span class="preloader"></span>
                    </div>`
    $("body").append(spinner);

    setTimeout(() => {
        $("#spinner-preload").fadeOut("slow");
    }, 3000);
});

const inputs = document.querySelectorAll('#frmLogin input');

const regularExpresion = {
	user: /^[a-zA-Z\_]{4,15}$/,
	password: /^.{4,8}$/
};

const inputsForm = {
    username: false,
    password: false
};

const dataUsers = [];

const redirectDashboard = () => {
    window.location.href = './views/dashboard.html';
};

const redirectIndex = () => {
    window.location.href = './index.html';
};

/* const getUser = async (username, password) => {
    await axios({
        method: 'get',
        url: 'https://userdb-01-default-rtdb.firebaseio.com/users.json'
    }).then(response => {
        const users = response.data;
        console.log(users);
        users.map(user => {
            if (user != null) {
                const usr = new Usuario(user.id_user,
                    user.user,
                    user.password,
                    user.active,
                    user.create_date,
                    user.update_date
                )
                dataUsers.push(usr)
            }
        });
    }).catch(err => console.log(err));

    const validateUser = dataUsers.find(du => {return du.username == username});
    if(validateUser != null){
        if(validateUser.active == 1){
            if(validateUser.username == username && validateUser.password == password){
                redirectDashboard()
            }else {
                alert("Usuario o contraseña incorrecta. Vuelva a ingresar sus credenciales");
                redirectIndex();
            }
        }else{
            alert("El usuario se encuentra deshabilitado");
            redirectIndex();
        }
    }else {
        alert("No existe el usuario en el sistema");
        redirectIndex();
    }
}; */

const getUser = async (username, password) => {
    const url = 'https://userdb-01-default-rtdb.firebaseio.com/users.json'
    await $.get(url, (response, status) => {
        const users = response;
        console.log(users);
        if (status === 'success'){
            users.map(user => {
                if (user != null) {
                    const usr = new Usuario(user.id_user,
                        user.user,
                        user.password,
                        user.active,
                        user.create_date,
                        user.update_date
                    )
                    dataUsers.push(usr)
                }
            });
        }else{
            console.log('No se logró cargar los datos')
        }

    });

    const validateUser = dataUsers.find(du => {return du.username == username});
    if(validateUser != null){
        if(validateUser.active == 1){
            if(validateUser.username == username && validateUser.password == password){
                redirectDashboard()
            }else {
                alert("Usuario o contraseña incorrecta. Vuelva a ingresar sus credenciales");
                redirectIndex();
            }
        }else{
            alert("El usuario se encuentra deshabilitado");
            redirectIndex();
        }
    }else {
        alert("No existe el usuario en el sistema");
        redirectIndex();
    }
};

const validateForm = (e) => {
    switch (e.target.name) {
        case "username":
            console.log('Holi');
            validateInput(regularExpresion.user, e.target, '#messageValidateUser');
        break;
        case "password":
            console.log('Holi');
            validateInput(regularExpresion.password, e.target, '#messageValidatePassword');
        break;
    }
};

const validateInput = (expresion, input, id) => {
    if(expresion.test(input.value)){
        $(id).addClass('visually-hidden');
        inputsForm[input.name] = true;
    }else {
        $(id).removeClass('visually-hidden');
        inputsForm[input.name] = false;
    }
};

inputs.forEach((input) => {
    input.addEventListener('click', () => {
        $('#messageErrorInputs').addClass('visually-hidden');
    })
    input.addEventListener('keyup', validateForm);
    input.addEventListener('blur', () => {
        $('#messageValidateUser').addClass('visually-hidden');
        $('#messageValidatePassword').addClass('visually-hidden');
    });
});

$('#frmLogin').on('submit', (e) => {
    e.preventDefault();

    if(inputsForm.username && inputsForm.password){
        $('#messageErrorInputs').addClass('visually-hidden');
        console.log($('#frmLogin')[0][0].value, $('#frmLogin')[0][1].value);
        getUser($('#frmLogin')[0][0].value, $('#frmLogin')[0][1].value);
    }else{
        $('#messageErrorInputs').removeClass('visually-hidden');
    };
});
