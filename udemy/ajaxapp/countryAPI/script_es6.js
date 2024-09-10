"use strict";

const btn = document.querySelector(".btn-country");
const countriesContainer = document.querySelector(".countries");

///////////////////////////////////////

/**
 * XML HTTPリクエスト
 * ES6
 */

{
  const renderCountry = function (data, className = "") {
    const html = `
        <article class="country ${className}">
            <img class="country__img" src="${data.flag}" />
            <div class="country__data">
                <h3 class="country__name">${data.name}</h3>
                <h4 class="country__region">${data.region}</h4>
                <p class="country__row"><span>👫</span>${(+data.population / 1000000).toFixed(1)} people</p>
                <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
                <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
            </div>
        </article>
        `;
    countriesContainer.insertAdjacentHTML("beforeend", html);
  };

  const renderError = function (message) {
    countriesContainer.insertAdjacentText("beforeend", message);
  };

  const getJSON = function (url, errorMessage = "Something went wrong") {
    return fetch(url).then((response) => {
      if (!response.ok) throw new Error(`${errorMessage} (${response.status})`);
      return response.json();
    });
  };

  const getCountryDate = function (country) {
    getJSON(`https://restcountries.com/v2/name/${country}`).then((data) => renderCountry(data[0]));
  };

  const getCountryAndNeighborDate = function (country) {
    // Country 1
    getJSON(`https://restcountries.com/v2/name/${country}`, `Country not found`)
      .then((data) => {
        renderCountry(data[0]);

        const neighbour = data[0].borders?.[0];

        if (!neighbour) throw new Error("No neightbour found");

        // Country 2
        return getJSON(`https://restcountries.com/v2/alpha/${neighbour}`, `Country not found`);
      })
      .then((data) => renderCountry(data, "neighbour"))
      .catch((err) => {
        renderError(err.message);
        console.error(`${err} 💥💥💥`);
      })
      .finally(() => {
        countriesContainer.style.opacity = 1;
      });
  };

  btn.addEventListener("click", function () {
    getCountryAndNeighborDate("usa");
  });
}
