export class Loupe {
  constructor(canvas, backgroundImage, frontImage) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.backgroundImage = backgroundImage;
    this.frontImage = frontImage;

    this.mouseX = 0;
    this.mouseY = 0;

    this.canvas.addEventListener("mousemove", (e) => {
      const rect = this.canvas.getBoundingClientRect();
      this.mouseX = e.clientX - rect.left;
      this.mouseY = e.clientY - rect.top;
    });
  }

  draw = () => {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.fillStyle = "gray";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.drawImage(this.backgroundImage, 0, 0);

    this.ctx.save();
    this.ctx.beginPath();
    this.ctx.rect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.arc(this.mouseX, this.mouseY, 50, 0, Math.PI * 2, true);
    this.ctx.clip();
    this.ctx.drawImage(this.frontImage, 0, 0);
    this.ctx.restore();

    this.animationId = requestAnimationFrame(this.draw);
  };

  play = () => {
    this.animationId = requestAnimationFrame(this.draw);
  };

  stop = () => {
    cancelAnimationFrame(this.animationId);
  };
}
