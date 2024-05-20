import { Loupe } from "./Loupe.js";

function loadImage(src) {
  return new Promise((resolve) => {
    const image = new Image();
    image.onload = function () {
      resolve(image);
    };
    image.src = src;
  });
}

const windowOnLoad = async () => {
  const currentUrl = new URL(window.location.href);
  const searchParams = new URLSearchParams(currentUrl.search);
  const currentBackImageUrl = searchParams.get("back_image");
  const currentFrontImageUrl = searchParams.get("front_image");

  if (!currentFrontImageUrl || !currentBackImageUrl) return;

  document.getElementById("back-image-url").value = currentBackImageUrl;
  document.getElementById("front-image-url").value = currentFrontImageUrl;
  document.getElementById("current-url").value = currentUrl.toString();

  await playLoupe(currentBackImageUrl, currentFrontImageUrl);
};

const loadButtonOnClicked = async () => {
  const backImageUrl = document.getElementById("back-image-url").value;
  const frontImageUrl = document.getElementById("front-image-url").value;

  const currentUrl = new URL(window.location.href);
  const searchParams = new URLSearchParams(currentUrl.search);

  searchParams.set("front_image", frontImageUrl);
  searchParams.set("back_image", backImageUrl);
  currentUrl.search = searchParams.toString();

  window.history.pushState({}, "", currentUrl.toString());
  document.getElementById("current-url").value = currentUrl.toString();

  await playLoupe(backImageUrl, frontImageUrl);
};

const playLoupe = async (backImageUrl, frontImageUrl) => {
  const canvas = document.getElementById("canvas");
  const backImageLoaded = loadImage(backImageUrl);
  const frontImageLoaded = loadImage(frontImageUrl);
  const images = await Promise.all([backImageLoaded, frontImageLoaded]);
  const [backImage, frontImage] = images;

  const loupeConfig = {
    canvas: canvas,
    canvasWidth: backImage.width,
    canvasHeight: backImage.height,
    backImage: backImage,
    frontImage: frontImage,
  };

  const loupe = new Loupe(loupeConfig);
  loupe.play();
};

document.addEventListener("DOMContentLoaded", windowOnLoad);
document.getElementById("load").addEventListener("click", loadButtonOnClicked);
