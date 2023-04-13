const nameReg = document.querySelector('#name');
const emailReg = document.querySelector('#email');
const passwordReg = document.querySelector('#password');
const confirm_passwordReg = document.querySelector('#confirm_password');

const registerButton = document.querySelector('#registerButton');

const server = 'http://localhost:8000/api/';

registerButton.addEventListener('click', () => {
    registerUser();
});

const registerUser = () => {
    let endpoint = 'register';
    let url = server + endpoint

    let users = {
        name: nameReg.value,
        email: emailReg.value,
        password: passwordReg.value,
        confirm_password: confirm_passwordReg.value
    }

    fetch(url, {
        method: "post",
        body: JSON.stringify(users),
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(response => response.json())
    .then(result => {
        console.log(result);
        nameReg.value = '';
        emailReg.value = '';
        passwordReg.value = '';
        confirm_passwordReg.value = '';
        window.location.href = 'index.html';
        alert("Sikeres regisztráció!");
    })
    .catch(err => {
        console.log(err);
        window.location.href = 'register.html';
        alert("Sikertelen regisztráció!");
    })
};