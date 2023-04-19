//Beiratás loaclStorage-ből
//Lekérdezési Tömbök
var price_array = JSON.parse(localStorage.getItem("price_array"));
var discount_array = JSON.parse(localStorage.getItem("discount_array"));
var passes_array = JSON.parse(localStorage.getItem("passes_array"));

//User adatok
var id = localStorage.getItem("id");
var token = localStorage.getItem("token");

//Beiratás oldalról
//Gomb
const buyButton = document.getElementById("buyButton");
const editPassModalButton = document.getElementById("editPassModalButton");

//Bérlet
const typeOption = document.getElementById("type");
const priceOption = document.getElementById("price");
const discountOption = document.getElementById("discount");
const percentOption = document.getElementById("percent");
const startOption = document.getElementById("start");
const endOption = document.getElementById("end");

//Bérlet modal
const typeInput = document.getElementById("edited_type");
const priceInput = document.getElementById("edited_price");
const discountInput = document.getElementById("edited_discount");
const percentInput = document.getElementById("edited_percent");
const endPriceInput = document.getElementById("edited_endprice");
const startInput = document.getElementById("edited_start");
const endInput = document.getElementById("edited_end");

//Változók letrehozása
let discountedPrice;
let selectedType;
let selectedDiscount;


//Mai dátum (yyyy-mm-dd) megadása
//Dátum
var date = new Date();
//Jelenlegi hónap megadása
var currentMonth = date.getMonth()+1;
//Ha a jelenlegi hónap 10. hónap alatt van, akkor 0 hozzáadása
if(currentMonth < 10){
  var currentDate = date.getFullYear() + "-0" + (date.getMonth()+1) + "-" + date.getDate();
}else {
  var currentDate = date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate();
};


//Automatikusan indulo funkciók
(() => {
  getPasses();
  inputType();
  inputDiscount();
})();

//Passes API GET
function getPasses() {
  let endpoint = 'passes';
  let url = server + endpoint;
  fetch((url), {
    method: 'GET',
    headers: {
        "Content-Type": "application/json; charset=UTF-8",
        "Authorization": "Bearer " + token,
    }
  })
  .then( response => response.json())
    .then( result => {

      

      //Passes tábla local storageba betöltés
      var passes_array = result;
      localStorage.setItem('passes_array',JSON.stringify(passes_array));

      

      //Ha létezik bérlete, bérlet modal gomb tiltása
      if (result.find(item => item.userId == id && item.end >= currentDate)) {
        editPassModalButton.hidden = true;
        document.getElementById("passH1").innerHTML = "Aktuális bérlete";
        document.getElementById("passHider").hidden = false;
      } else {
        editPassModalButton.hidden = false;
        document.getElementById("passH1").innerHTML = "Jelenleg nincsen bérlete!";
        document.getElementById("passHider").hidden = true;
      }

      //Minimum bérlet kezdete mai dátum
      startInput.min = currentDate;

      //Tömbökben keresés
      var passesResult = passes_array.find(item => item.userId == id && item.end >= currentDate);
      var priceResult = price_array.find(item => item.id == passesResult.typeId);
      var discountResult = discount_array.find(item => item.id == passesResult.discountId);

      //Bérlet mezők feltöltése
      typeOption.value = priceResult.type;
      discountOption.value = discountResult.discount_type;
      percentOption.value = discountResult.percent;
      startOption.value = passesResult.start;
      endOption.value = passesResult.end;
      priceOption.value = (priceResult.price - (priceResult.price * (discountResult.percent / 100)) + " Ft");

      console.log('Meglévő bérlet adatok betöltve!');
    })
    .catch(error => {
        console.log('Hiba! A lekérdezés sikertelen!');
        console.log(error);
    });    
}



//Típus funkció
function inputType(){
  //Tömbön végigfutás, típus beírás
  price_array.forEach(type => {
    let option = document.createElement("option");
    option.value = type.days;
    option.text = type.type;
    typeInput.add(option);
  });

  //Típus változásának figyelése
  typeInput.addEventListener("change", function() {
    const selectedTypeId = typeInput.value;
    selectedType = price_array.find(type => type.days == selectedTypeId);
    if (selectedType) {
      priceInput.value = selectedType.price;
    }
  });
}



//Kedvezmény funkció
function inputDiscount(){
  //Tömbön végigfutás, discount beírás
  discount_array.forEach(discount => {
    let option = document.createElement("option");
    option.value = discount.id;
    option.text = discount.discount_type;
    discountInput.add(option);
  });




  //Eventek változásának figyelése
    addEventListener("change", function() {

      var date = new Date(startInput.value);
      date.setDate(date.getDate() + selectedType.days);
      
      //Év
      var selectedYear = date.getFullYear();

      //Hónap
      var selectedMonthCheck = (date.getMonth()+1)
      if(selectedMonthCheck < 10) {
        var selectedMonth = "0" + (date.getMonth()+1)
      } else {
        var selectedMonth = (date.getMonth()+1)
      }

      //Nap
      var selectedDayCheck = date.getDate();
      if(selectedDayCheck < 10) {
        var selectedDay = "0" + date.getDate();
      } else {
        var selectedDay = date.getDate();
      }

      var datePlus = selectedYear + "-" + selectedMonth + "-" + selectedDay;
      endInput.value = datePlus;


      const selectedDiscountId = discountInput.value;
      selectedDiscount = discount_array.find(discount => discount.id == selectedDiscountId);
    
      if (typeInput.value && selectedDiscount) {
        percentInput.value = selectedDiscount.percent;
        priceCalc(); 
      }
  });
}



//Árkalkulátor funkció
function priceCalc() {
  //Kiválasztott ár és kedvezmény bekérés
  const price = priceInput.value;
  const discount = percentInput.value;

  //Számolás és beiratás
  const discountedPrice = (price - (price * (discount / 100)) + " Ft");
  endPriceInput.value = discountedPrice;

}



//Bérlet vétel gomb 
buyButton.addEventListener('click', () => {
  try {
    console.log('Mentés...');
    console.log("id: " + id);
    console.log("startInput.value: " + startInput.value);
    console.log("endInput.value: " + endInput.value);
    console.log("selectedType.id: " + selectedType.id);
    console.log("selectedDiscount.id: " + selectedDiscount.id);

    if (startInput.value >= currentDate) {
        createPass();
    } else {
        alert("Hibás dátum!")
    }
    
  } catch (error) {
    
    alert("Hiányos vagy hibás adatok. Kérjük próbálja meg újra!");
    location.reload();
  }
    
});



//Bérlet adatbázisba feltöltés funkció
function createPass() {
  let endpoint = 'pass'
  let url = server + endpoint;

  let pass = {
    start: startInput.value,
    end: endInput.value,
    typeId: selectedType.id,
    discountId: selectedDiscount.id,
    userId: id
  };

  fetch(url, {
    method: 'post',
    body: JSON.stringify(pass),
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
        "Authorization": "Bearer " + token,
      }
    })
    .then(response => response.json())
    .then(result => {
      console.log(result);
      console.log("frissítve");
      alert("Bérlet sikeresen frissítve!");
      location.reload();
    })
    .catch(error => {
      console.log('Hiba! A frissítés sikertelen!');
      alert("Bérletedet nem sikerült frissíteni!");
      location.reload();
      console.log(error);
  });
}

