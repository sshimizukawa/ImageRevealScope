// canvas要素を取得
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const backgroundImage = new Image();
const frontImage = new Image();
let animationId;

backgroundImage.src = "assets/img/1.png";
frontImage.src = "assets/img/2.png";

const backgroundLoaded = new Promise((resolve) => {
  backgroundImage.onload = function () {
    resolve();
    console.log("backgroundImage");
  };
  backgroundImage.src = "assets/img/1.png";
});

const frontLoaded = new Promise((resolve) => {
  frontImage.onload = function () {
    resolve();
    console.log("frontImage");
  };
  frontImage.src = "assets/img/2.png";
});

Promise.all([backgroundLoaded, frontLoaded]).then(() => {
  animationId = requestAnimationFrame(draw);
  console.log("Promise.all");
});

let mouseX = 0;
let mouseY = 0;

mouseX = 250;
mouseY = 250;

canvas.addEventListener("mousemove", function (e) {
  const rect = canvas.getBoundingClientRect();
  mouseX = e.clientX - rect.left;
  mouseY = e.clientY - rect.top;
});

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "gray";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.drawImage(backgroundImage, 0, 0);

  // 穴の空いたfrontImageを描画。
  ctx.save();
  ctx.beginPath();
  ctx.rect(0, 0, canvas.width, canvas.height);
  ctx.arc(mouseX, mouseY, 50, 0, Math.PI * 2, true);
  ctx.clip();
  ctx.drawImage(frontImage, 0, 0);
  ctx.restore();

  animationId = requestAnimationFrame(draw);
}
