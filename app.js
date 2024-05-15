const BASE_URL="https://api.currencyapi.com/v3/latest?apikey=cur_live_zYUyyWI6m3QwxgfaGzzV3QY27u3z3GmMf4uqnqEa";


const dropdowns=document.querySelectorAll(".dropdown select");
const btn=document.querySelector("form button");
const fromCurr=document.querySelector(".from select");
const toCurr=document.querySelector(".to select");
const msg=document.querySelector(".msg");
const icon=document.querySelector("i");
const fromImg=document.querySelector(".from img");
const toImg=document.querySelector(".to img");


for(let select of dropdowns){
    for(currCode in countryList){
        let newOption=document.createElement("option");
        newOption.innerText=currCode;
        newOption.value=currCode;
        if(select.name=="from" && currCode=="USD"){
            newOption.selected="selected";
        }
        else if(select.name=="to" && currCode=="INR"){
            newOption.selected="selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change",(evt)=>{
        updateFlage(evt.target);
        
    })
}

const updateFlage=(ele)=>{
   let currCode=ele.value;//INR USD
   let countryCode=countryList[currCode];//IN US
   let newSrc=`https://flagsapi.com/${countryCode}/flat/64.png`
   let img=ele.parentElement.querySelector("img");
   img.src=newSrc;
}

btn.addEventListener("click",async (evt)=>{
    evt.preventDefault();
   let amount=document.querySelector(".amount input");
   let amountVal=amount.value;
   if(amountVal===""||amountVal<1){
    amountVal=1;
    amount.value="1";
   }
//    const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
     let from=fromCurr.value;
     let to=toCurr.value;
   let response = await fetch(BASE_URL);
   let result = await response.json();  // usd->inr    inr/usd
   let ans =(result.data[to].value/result.data[from].value)*amountVal;
   //1usd= 80 inr
   msg.innerText=`${amountVal} ${from} = ${ans} ${to}`;
})

icon.addEventListener("click",()=>{
    let fromIndex=fromCurr.selectedIndex;
    let toIndex=toCurr.selectedIndex;

    let fromCode=countryList[fromCurr[fromIndex].innerText];
    let toCode=countryList[toCurr[toIndex].innerText];

    let tempText=fromCurr[fromIndex].innerText;//USD
    let tempVlaue=fromCurr[fromIndex].value;
  

    fromCurr[fromIndex].innerText=toCurr[toIndex].innerText;
    fromCurr[fromIndex].value=toCurr[toIndex].value;

    toCurr[toIndex].innerText=tempText;
    toCurr[toIndex].value=tempVlaue;
   
     fromImg.src=`https://flagsapi.com/${toCode}/flat/64.png`
     toImg.src=`https://flagsapi.com/${fromCode}/flat/64.png`


})