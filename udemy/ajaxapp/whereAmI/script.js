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
  const whereAmI = async function () {
    try {
      // Geolocation
      const pos = await getPosition();
      const { latitude: lat, longitude: lng } = pos.coords;

      // Reverse geocoding
      const resGeo = await fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
      if (!resGeo.ok) {
        throw new Error(`Problem getting location data`);
      }

      const dataGeo = await resGeo.json();

      // Country data
      const res = await fetch(`https://restcountries.com/v2/name/${dataGeo.country}`);

      if (!res.ok) {
        throw new Error(`Problem getting country`);
      }

      const data = await res.json();
      renderCountry(data[0]);
    } catch (err) {
      console.error(`Somethins went wrong 💥 (${err.message})`);
    }
  };
  whereAmI();
}

{
  const getJSON = function (url, errorMessage = "Something went wrong") {
    return fetch(url).then((response) => {
      if (!response.ok) throw new Error(`${errorMessage} (${response.status})`);
      return response.json();
    });
  };

  const get3Countries = async function (c1, c2, c3) {
    try {
      // const data1 = await getJSON(`https://restcountries.com/v2/name/${c1}`);
      // const data2 = await getJSON(`https://restcountries.com/v2/name/${c2}`);
      // const data3 = await getJSON(`https://restcountries.com/v2/name/${c3}`);

      const data = await Promise.all([getJSON(`https://restcountries.com/v2/name/${c1}`), getJSON(`https://restcountries.com/v2/name/${c2}`), getJSON(`https://restcountries.com/v2/name/${c3}`)]);

      renderCountry(data[0][0]);
      renderCountry(data[1][0]);
      renderCountry(data[2][0]);
      countriesContainer.style.opacity = 1;
    } catch (err) {
      console.error(err);
    }
  };

  get3Countries("japan", "usa", "canada");
}
