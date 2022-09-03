import './css/styles.css';
import countryCard from './templates/country_card.hbs';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import { fetchCountries } from './fetchCountries';

const DEBOUNCE_DELAY = 300;

const cardContainer = document.querySelector(`.country-info`);
const serchForm = document.querySelector(`#search-box`);
const countriesList = document.querySelector('.country-list');


serchForm.addEventListener(`input`, debounce(onSerch, DEBOUNCE_DELAY));

function onSerch(e) {
    e.preventDefault();

    clearShownInfo();

    let inputValue = e.target.value.trim();

    if (inputValue !== '') {
         fetchCountries(inputValue)
           .then(rendercountryCard)
           .catch(onFetchError);
    };
};

function createCountriesList(countries) {

  const templateCountry = countries
    .map(({ name, capital, population, flags, languages }) => {
      return `<li class="country-item">
    <img width="40" height="30" src=${flags.svg} alt="Flag" class="image-flag">
    <span>${name.official}</span></li>`;
    })
    .join('');
  
  countriesList.insertAdjacentHTML('beforeend', templateCountry);

  if (countriesList.children.length === 1) {
    rendercountryCard(countries);
  } else if (countriesList.children.length > 10) {
    Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
  } else if (countriesList.children.length === 0) {
    clearShownInfo();
  };
};

function rendercountryCard(country) {
  const markup = countryCard(country);
  cardContainer.insertAdjacentHTML('beforeend', markup);
};

function clearShownInfo() {
  cardContainer.innerHTML = '';
  countriesList.innerHTML = '';
}

function onFetchError() {
    Notiflix.Notify.failure('Oops, there is no country with that name');
};