   /* panorama canvas*/

let img = new Image();

// User Variables - customize these to change the image being scrolled, its
// direction, and the speed.

img.src = '../img/bkg/sumava-panorama.jpg';
let CanvasXSize = 3840;
let CanvasYSize = 1080;
let speed = 60; // lower is faster
let scale = 1.5;
let y = -0.5; // vertical offset

// Main program

let dx = 0.75;
let imgW;
let imgH;
let x = 0;
let clearX;
let clearY;
let ctx;

img.onload = function() {
    imgW = img.width * scale;
    imgH = img.height * scale;
    
    if (imgW > CanvasXSize) {
        // image larger than canvas
        x = CanvasXSize - imgW;
    }
    if (imgW > CanvasXSize) {
        // image width larger than canvas
        clearX = imgW;
    } else {
        clearX = CanvasXSize;
    }
    if (imgH > CanvasYSize) {
        // image height larger than canvas
        clearY = imgH;
    } else {
        clearY = CanvasYSize;
    }
    
    // get canvas context
    ctx = document.getElementById('canvas').getContext('2d');
 
    // set refresh rate
    return setInterval(draw, speed);
}

function draw() {
    ctx.clearRect(0, 0, clearX, clearY); // clear the canvas
    
    // if image is <= Canvas Size
    if (imgW <= CanvasXSize) {
        // reset, start from beginning
        if (x > CanvasXSize) {
            x = -imgW + x;
        }
        // draw additional image1
        if (x > 0) {
            ctx.drawImage(img, -imgW + x, y, imgW, imgH);
        }
        // draw additional image2
        if (x - imgW > 0) {
            ctx.drawImage(img, -imgW * 2 + x, y, imgW, imgH);
        }
    }

    // image is > Canvas Size
    else {
        // reset, start from beginning
        if (x > (CanvasXSize)) {
            x = CanvasXSize - imgW;
        }
        // draw aditional image
        if (x > (CanvasXSize-imgW)) {
            ctx.drawImage(img, x - imgW + 1, y, imgW, imgH);
        }
    }
    // draw image
    ctx.drawImage(img, x, y,imgW, imgH);
    // amount to move
    x += dx;
}

/*simple javascript slider*/
  let simplesliderImg = document.querySelectorAll('.imagediv'),
      arrowLeft = document.querySelector('#leftarrow'),
      arrowRight = document.querySelector('#rightarrow'),
      currentImg = 0;

  function initSlider() {
      resetSlider();

      simplesliderImg[0].style.display = 'grid';
  }

  function resetSlider() {
      for (let i = 0; i < simplesliderImg.length; i++) {
          simplesliderImg[i].style.display = 'none';
      }
  }

  function toLeft() {
      resetSlider();
      simplesliderImg[currentImg - 1].style.display = 'grid';
      currentImg--;
  }

  function toRight() {
      resetSlider();
      simplesliderImg[currentImg + 1].style.display = 'grid';
      currentImg++;
  }

  arrowLeft.addEventListener('click', function () {
      if (currentImg === 0) {
          currentImg = simplesliderImg.length;
      }

      toLeft();
  });

  arrowRight.addEventListener('click', function () {
      if (currentImg === simplesliderImg.length - 1) {
          currentImg = -1;
      }

      toRight();
  });

  initSlider();

  let string = "Bikers travel through the Winecountry! ";
let str = string.split("");
let el = document.getElementById('str');
(function animate() {
let running = setTimeout(animate, 100);
str.length > 0 ? el.innerHTML += str.shift() : clearTimeout(running); 
})();