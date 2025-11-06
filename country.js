// =================== Mode Toggle ===================
let changeMode = document.querySelector(".changemode");
changeMode.addEventListener("click", () => {
    let modeText = document.querySelector(".changemode > span");
    if (document.body.classList.contains("light")) {
        document.body.classList.remove("light");
        document.body.classList.add("dark");
        modeText.innerHTML = "Light Mode";
    } else {
        document.body.classList.remove("dark");
        document.body.classList.add("light");
        modeText.innerHTML = "Dark Mode";
    }
});

// =================== Fetch Country Info ===================
const parsedUrl = new URL(window.location);
let country = parsedUrl.searchParams.get("country");

let countryname = document.querySelector(".region-name");
let flagImage = document.querySelector(".more-info-image");
let nativeName = document.querySelector(".nativeName");
let populationNumber = document.querySelector(".populationNumber");
let regionName = document.querySelector(".regionName");
let subRegion = document.querySelector(".subRegion");
let capitalName = document.querySelector(".capitalName");
let levelDomain = document.querySelector(".levelDomain");
let currencies = document.querySelector(".currencies");
let languages = document.querySelector(".languagues");

// Set the page title dynamically
countryname.innerHTML = country;

// Fetch country details
const fetchCountryData = async () => {
    try {
        const res = await fetch(`https://restcountries.com/v3.1/name/${country}?fullText=true`);
        const data = await res.json();
        const info = data[0];

        // Update flag and info
        flagImage.src = info.flags.svg;
        nativeName.innerHTML = Object.values(info.name.nativeName || {})[0]?.common || info.name.common;
        populationNumber.innerHTML = info.population.toLocaleString();
        regionName.innerHTML = info.region;
        subRegion.innerHTML = info.subregion || "N/A";
        capitalName.innerHTML = info.capital ? info.capital[0] : "N/A";
        levelDomain.innerHTML = info.tld ? info.tld.join(", ") : "N/A";
        currencies.innerHTML = info.currencies
            ? Object.values(info.currencies).map(c => c.name).join(", ")
            : "N/A";
        languages.innerHTML = info.languages
            ? Object.values(info.languages).join(", ")
            : "N/A";

    } catch (error) {
        console.error("Error fetching country data:", error);
        countryname.innerHTML = "Country not found!";
    }
};

window.addEventListener("load", fetchCountryData);
