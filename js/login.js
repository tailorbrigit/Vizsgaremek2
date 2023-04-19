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
        emailLog.value = '';
        passwordLog.value = '';
            
        var id = result.id;
        localStorage.setItem('id',id);

        var name = result.name;
        localStorage.setItem('name',name);

        var userRole = result.role;
        localStorage.setItem('userRole', userRole);

        var token = result.token;
        localStorage.setItem('token',token);

        var email = result.email;
        localStorage.setItem('email',email);

        if (userRole === 1) {
            window.location.href = 'admin/admin.html';
            alert("Bejelentkezés sikeres!");    
        }
        else if (userRole === 0) {
            window.location.href = 'user/profile.html';
            alert("Bejelentkezés sikeres!");
        }
        else{
            window.location.href = 'login.html';
            alert("Bejelentkezés sikertelen!");
        }
    })
    .catch(err => {
        console.log(err);
        window.location.href = 'login.html';
        alert("Bejelentkezés sikertelen!");
    })

};