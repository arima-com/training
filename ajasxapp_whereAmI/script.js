"use strict";

const btn = document.querySelector(".btn-country");
const countriesContainer = document.querySelector(".countries");

///////////////////////////////////////

{
  const whereAmI = function (lat, lng) {
    fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`)
      .then((request) => {
        if (request.ok) throw new Error("Country no found");
        console.log(request);
        return request.json();
      })
      .then((data) => {
        console.log(`You are in ${data.region}, ${data.country}`);
      })
      .catch((err) => {
        console.error(err.message);
      });
  };

  whereAmI(52.508, 13.381);
  // whereAmI(19.037, 72.873);
  // whereAmI(-33.933, 18.474);
}
