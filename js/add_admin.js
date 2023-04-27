var filteredAdmin = localStorage.getItem("admin");
var emailUser = localStorage.getItem("email");

var token = localStorage.getItem("token");
if (token == null) {
  window.location.href = "./login.html";
}

const addButton = document.querySelector("#addButton");
const adminTable = document.querySelector("#adminTable");

const name = document.querySelector("#name");
const email = document.querySelector("#email");
const password = document.querySelector("#password");

var tbody = document.createElement('tbody');
adminTable.appendChild(tbody);


const server = 'http://localhost:8000/api/';

(()=>{
    getAdmins();
})();

function getAdmins() {
    let endpoint = 'users';
    let url = server + endpoint;
    fetch(url, {
        method: 'get',
        headers: {
            "Content-Type": "application/json;charset=UTF-8",
            "Authorization": "Bearer " + token,
        }
    })
    .then( response => response.json())
    .then( result => {
        let filteredResult = result.filter(user => user.email.endsWith("@mod.com"));
        let filteredAdmin = result.filter(user => user.email.endsWith("@admin.com"));

        localStorage.setItem('admin',filteredAdmin);
        
        renderTable(filteredResult);
    })
    .catch(error => {
        console.log('Hiba! A lekérdezés sikertelen!');
        console.log(error);
    });    
}

function renderTable(admins) {
    tbody.innerHTML = '';
    admins.forEach( admin => {
        let tr = document.createElement('tr');
        let tdId = document.createElement('td');
        let tdName = document.createElement('td');
        let tdEmail = document.createElement('td');
        
        if(emailUser.endsWith("@admin.com")){
            let tdButton = document.createElement('td');
            let delBtn = makeDelButton(admin.id);
            
            tr.appendChild(tdId);
            tr.appendChild(tdName);
            tr.appendChild(tdEmail);
            
            tr.appendChild(tdButton);
            tdButton.appendChild(delBtn);
            
            tbody.appendChild(tr);  

            tdId.textContent = admin.id;
            tdName.textContent = admin.name;        
            tdEmail.textContent = admin.email;
        }

        tr.appendChild(tdId);
        tr.appendChild(tdName);
        tr.appendChild(tdEmail);


        tbody.appendChild(tr);
    
        tdId.textContent = admin.id;
        tdName.textContent = admin.name;        
        tdEmail.textContent = admin.email;        
    });
}

function makeDelButton(id) {
    let delBtn = document.createElement('button');
    delBtn.classList.add('btn');
    delBtn.classList.add('btn-danger');
    
    delBtn.innerHTML = '<i class="bi bi-trash-fill"></i>';
    
    delBtn.addEventListener('click', ()=> {
        let answer = confirm('Biztosan törlöd?');
        if (answer) {
            deleteAdmin(id);
            actualTr = delBtn.parentElement.parentElement;
            actualTr.parentNode.removeChild(actualTr);
        }        
    });
    return delBtn;
}

addButton.addEventListener('click', () => {
    if(emailUser.endsWith("@admin.com")){
        addAdmin();
    }
    else{
        alert("Nincs ehez engedélyed!");
        location.reload();
    }

});

function addAdmin() {
    let endpoint = 'admin/user';
    let url = server + endpoint;    
    let admin = {
        name: name.value,
        email: email.value,
        password: password.value
    };
    
    fetch(url, {
        method: 'post',
        body: JSON.stringify(admin),
        headers: {
            "Content-Type": "application/json;charset=UTF-8",
            "Authorization": "Bearer " + token,
        }
    })
    .then(response => response.json())
    .then(result => {
        name.value = '';
        email.value = '';
        password.value = '';
        addAdminToTable(result);
        alert("Hozzáadás sikeres!")
    })
    .catch(error => {
        console.log('Hiba! A hozzáadás sikertelen!');
        console.log(error);
    });;
}

function addAdminToTable(admin) {
    let tr = document.createElement('tr');
    let tdId = document.createElement('td');
    let tdName = document.createElement('td');
    let tdEmail = document.createElement('td');
    let tdButton = document.createElement('td');
    
    let delBtn = makeDelButton(admin.id);
    tdButton.appendChild(delBtn);
    tr.appendChild(tdButton);

    tr.appendChild(tdId);
    tr.appendChild(tdName);
    tr.appendChild(tdEmail);

    
    tbody.appendChild(tr);

    tdId.textContent = admin.id;
    tdName.textContent = admin.name;
    tdEmail.textContent = admin.email;
}

function deleteAdmin(id) {
    let endpoint = 'admin/user/' + id;
    let url = server + endpoint;
    fetch(url, {
        method: 'delete',
        headers: {
            "Content-Type": "application/json;charset=UTF-8",
            "Authorization": "Bearer " + token,
        }
    })
    .then(response => response.json())
    .then(result => {
    })
    .catch(error => {
        console.log('Hiba! A törlés sikertelen!');
        console.log(error);
    });
}