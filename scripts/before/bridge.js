window.onload = function() {
    let mainelement = document.createElement("script");
    mainelement.src = "../scripts/before/main.js";
    document.body.appendChild(mainelement);
    loaderbox.hidden = true;   
    var elements = document.getElementsByClassName('txt-rotate');
for (var i=0; i<elements.length; i++) {
var toRotate = elements[i].getAttribute('data-rotate');
var period = elements[i].getAttribute('data-period');
if (toRotate) {
new TxtRotate(elements[i], JSON.parse(toRotate), period);
}
}
}

       /* panorama canvas*/

       let img = new Image();

       // User Variables - customize these to change the image being scrolled, its
       // direction, and the speed.
       
       img.src = '../img/bkg/charles-bridge-vltava1080.jpg';
       let CanvasXSize = 4055;
       let CanvasYSize = 1080;
       let speed = 50; // lower is faster
       let scale = 1.1;
       let y = -4.5; // vertical offset
       
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
       
       /* Typing carussel*/
       
           var TxtRotate = function(el, toRotate, period) {
         this.toRotate = toRotate;
         this.el = el;
         this.loopNum = 0;
         this.period = parseInt(period, 10) || 2000;
         this.txt = '';
         this.tick();
         this.isDeleting = false;
       };
       
       TxtRotate.prototype.tick = function() {
         var i = this.loopNum % this.toRotate.length;
         var fullTxt = this.toRotate[i];
       
         if (this.isDeleting) {
           this.txt = fullTxt.substring(0, this.txt.length - 1);
         } else {
           this.txt = fullTxt.substring(0, this.txt.length + 1);
         }
       
         this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';
       
         var that = this;
         var delta = 300 - Math.random() * 100;
       
         if (this.isDeleting) { delta /= 2; }
       
         if (!this.isDeleting && this.txt === fullTxt) {
           delta = this.period;
           this.isDeleting = true;
         } else if (this.isDeleting && this.txt === '') {
           this.isDeleting = false;
           this.loopNum++;
           delta = 1000;
         }
       
         setTimeout(function() {
           that.tick();
         }, delta);
       };