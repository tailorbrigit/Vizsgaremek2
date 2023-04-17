var id = localStorage.getItem("id");
var token = localStorage.getItem("token");
var name = localStorage.getItem("name");
var email = localStorage.getItem("email");

const edited_id = document.querySelector("#edited_id");
const edited_name = document.querySelector("#edited_name");
const edited_phone = document.querySelector("#edited_phone");
const edited_birth = document.querySelector("#edited_birth");
const edited_address = document.querySelector("#edited_address");
const saveButton = document.querySelector("#saveButton");

const server = 'http://localhost:8000/api/';

(()=>{
    UserProfile();
})();

function UserProfile(){
    const nameInput = document.getElementById("name");
    const phoneInput = document.getElementById("phone");
    const birthInput = document.getElementById("birth");
    const addressInput = document.getElementById("address");
    const emailInput = document.getElementById("email");
    
    let endpoint = "user/" + id;
    let url = server + endpoint;
    
    fetch((url), {
        method: 'GET',
        headers: {
            "Authorization": "Bearer " + token,
        }
      })
      .then(response => response.json())
      .then(result => {
        nameInput.value = result.name;
        phoneInput.value = result.phone;
        birthInput.value = result.birth;
        addressInput.value = result.address;
        emailInput.value = result.email;
        console.log("beírva");
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });
}

saveButton.addEventListener('click', () => {
  console.log('Mentés...');
  
  updateProfile();
});

function updateProfile() {
  let endpoint = 'user/' + edited_id.value;
  let url = server + endpoint;
  
  fetch(url, {
    method: 'put',
    body: JSON.stringify({
        id: edited_id.value,
        name: edited_name.value,
        phone: edited_phone.value,
        birth: edited_birth.value,
        address: edited_address.value
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

