"use strict";

const btn = document.querySelector(".btn-country");
const countriesContainer = document.querySelector(".countries");

///////////////////////////////////////

const renderCountry = function (data) {
  const html = `
      <article class="country">
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

const getPosition = function () {
  return new Promise(function (resolve, reject) {
    // navigator.geolocation.getCurrentPosition(
    //   (position) => console.log(position),
    //   (err) => console.error(err)
    // );
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

{
  const whereAmI = function () {
    getPosition()
      .then((pos) => {
        const { latitude: lat, longitude: lng } = pos.coords;
        return fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
      })
      .then((request) => {
        if (!request.ok) throw new Error(`Problem with geocoding ${request.status}`);
        return request.json();
      })
      .then((data) => {
        console.log(`You are in ${data.city}, ${data.country}`);

        return fetch(`https://restcountries.com/v2/name/${data.country}`);
      })
      .then((request) => {
        if (!request.ok) throw new Error(`Problem with geocoding ${request.status}`);
        return request.json();
      })
      .then((data) => renderCountry(data[0]))
      .catch((err) => {
        console.error(err.message);
      })
      .finally(() => {
        countriesContainer.style.opacity = 1;
      });
  };

  btn.addEventListener("click", whereAmI);
}

{
  const whereAmI = async function (country) {
    await fetch(`https://restcountries.com/v2/name/${country}`);
  };
}
