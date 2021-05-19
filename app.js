const input = document.querySelector('input');
const btn = document.querySelector('button');
const count = document.querySelector('#cnt_daily');
const actD = document.querySelector('#act_daily');
const recD = document.querySelector('#rec_daily');
const dated = document.querySelector('#dated');
const li = document.querySelectorAll('li');
const ul = document.querySelectorAll('ul');


async function getCases() {
    const url = `	https://api.covid19india.org/data.json `;
    const fetchedData = await axios.get(url, { mode: 'no-cors' });
    console.dir(fetchedData);
    // let size = fetchedData.data.cases_time_series.length;
    let total = fetchedData.data.statewise[0].deltaconfirmed;
    let recT = fetchedData.data.statewise[0].recovered;
    let recovered = fetchedData.data.statewise[0].deltarecovered;
    let date = fetchedData.data.statewise[0].lastupdatedtime;
    console.log(total);
    console.log(recT);
    console.log(recovered);
    count.innerHTML = `${total}`
    actD.innerHTML = `${recT}`
    recD.innerHTML = `${recovered}`;
    dated.innerHTML = `${date}`;
}

getCases();


btn.addEventListener('click', (e) => {
    e.preventDefault();
    console.log(input.value);
    var city = input.value;
    findCases(city);
    input.value = "";
})



input.addEventListener('keypress', function (e) {
    let cityName = input.value;
    if (e.keyCode === 13) {
        findCases(cityName);
        input.value = "";
    }
})


async function findCases(city) {
    const url = `https://api.covid19india.org/data.json `;
    const fetchedData = await axios.get(url, { mode: 'no-cors' });
    let size = fetchedData.data.statewise.length;
    for (let i = 0; i < size - 1; i++) {
        if (city.toString().toLowerCase() == fetchedData.data.statewise[i].state.toLowerCase()) {
            let state = fetchedData.data.statewise[i].state;
            let totalL = fetchedData.data.statewise[i].deltaconfirmed;
            let recTL = fetchedData.data.statewise[i].recovered;
            let recoveredL = fetchedData.data.statewise[i].deltarecovered;
            let dateL = fetchedData.data.statewise[i].lastupdatedtime;
            li[0].innerHTML=`State: <span>${state}</span>`;
            li[1].innerHTML=`Cases Today: <span>${totalL}</span>`;
            li[2].innerHTML=`Recovered Today: <span>${recoveredL}</span>`;
            li[3].innerHTML=`Recovered Total: <span>${recTL}</span>`;
            li[4].innerHTML=`Last Updated : <span>${dateL}</span>`;
            ul[0].classList.add('sec');
            console.log(totalL);
            console.log(recTL);
            console.log(recoveredL);
            console.log(dateL);
        }
    }
}















// async function findCases(city) {
//     await fetch(`https://covid-19.dataflowkit.com/v1/${city}`,{ mode: 'no-cors'})
//     .then((response) => {
//         console.dir(response);
//         return response.json();
//     }).then((data)=>{
//         console.dir(data);
//     })
//     .catch((e)=>{
//         console.log(e.message);
//         console.log(e);
//     })
// }

