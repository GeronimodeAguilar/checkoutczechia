/* fixed nav*/

const nav = document.querySelector('#navbox');
const upButton = document.querySelector('.toTop');
const topOfNav = nav.offsetTop;
    
function fixNav() {
if(window.scrollY >= topOfNav) {
document.body.style.paddingTop = nav.offsetHeight + 'px';    
document.body.classList.add('fixed-nav');  
upButton.style.display = "block";  
} else {
document.body.style.paddingTop = 0;        
document.body.classList.remove('fixed-nav');    
upButton.style.display = "none";  
}   
}    
    
window.addEventListener('scroll', fixNav);  

/*dropdown background*/

const triggers = document.querySelectorAll('.submenu-box > li');
const background  = document.querySelector('.dropdownBackground');

function handleEnter() {
  this.classList.add('trigger-enter');
  setTimeout(() => this.classList.contains('trigger-enter') && this.classList.add('trigger-enter-active'), 150);
  background.classList.add('open');

  const dropdown = this.querySelector('.dropdown');
  const dropdownCoords = dropdown.getBoundingClientRect();
  const navCoords = nav.getBoundingClientRect();

  const coords = {
    height: dropdownCoords.height,
    width: dropdownCoords.width,
    top: dropdownCoords.top - navCoords.top,
    left: dropdownCoords.left - navCoords.left
  };

  background.style.setProperty('width', `${coords.width}px`);
  background.style.setProperty('height', `${coords.height}px`);
  background.style.setProperty('transform', `translate(${coords.left}px, ${coords.top}px)`);
}

function handleLeave() {
  this.classList.remove('trigger-enter', 'trigger-enter-active');
  background.classList.remove('open');
}

triggers.forEach(trigger => trigger.addEventListener('mouseenter', handleEnter));
triggers.forEach(trigger => trigger.addEventListener('mouseleave', handleLeave));

/*image slide in*/

function debounce(func, wait = 20, immediate = true) {
 let timeout;
  return function() {
   let context = this, args = arguments;
   let later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
   let callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

const sliderImages = document.querySelectorAll('.slide-in');
  
  function checkSlide(e) {
sliderImages.forEach(sliderImage => {
const slideInAt = (window.scrollY + window.innerHeight) - sliderImage.height / 3;
const imageBottom = sliderImage.offsetTop + sliderImage.height;
const isHalfShown = slideInAt > sliderImage.offsetTop;
const isNotScrolledPast = window.scrollY <imageBottom;
if(isHalfShown && isNotScrolledPast) {sliderImage.classList.add('active');
} else {
sliderImage.classList.remove('active');
}
})          
  }

window.addEventListener('scroll',debounce(checkSlide));

/*slide up box*/

let animateHTML = function () {
  let elems,
    windowHeight
  let init = function () {
    elems = document.getElementsByClassName('hidden')
    windowHeight = window.innerHeight
    _addEventHandlers()
  }
  let _addEventHandlers = function () {
    window.addEventListener('scroll', _checkPosition)
    window.addEventListener('resize', init)
  }
  let _checkPosition = function () {
    for (let i = 0; i < elems.length; i++) {
      let posFromTop = elems[i].getBoundingClientRect().top
      if (posFromTop - windowHeight <= 0) {
        elems[i].className = elems[i].className.replace('hidden', 'fade-in-element')
      }
    }
  }
  return {
    init: init
  }
}
animateHTML().init()

/*scroll to top*/

document.querySelector('.toTop').onclick = function () {
  scrollTo(document.body, 0, 1250); 
}

// Show an element
let show = function (elem) {

	// Get the natural height of the element
	let getHeight = function () {
		elem.style.display = 'block'; // Make it visible
		let height = elem.scrollHeight + 'px'; // Get it's height
		elem.style.display = ''; //  Hide it again
		return height;
	};

	let height = getHeight(); // Get the natural height
	elem.classList.add('is-visible'); // Make the element visible
	elem.style.height = height; // Update the max-height

	// Once the transition is complete, remove the inline max-height so the content can scale responsively
	window.setTimeout(function () {
		elem.style.height = '';
	}, 350);

};

// Hide an element
let hide = function (elem) {

	// Give the element a height to change from
	elem.style.height = elem.scrollHeight + 'px';

	// Set the height back to 0
	window.setTimeout(function () {
		elem.style.height = '0';
	}, 1);

	// When the transition is complete, hide it
	window.setTimeout(function () {
		elem.classList.remove('is-visible');
	}, 350);

};

// Toggle element visibility
let toggle = function (elem, timing) {

	// If the element is visible, hide it
	if (elem.classList.contains('is-visible')) {
		hide(elem);
		return;
	}

	// Otherwise, show it
	show(elem);
	
};

// Listen for click events
document.addEventListener('click', function (event) {

	// Make sure clicked element is our toggle
	if (!event.target.classList.contains('toggle')) return;

	// Prevent default link behavior
	event.preventDefault();

	// Get the content
	let content = document.querySelector(event.target.hash);
	if (!content) return;

	// Toggle the content
	toggle(content);

}, false);

/*menuicon change x */

const burger = document.getElementById('burger');

function changeBurger() {
if(burger.innerHTML === '×') {
  burger.innerHTML = '☰';
  } else { 
burger.innerHTML = '×';
}
}

burger.addEventListener('click', changeBurger);

/*textshadow*/

const hero = document.querySelector('header');
const text = hero.querySelector('.header-title');
const walk = 4;
    
function shadow(e) {
const width = hero.offsetWidth;  
const height = hero.offsetHeight;  
let x = e.offsetX;
let y = e.offsetY;    

    if(this !== e.target) {
x = x + e.target.offsetLeft;
y = y + e.target.offsetTop;        
    }
    
const xWalk = Math.round((x / width * walk) - (walk/2));
const yWalk =  Math.round((y / height * walk) - (walk/2));     
text.style.textShadow = `
${xWalk}px ${yWalk}px 0 hsla(211, 76%, 28%,1),
${yWalk}px ${xWalk * -1}px 0 rgba(255,255,255,255)
`;
}    
    
hero.addEventListener('mousemove', shadow);    

/*slider*/
let current = 0,
    slides = document.querySelectorAll(".sliderimg");

setInterval(function() {
  for (let i = 0; i < slides.length; i++) {
    slides[i].style.opacity = 0;
    slides[i].style.width 
  }
  current = (current != slides.length - 1) ? current + 1 : 0;
  slides[current].style.opacity = 1;
}, 2000);

/* panorama canvas*/

let img = new Image();

// User Variables - customize these to change the image being scrolled, its
// direction, and the speed.

img.src = '../img/bkg/sumava-panorama.jpg';
let CanvasXSize = 2700;
let CanvasYSize = 720;
let speed = 60; // lower is faster
let scale = 1.05;
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
