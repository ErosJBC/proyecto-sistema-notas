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

const dataUsers = []

const buttonLogin = document.getElementById('btnLogin');

const getUser = async (username, password) => {

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

    console.log(dataUsers);

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
}

// const getUser = async (username, password) => {
//     const api = await fetch(`https://userdb-01-default-rtdb.firebaseio.com/users.json`);
//     console.log(api);
//     const users = await api.json();

//     console.log(users);

//     users.forEach(user => {
//         if (user != null) {
//             const usr = new Usuario(user.id_user,
//                 user.user,
//                 user.password,
//                 user.active,
//                 user.create_date,
//                 user.update_date
//             )
//             dataUsers.push(usr)
//         }
//     });

//     console.log(dataUsers);

//     const validateUser = dataUsers.find(du => {return du.username == username});
//     if(validateUser != null){
//         if(validateUser.active == 1){
//             if(validateUser.username == username && validateUser.password == password){
//                 redirectDashboard()
//             }else {
//                 alert("Usuario o contraseña incorrecta. Vuelva a ingresar sus credenciales");
//                 redirectIndex();
//             }
//         }else{
//             alert("El usuario se encuentra deshabilitado");
//             redirectIndex();
//         }
//     }else {
//         alert("No existe el usuario en el sistema");
//         redirectIndex();
//     }
// }

const redirectDashboard = () => {
    window.location.href = './views/dashboard.html';
}

const redirectIndex = () => {
    window.location.href = '../index.html';
}

const validateLogin = (event) => {

    event.preventDefault();
    const frmLogin= document.forms['frmLogin'];
    const username = frmLogin['inputUser'].value;
    const password = frmLogin['inputPassword'].value;

    if (username != "" && password != "") {
        onloadPage(username, password);
    }else {
        const validatedUser = `<span id="validatedInputUser" class="little-text text-danger">Complete el campo vacío</span>`
        const validatedPassword = `<span id="validatedInputPassword" class="animate__animated animate__bounceInRight little-text text-danger">Complete el campo vacío</span>`
        if(username === "" && password === "") {
            document.querySelector('#user').insertAdjacentHTML('beforeend', validatedUser);
            document.querySelector('#password').insertAdjacentHTML('beforeend', validatedPassword);
        }else {
            if(username != "" && password === "") {
                document.querySelector('#password').insertAdjacentHTML('beforeend', validatedPassword);
            }else{
                if(username === "" && password != "") {
                    document.querySelector('#user').insertAdjacentHTML('beforeend', validatedUser);
                }
            }
        }

        $("#inputUser").on('click', () => {
            $("span").remove("#validatedInputUser");
            $("span").remove("#validatedInputPassword");
        });

        $("#inputPassword").on('click', () => {
            $("span").remove("#validatedInputUser");
            $("span").remove("#validatedInputPassword");
        });
    }
}

const onloadPage = (username, password) => {
    getUser(username, password);
}

buttonLogin.addEventListener('click', validateLogin);
