import './css/styles.css';
import countryCard from './templates/country_card.hbs';

const refs = {
    cardContainer: document.querySelector(`.country-info`)
}

const DEBOUNCE_DELAY = 300;

fetchCountries().then(rendercountryCard).catch(error => console.log(error))

function fetchCountries(name) {
    return fetch('https://restcountries.com/v3.1/name/${name}')
        .then(response => {
            return response.json();
        });
};




function rendercountryCard(country) {
    const markup = countryCard(country);
    refs.cardContainer.innerHTML = markup;
}
