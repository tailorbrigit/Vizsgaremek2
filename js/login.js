const emailLog = document.querySelector('#email');
const passwordLog = document.querySelector('#password');

const loginButton = document.querySelector('#loginButton');

const server = 'http://localhost:8000/api/';

loginButton.addEventListener('click', () => {
    loginUser();
});

const loginUser = () => {
    let endpoint = 'login';
    let url = server + endpoint

    let user = {
        email: emailLog.value,
        password: passwordLog.value
    }

    fetch(url, {
        method: "post",
        body: JSON.stringify(user),
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(response => response.json())
    .then(result => {
        console.log(result);
            emailLog.value = '';
            passwordLog.value = '';
            window.location.href = 'index.html';
            alert("Bejelentkezés sikeres!");
    })
    .catch(err => {
        console.log(err);
        window.location.href = 'login.html';
        alert("Bejelentkezés sikertelen!");
    })

};