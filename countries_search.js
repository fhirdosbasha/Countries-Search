let searchInputElem = document.getElementById("searchInput");
let resultCountries = document.getElementById("resultCountries");
let loadingElem = document.getElementById("spinner");
let countriesList = [];
let searchInput;

function createCountryCardAndDisplay(country){
    console.log(country);
    let { name, flag, population } = country;
    let countryContainer = document.createElement("div");
    countryContainer.classList.add("country-card", "col-11", "col-md-5", "mr-auto", "d-flex", "flex-row");
    
    let flagElem = document.createElement("img");
    flagElem.src = flag;
    flagElem.classList.add("country-flag", "mt-auto", "mb-auto");
    countryContainer.appendChild(flagElem);
    
    let countryInfoContainer = document.createElement("div");
    countryInfoContainer.classList.add("d-flex", "flex-column", "ml-4");
    countryContainer.appendChild(countryInfoContainer);
    
    let countryNameEle = document.createElement("h1");
    countryNameEle.textContent = name;
    countryNameEle.classList.add("country-name");
    countryInfoContainer.appendChild(countryNameEle);
    
    let countryPopulationEle = document.createElement("p");
    countryPopulationEle.textContent = population;
    countryPopulationEle.classList.add("country-population");
    countryInfoContainer.appendChild(countryPopulationEle);
    
    resultCountries.appendChild(countryContainer);
}

function displayCountries(countriesList){
    for(let country of countriesList){
        createCountryCardAndDisplay(country);
    }
}

loadingElem.classList.toggle("d-none");
fetch("https://apis.ccbp.in/countries-data")
.then(function(response){
    return response.json();
})
.then(function(jsonData){
    countriesList = jsonData;
    loadingElem.classList.toggle("d-none");
    displayCountries(countriesList);
});

function displaySearchResults(){
    resultCountries.textContent = "";
    for(let country of countriesList){
        if(country.name.includes(searchInput)){
            createCountryCardAndDisplay(country);
        }
    }
}

function filterCountriesList(){
    searchInput = searchInputElem.value;
    displaySearchResults();
}

searchInputElem.addEventListener("keyup", filterCountriesList);