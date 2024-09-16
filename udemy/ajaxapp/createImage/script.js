"use strict";

{
  const container = document.querySelector(".images");

  const createImage = function (imgPath) {
    return new Promise(function (resolve, reject) {
      const img = document.createElement("img");
      img.src = imgPath;

      img.addEventListener("load", function () {
        console.log(container);
        container.append(img);
        resolve(img);
      });

      img.addEventListener("error", function () {
        reject(new Error("image not found"));
      });
    });
  };

  const wait = function (second) {
    return new Promise(function (resolve) {
      setTimeout(resolve, second * 1000);
    });
  };

  let currentImage;
  /*
  createImage("img/img-1.jpg")
    .then((img) => {
      currentImage = img;

      return wait(2);
    })
    .then(() => {
      currentImage.style.display = "none";
      return createImage("img/img-2.jpg");
    })
    .then((img) => {
      currentImage = img;

      return wait(2);
    })
    .then(() => {
      currentImage.style.display = "none";
      return createImage("img/img-3.jpg");
    })
    .error((err) => {
      console.error(err.message);
    });
    */

  const loadNPause = async function () {
    try {
      let img = await createImage("img/img-1.jpg");
      await wait(2);
      img.style.display = "none";

      img = await createImage("img/img-2.jpg");
      await wait(2);
      img.style.display = "none";

      img = await createImage("img/img-3.jpg");
      await wait(2);
      img.style.display = "none";
    } catch (err) {
      console.error(err.message);
    }
  };

  // loadNPause();

  const imgArr = ["img/img-1.jpg", "img/img-2.jpg", "img/img-3.jpg"];

  const loadAll = async function (imgArr) {
    try {
      const imgs = await Promise.all(imgArr.map(async (img) => await createImage(img)));
      imgs.forEach((img) => img.classList.add("parallel"));
      console.log(imgs);
    } catch (err) {
      console.error(err.message);
    }
  };

  loadAll(imgArr);
}
