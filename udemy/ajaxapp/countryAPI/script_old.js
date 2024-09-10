"use strict";

const btn = document.querySelector(".btn-country");
const countriesContainer = document.querySelector(".countries");

///////////////////////////////////////

/**
 * XML HTTPリクエスト
 * OLD way
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
    countriesContainer.style.opacity = 1;
  };

  const getCountryDate = function (country) {
    const request = new XMLHttpRequest();
    request.open("GET", `https://restcountries.com/v2/name/${country}`);
    request.send();

    request.addEventListener("load", function () {
      const [data] = JSON.parse(this.responseText);

      renderCountry(data);
    });
  };

  const getCountryAndNeighborDate = function (country) {
    // AJAX call country 1
    const request = new XMLHttpRequest();
    request.open("GET", `https://restcountries.com/v2/name/${country}`);
    request.send();

    request.addEventListener("load", function () {
      const [data] = JSON.parse(this.responseText);

      renderCountry(data);

      // Get neighbour country 2
      const neighbour = data.borders?.[0];

      if (!neighbour) return;

      // AJAX call country 2
      const requestNeighbour = new XMLHttpRequest();
      requestNeighbour.open("GET", `https://restcountries.com/v2/alpha/${neighbour}`);
      requestNeighbour.send();

      requestNeighbour.addEventListener("load", function () {
        const data = JSON.parse(this.responseText);

        console.log(data);

        renderCountry(data, "neighbour");
      });
    });
  };

  //   getCountryDate("japan");
  //   getCountryDate("usa");
  //   getCountryDate("germany");

  getCountryAndNeighborDate("usa");
}
