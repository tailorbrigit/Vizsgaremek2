var jwt = localStorage.getItem("jwt");
if (jwt == null) {
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
    console.log("kívül");
    getPasstypes();
})();

function getPasstypes() {
    let endpoint = 'passtypes';
    let url = server + endpoint;
    fetch(url)
    .then( response => response.json())
    .then( result => {
        console.log(result[0].type);
        console.log(result[0].price);
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
    delBtn.classList.add('btn-info');
    
    delBtn.innerHTML = '<i class="bi bi-trash-fill"></i>';
    
    delBtn.addEventListener('click', ()=> {
        let answer = confirm('Biztosan törlöd?');
        if (answer) {
            deletepasstype(id);
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
            "Authorization": "Bearer" + jwt
        }
    })
    .then(response => response.json())
    .then(result => {
        console.log(result);
        passtypeType.value = '';
        passtypePrice.value = '';
        addPasstypeToTable(result);
        console.log(jwt);
    });

}

function addPasstypeToTable(passtype) {
    let tr = document.createElement('tr');
    let tdId = document.createElement('td');
    let tdType = document.createElement('td');
    let tdPrice = document.createElement('td');
    let tdButton = document.createElement('td');
 
    tdId.textContent = passtype.id;
    tdType.textContent = passtype.type;
    tdPrice.textContent = passtype.price;

    tr.appendChild(tdId);
    tr.appendChild(tdType);
    tr.appendChild(tdPrice);
    tr.appendChild(tdButton);

    let delButton = makeDelButton(passtype.id);
    let editButton = makeEditButton(passtype);
    tdButton.appendChild(delButton);
    tdButton.appendChild(editButton);

    tbody.appendChild(tr);
}

function deletepasstype(id) {
    console.log(id);
    let endpoint = 'passtype/' + id;
    let url = server + endpoint;
    fetch(url, {
        method: 'delete'
    })
    .then(response => response.json())
    .then(result => {
        console.log(result);
    });
}

function makeEditButton(passtype) {
    let editBtn = document.createElement('button');
    editBtn.classList.add('btn');
    editBtn.classList.add('btn-info');
    editBtn.classList.add('ms-1');

    editBtn.setAttribute('data-priceid', passtype.id);
    editBtn.setAttribute('data-edited_price', passtype.price);
    editBtn.setAttribute('data-bs-toggle', 'modal');
    editBtn.setAttribute('data-bs-target', '#editModal');

    editBtn.innerHTML = '<i class="bi bi-pencil-fill"></i>';

    editBtn.addEventListener('click', ()=> {
        console.log('Szerkesztés működik');
        console.log(passtype.id);
        console.log(passtype.price);
        edited_id.value = editBtn.dataset.priceid; 
        edited_price.value = editBtn.dataset.edited_price;
        actualTr = editBtn.parentElement.parentElement;
    });
    return editBtn;
}

saveButton.addEventListener('click', () => {
    console.log('Mentés...');
    actualTr.childNodes[2].textContent = edited_price.value;
    

    actualTr
    .childNodes[2]
    .lastChild
    .setAttribute('data-edited_price', edited_price.value);

    updatepasstype();
});

function updatepasstype() {
    console.log('REST API-ba mentés');

    let endpoint = 'passtype/'+ edited_id.value;
    let url = server + endpoint;

    fetch(url, {
        method: 'put',
        body: JSON.stringify({
            id: edited_id.value,
            price: edited_price.value
        }),
        headers: {
            "Content-Type": "application/json"

        }
    })
    .then(response => response.json())
    .then(result => {
        console.log(result);
    });
}