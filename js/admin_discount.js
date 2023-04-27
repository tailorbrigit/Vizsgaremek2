var token = localStorage.getItem("token");
if (token == null) {
  window.location.href = "./login.html";
}

const addButton = document.querySelector("#addButton");
const discountTable = document.querySelector("#discountTable");
const discountType = document.querySelector("#discount_type");
const discountPercent = document.querySelector("#percent");
const edited_id = document.querySelector("#edited_id");
const edited_percent = document.querySelector("#edited_percent");

const saveButton = document.querySelector("#saveButton");
var actualTr = null;
var tbody = document.createElement('tbody');
discountTable.appendChild(tbody);


const server = 'http://localhost:8000/api/';

(()=>{
    getDiscounts();
})();

function getDiscounts() {
    let endpoint = 'discounts';
    let url = server + endpoint;
    fetch(url)
    .then( response => response.json())
    .then( result => {
        
        var discount_array = result;
        localStorage.setItem('discount_array',JSON.stringify(discount_array));

        renderTable(result);
    })
    .catch(error => {
        console.log('Hiba! A lekérdezés sikertelen!');
        console.log(error);
    });    

}

function renderTable(discounts) {
    tbody.innerHTML = '';
    discounts.forEach( discount => {
        let tr = document.createElement('tr');
        let tdId = document.createElement('td');
        let tdType = document.createElement('td');
        let tdPercent = document.createElement('td');

        let tdButton = document.createElement('td');
        let delBtn = makeDelButton(discount.id);
        let editBtn = makeEditButton(discount);

        tr.appendChild(tdId);
        tr.appendChild(tdType);
        tr.appendChild(tdPercent);

        tr.appendChild(tdButton);
        tdButton.appendChild(delBtn);
        tdButton.appendChild(editBtn);

        tbody.appendChild(tr);
    
        tdId.textContent = discount.id;
        tdType.textContent = discount.discount_type;        
        tdPercent.textContent = discount.percent;        
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
            deleteDiscount(id);
            actualTr = delBtn.parentElement.parentElement;
            actualTr.parentNode.removeChild(actualTr);
        }        
    });
    return delBtn;
}

addButton.addEventListener('click', () => {
    addDiscount();

});

function addDiscount() {
    let endpoint = 'discount';
    let url = server + endpoint;    
    let discount = {
        discount_type: discountType.value,
        percent: discountPercent.value
    };
    
    fetch(url, {
        method: 'post',
        body: JSON.stringify(discount),
        headers: {
            "Content-Type": "application/json;charset=UTF-8",
            "Authorization": "Bearer " + token,
        }
    })
    .then(response => response.json())
    .then(result => {
        discountType.value = '';
        discountPercent.value = '';
        addDiscountToTable(result);
        location.reload();
    });

}

function addDiscountToTable(discount) {
    let tr = document.createElement('tr');
    let tdId = document.createElement('td');
    let tdType = document.createElement('td');
    let tdPercent = document.createElement('td');
    let tdButton = document.createElement('td');
    
    let delBtn = makeDelButton(discount.id);
    let editBtn = makeEditButton(discount);

    tr.appendChild(tdId);
    tr.appendChild(tdType);
    tr.appendChild(tdPercent);
    tr.appendChild(tdButton);
    
    tdButton.appendChild(delBtn);
    tdButton.appendChild(editBtn);
    
    tbody.appendChild(tr);

    tdId.textContent = discount.id;
    tdType.textContent = discount.discount_type;
    tdPercent.textContent = discount.percent;
}

function deleteDiscount(id) {
    let endpoint = 'discount/' + id;
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
        location.reload();
    })
    .catch(error => {
        console.log('Hiba! A törlés sikertelen!');
        console.log(error);
    });
}

function makeEditButton(discount) {
    let editBtn = document.createElement('button');
    editBtn.classList.add('btn');
    editBtn.classList.add('btn-warning');
    editBtn.classList.add('ms-1');

    editBtn.setAttribute('data-percentid', discount.id);
    editBtn.setAttribute('data-edited_percent', discount.percent);
    editBtn.setAttribute('data-bs-toggle', 'modal');
    editBtn.setAttribute('data-bs-target', '#editModal');

    editBtn.innerHTML = '<i class="bi bi-pencil-fill"></i>';

    editBtn.addEventListener('click', ()=> {
        edited_id.value = editBtn.dataset.percentid; 
        edited_percent.value = editBtn.dataset.edited_percent;
        actualTr = editBtn.parentElement.parentElement;
    });
    return editBtn;
}

saveButton.addEventListener('click', () => {
    actualTr.childNodes[2].textContent = edited_percent.value;
    
    updateDiscount();
});

function updateDiscount() {
    let endpoint = 'discount/'+ edited_id.value;
    let url = server + endpoint;

    fetch(url, {
        method: 'put',
        body: JSON.stringify({
            id: edited_id.value,
            percent: edited_percent.value
        }),
        headers: {
            "Content-Type": "application/json;charset=UTF-8",
            "Authorization": "Bearer " + token,
        }
    })
    .then(response => response.json())
    .then(result => {
        location.reload();
    })
    .catch(error => {
        console.log('Hiba! A frissítés sikertelen!');
        console.log(error);
    });
}