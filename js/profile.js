var id = localStorage.getItem("id");
var token = localStorage.getItem("token");
var name = localStorage.getItem("name");
var email = localStorage.getItem("email");

const nameInput = document.getElementById("name");
const phoneInput = document.getElementById("phone");
const birthInput = document.getElementById("birth");
const addressInput = document.getElementById("address");
const emailInput = document.getElementById("email");

const nameInput2 = document.getElementById("edited_name");
const phoneInput2 = document.getElementById("edited_phone");
const birthInput2 = document.getElementById("edited_birth");
const addressInput2 = document.getElementById("edited_address");


const server = 'http://localhost:8000/api/';

(()=>{
    UserProfile();
    //loadCities();
})();

function UserProfile(){

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

        nameInput2.value = result.name;
        phoneInput2.value = result.phone;
        birthInput2.value = result.birth;
        addressInput2.value = result.address;
        console.log("Meglévő profil adatok betöltve!");
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
  let endpoint = 'user/' + id;
  let url = server + endpoint;
  
  fetch(url, {
    method: 'put',
    body: JSON.stringify({
        id: id,
        name: nameInput2.value,
        phone: phoneInput2.value,
        birth: birthInput2.value,
        address: addressInput2.value
      }),
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
        "Authorization": "Bearer " + token,
      }
    })
    .then(response => response.json())
    .then(result => {
      console.log("frissítve");
      alert("Profilod sikeresen frissítve!");
      location.reload();
  })
  .catch(error => {
      console.log('Hiba! A frissítés sikertelen!');
      alert("Profilodat nem sikerült frissíteni!");
      location.reload();
      console.log(error);
  });
}

/* CORS JSON beolvasásnál
function loadCities() {
  let dropdown = document.getElementById('locality-dropdown');
  dropdown.length = 0;

  let defaultOption = document.createElement('option');
  defaultOption.text = 'Kérjük válasszon várost';

  dropdown.add(defaultOption);
  dropdown.selectedIndex = 0;

  const path = './../api/gym_registry/database/data/cityregion.json';

  fetch(path)  
    .then(  
      function(response) {  
        if (response.status !== 200) {  
          console.warn('Looks like there was a problem. Status Code: ' + 
            response.status);  
          return;  
        }

        // Examine the text in the response  
        response.json().then(function(data) {  
          let option;
      
        for (let i = 0; i < data.length; i++) {
            option = document.createElement('option');
            option.text = data[i].name;
            option.value = data[i].abbreviation;
            dropdown.add(option);
        }    
        });  
      }  
    )  
    .catch(function(err) {  
      console.error('Fetch Error -', err);  
    });
}
*/