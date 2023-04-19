const passtypeTable = document.querySelector("#passtypeTable");
const passtypeType = document.querySelector("#type");
const passtypePrice = document.querySelector("#price");

const discountTable = document.querySelector("#discountTable");
const discountType = document.querySelector("#discount_type");
const discountPercent = document.querySelector("#percent");


var tbody = document.createElement('tbody');
passtypeTable.appendChild(tbody);


var tbody2 = document.createElement('tbody');
discountTable.appendChild(tbody2);

const server = 'http://localhost:8000/api/';
(()=>{
    getPasstypes();
    getDiscounts();
})();

function getPasstypes() {
    let endpoint = 'passtypes';
    let url = server + endpoint;
    fetch(url)
    .then( response => response.json())
    .then( result => {
        renderPasstypeTable(result);       
    })
    .catch(error => {
        console.log('Hiba! A lekérdezés sikertelen!');
        console.log(error);
    });    

}

function getDiscounts() {
    let endpoint = 'discounts';
    let url = server + endpoint;
    fetch(url)
    .then( response => response.json())
    .then( result => {
        renderDiscountTable(result);
    })
    .catch(error => {
        console.log('Hiba! A lekérdezés sikertelen!');
        console.log(error);
    });    

}

function renderPasstypeTable(passtypes) {
    tbody.innerHTML = '';
    passtypes.forEach( passtype => {
        let tr = document.createElement('tr');
        let tdType = document.createElement('td');
        let tdPrice = document.createElement('td');

        tr.appendChild(tdType);
        tr.appendChild(tdPrice);

        tbody.appendChild(tr);
    
        tdType.textContent = passtype.type;        
        tdPrice.textContent = passtype.price;
    });
}

function renderDiscountTable(discounts) {
    tbody2.innerHTML = '';
    discounts.forEach( discount => {
        let tr = document.createElement('tr');
        let tdType = document.createElement('td');
        let tdPercent = document.createElement('td');

        tr.appendChild(tdType);
        tr.appendChild(tdPercent);

        tbody2.appendChild(tr);
    
        tdType.textContent = discount.discount_type;        
        tdPercent.textContent = discount.percent;        
    });
}