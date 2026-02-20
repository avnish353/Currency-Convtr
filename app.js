const BASE_URL="https://api.exconvert.com/convert?access_key=5b9e5043-f0e654d2-f41e29af-44ec36de";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector(" form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

for(let select of dropdowns){
for( currCode in countryList){
 let newOption = document.createElement("option");
 newOption.innerText = currCode;
 if(select.name == "from" && currCode == "USD"){
    newOption.selected = "selected";
 }else if(select.name == "to" && currCode == "INR"){
    newOption.selected = "selected";
 }
 newOption.value = currCode;
 select.append(newOption);
}
select.addEventListener("change",(evt) => {
  updateFlag(evt.target);
})
}

const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
};

btn.addEventListener("click", async (evt) => {
    evt.preventDefault();
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;
    if(amtVal == "" || amtVal < 1){
        amtVal = 1;
        amount.value = "1";
    }
    //console.log(fromCurr.value,toCurr.value)
    const URL = `${BASE_URL}&from=${fromCurr.value.toLowerCase()}&to=${toCurr.value.toLowerCase()}&amount=${amtVal}`;
    let response = await fetch(URL);
    let data = await response.json();
    let result = data["result"];
    let rate = result.rate;
    
    let finalAmount = amount.value*rate;
    msg.innerText = `${amtVal}${fromCurr.value} = ${finalAmount}${toCurr.value}`
   
});