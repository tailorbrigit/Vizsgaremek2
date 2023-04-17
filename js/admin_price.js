var token = localStorage.getItem("token");
if (token == null) {
  window.location.href = "./login.html";
}

const addButton = document.querySelector("#addButton");
const passtypeTable = document.querySelector("#passtypeTable");
const passtypeType = document.querySelector("#type");
const passtypePrice = document.querySelector("#price");
const edited_id = document.querySelector("#edited_id");
const edited_price = document.querySelector("#edited_price");

const saveButton = document.querySelector("#saveButton");
var actualTr = null;
var tbody = document.createElement('tbody');
passtypeTable.appendChild(tbody);


const server = 'http://localhost:8000/api/';

(()=>{
    getPasstypes();
})();

function getPasstypes() {
    let endpoint = 'passtypes';
    let url = server + endpoint;
    fetch(url)
    .then( response => response.json())
    .then( result => {
        renderTable(result);
    })
    .catch(error => {
        console.log('Hiba! A lekérdezés sikertelen!');
        console.log(error);
    });    

}

function renderTable(passtypes) {
    tbody.innerHTML = '';
    passtypes.forEach( passtype => {
        let tr = document.createElement('tr');
        let tdId = document.createElement('td');
        let tdType = document.createElement('td');
        let tdPrice = document.createElement('td');

        let tdButton = document.createElement('td');
        let delBtn = makeDelButton(passtype.id);
        let editBtn = makeEditButton(passtype);

        tr.appendChild(tdId);
        tr.appendChild(tdType);
        tr.appendChild(tdPrice);

        tr.appendChild(tdButton);
        tdButton.appendChild(delBtn);
        tdButton.appendChild(editBtn);

        tbody.appendChild(tr);
    
        tdId.textContent = passtype.id;
        tdType.textContent = passtype.type;        
        tdPrice.textContent = passtype.price;        
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
            deletePasstype(id);
            actualTr = delBtn.parentElement.parentElement;
            actualTr.parentNode.removeChild(actualTr);
        }        
    });
    return delBtn;
}

addButton.addEventListener('click', () => {
    addPasstype();

});

function addPasstype() {
    let endpoint = 'passtype';
    let url = server + endpoint;    
    let passtype = {
        type: passtypeType.value,
        price: passtypePrice.value
    };
    
    fetch(url, {
        method: 'post',
        body: JSON.stringify(passtype),
        headers: {
            "Content-Type": "application/json;charset=UTF-8",
            "Authorization": "Bearer " + token,
        }
    })
    .then(response => response.json())
    .then(result => {
        passtypeType.value = '';
        passtypePrice.value = '';
        addPasstypeToTable(result);
    });

}

function addPasstypeToTable(passtype) {
    let tr = document.createElement('tr');
    let tdId = document.createElement('td');
    let tdType = document.createElement('td');
    let tdPrice = document.createElement('td');
    let tdButton = document.createElement('td');
    
    let delBtn = makeDelButton(passtype.id);
    let editBtn = makeEditButton(passtype);

    tr.appendChild(tdId);
    tr.appendChild(tdType);
    tr.appendChild(tdPrice);
    tr.appendChild(tdButton);
    
    tdButton.appendChild(delBtn);
    tdButton.appendChild(editBtn);
    
    tbody.appendChild(tr);

    tdId.textContent = passtype.id;
    tdType.textContent = passtype.type;
    tdPrice.textContent = passtype.price;
}

function deletePasstype(id) {
    let endpoint = 'passtype/' + id;
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
        console.log('Törölve');
    })
    .catch(error => {
        console.log('Hiba! A törlés sikertelen!');
        console.log(error);
    });
}

function makeEditButton(passtype) {
    let editBtn = document.createElement('button');
    editBtn.classList.add('btn');
    editBtn.classList.add('btn-warning');
    editBtn.classList.add('ms-1');

    editBtn.setAttribute('data-priceid', passtype.id);
    editBtn.setAttribute('data-edited_price', passtype.price);
    editBtn.setAttribute('data-bs-toggle', 'modal');
    editBtn.setAttribute('data-bs-target', '#editModal');

    editBtn.innerHTML = '<i class="bi bi-pencil-fill"></i>';

    editBtn.addEventListener('click', ()=> {
        edited_id.value = editBtn.dataset.priceid; 
        edited_price.value = editBtn.dataset.edited_price;
        actualTr = editBtn.parentElement.parentElement;
    });
    return editBtn;
}

saveButton.addEventListener('click', () => {
    console.log('Mentés...');
    actualTr.childNodes[2].textContent = edited_price.value;
    
    updatepasstype();
});

function updatepasstype() {
    let endpoint = 'passtype/'+ edited_id.value;
    let url = server + endpoint;

    fetch(url, {
        method: 'put',
        body: JSON.stringify({
            id: edited_id.value,
            price: edited_price.value
        }),
        headers: {
            "Content-Type": "application/json;charset=UTF-8",
            "Authorization": "Bearer " + token,
        }
    })
    .then(response => response.json())
    .then(result => {
        console.log("frissítve");
    })
    .catch(error => {
        console.log('Hiba! A frissítés sikertelen!');
        console.log(error);
    });
}