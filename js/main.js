import { Loupe } from "./loupe.js";

const canvas = document.getElementById("canvas");
console.log("canvas", canvas);

function loadImage(src) {
  return new Promise((resolve) => {
    const image = new Image();
    image.onload = function () {
      resolve(image);
    };
    image.src = src;
  });
}

const backgroundLoaded = loadImage("assets/img/1.png");
const frontLoaded = loadImage("assets/img/2.png");

Promise.all([backgroundLoaded, frontLoaded]).then((images) => {
  const [backgroundImage, frontImage] = images;
  const loupe = new Loupe(canvas, backgroundImage, frontImage);
  loupe.play();
});
