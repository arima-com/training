{
  const container = document.querySelector(".js-addCountryInfo");

  const timeout = function (sec) {
    return new Promise((_, reject) => {
      setTimeout(() => {
        reject(new Error("Request took too long !"));
      }, sec * 1000);
    });
  };

  const getJSON = async function (url, errorMessage = "Somethins wrong") {
    const res = await Promise.race([fetch(url), timeout(5)]);
    if (!res.ok) throw new Error(errorMessage);
    return res.json();
  };

  const renderCountry = function (data) {
    const html = `
    <div class="lp-card">
        <div class="lp-card-body">
            <div class="lp-card-titleGroup">
                <h2 class="lp-headingLevel2">${data.name.common}</h2>
            </div>
            <ul class="lp-list of-flex">
                <li>
                    <div class="lp-media">
                        <span class="material-symbols-rounded"> location_on </span>
                        <p class="lp-text">${data.capital[0]}</p>
                    </div>
                </li>
                <li>
                    <div class="lp-media">
                        <span class="material-symbols-rounded"> boy </span>
                        <p class="lp-text">${(data.population / 10000000).toFixed(1)} million people</p>
                    </div>
                </li>
                <li>
                    <div class="lp-media">
                        <span class="material-symbols-rounded"> voice_selection </span>
                        <p class="lp-text">${Object.values(data.languages).join(" / ")}</p>
                    </div>
                </li>
            </ul>
        </div>
        <div class="lp-card-imageGruop">
            <div class="lp-card-image">
                <img src="${data.flags.png}" alt="" />
            </div>
            <div class="lp-button-outer">
                <a href="${data.maps.googleMaps}" class="lp-button" target="_blank">
                <span class="material-symbols-rounded"> arrow_outward </span></a>
            </div>
        </div>
    </div>
    `;

    container.insertAdjacentHTML("beforeend", html);
    container.sytle.opacity = 1;
  };

  const getCurrentPoistion = function () {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  };

  const whereAmI = async function () {
    try {
      const pos = await getCurrentPoistion();
      const { latitude: lat, longitude: lng } = pos.coords;

      const dataGeo = await getJSON(`https://geocode.xyz/${lat},${lng}?geoit=json`);

      console.log(dataGeo);

      if (!dataGeo.country) throw new Error(`No data`);
      const data = await getJSON(`https://restcountries.com/v3.1/name/${dataGeo.country}`);

      renderCountry(data[0]);
    } catch (err) {
      console.error(`Something wrong (${err.message})`);
    }
  };

  const getCountry = async function (country) {
    try {
      const data = await getJSON(`https://restcountries.com/v3.1/name/${country}`);
      renderCountry(data[0]);
    } catch (err) {
      console.error(`Something wrong (${err.message})`);
    }
  };

  getCountry("france");
  getCountry("usa");
  //   getCountry("canada");

  whereAmI();
}
