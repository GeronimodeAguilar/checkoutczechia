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
  window.scrollTo(0,0); 
}

/*scroll to bottom*/

document.querySelector('.down-arrow').onclick = function () {
  window.scrollTo(0,600); 
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

/*arrow carussel*/
  const slideSpeed = 1;
  const enableAutoSlide = true;
  const autoSlideRate = 5000;
  const imageFitPercentage = 100;

  let sliders;
  let images = [];
  let currentSlide = 0;
  
  initSlider();

  function initSlider() {
    sliders = document.getElementsByClassName('carousel-slideshow');
    for(var i = 0; i < sliders.length; i++)
      buildSlider(sliders[i]);
  }
  function buildSlider(slider) {
    var imgSrc = [];
    stashImageSources(slider.children, imgSrc);
    slider.innerHTML = '';
    addArrows(slider);
    createInitSlide(slider, imgSrc[0]);
    loadStoredImages(imgSrc);
  }
  function stashImageSources(images, imgSrc) {
    for(var i = 0; i < images.length; i++) {
      imgSrc.push(images[i].src);
      images[i].src = '';
    }
  }
  function addArrows(slider) {
    addClassDiv(slider, 'slider-arrow-box-left');
    addClassDiv(slider, 'slider-arrow-box-right');
    addClassDiv(slider.children[0], 'left-slider-arrow');
    addClassDiv(slider.children[1], 'right-slider-arrow');
    addPrevListener(slider);
    addNextListener(slider);
    if(enableAutoSlide) startAutoSlide(slider);
  }
  function addClassDiv(parent, className) {
    var div = document.createElement('div');
    addClass(div, className);
    parent.appendChild(div);
  }
  function addClass(element, className) {
    var classes = element.className.split(' ');
    if(classes.indexOf(className) == -1)
      element.className += ' ' + className;
  }
  function addPrevListener(slider) {
    slider.children[0].onmousedown = function() {
      if(!slider.animRunning) prevSlide(slider);
    };
  }
  function addNextListener(slider) {
    slider.children[1].onmousedown = function() {
      if(!slider.animRunning) nextSlide(slider);
    };
  }
  function createInitSlide(slider, src) {
    var initSlide = createSlide(slider, src);
    slider.appendChild(initSlide);
    fitImageToSlider(initSlide, slider);
  }
  function createSlide(slider, src) {
    var slide = document.createElement('img');
    slide.setAttribute('src', src);
    addClass(slide, 'slide');
    return slide;
  }
  function fitImageToSlider(slide, slider) {
    slide.style.height = imageFitPercentage + '%';
    if(slide.clientWidth >= slider.clientWidth) {
      slide.style.width = imageFitPercentage + 'vw';
      slide.style.height = '  initSlider();';
    }
   }
  function loadStoredImages(imgSrc) {
    for(var i = 0; i < imgSrc.length; i++) {
      images[i] = new Image;
      images[i].src = imgSrc[i];
    }
  }
  function nextSlide(slider) {
    if(enableAutoSlide) resetAutoSlide(slider);
    currentSlide = carouselIncrement(currentSlide, 0, images.length-1);
    var nextSrc = images[currentSlide].src;
    var nextSlide = createSlide(slider, nextSrc);
    nextSlide.style.position = 'absolute';
    nextSlide.style.left = '100%';
    slider.appendChild(nextSlide);
    fitImageToSlider(nextSlide, slider);
    slideToNext(slider);
  }
  function resetAutoSlide(slider) {
    if(slider.autoSlideTimer != undefined)
      clearTimeout(slider.autoSlideTimer);
    startAutoSlide(slider);
  }
  function startAutoSlide(slider) {
    slider.autoSlideTimer = setTimeout(function() {
      if(!slider.animRunning) nextSlide(slider);
    }, autoSlideRate);
  }
  function carouselIncrement(variable, min, max) {
    if(variable + 1 > max) return min;
    else return ++variable;
  }
  function slideToNext(slider) {
    var oldSlide = slider.children[2];
    var newSlide = slider.children[3];
    startNextSlideAnimation(slider, oldSlide, newSlide);
  }
  function startNextSlideAnimation(slider, oldSlide, newSlide) {
    slider.animRunning = true;
    var newSlidePos = getPxStyle(newSlide, 'left');
    var delta = Math.floor(newSlidePos * slideSpeed);
    if(delta < 4) delta = 4;
    oldSlide.style.left = getPxStyle(oldSlide, 'left') - delta + 'px';
    newSlide.style.left = newSlidePos - delta + 'px';
    if(getPxStyle(newSlide, 'left') <= 0)
      endNextSlideAnimation(slider, oldSlide, newSlide);
    else window.requestAnimationFrame(function() {
      startNextSlideAnimation(slider, oldSlide, newSlide);
    });
  }
  function getPxStyle(element, style) {
    var style = window.getComputedStyle(element).getPropertyValue(style);
    return parseInt(style.substring(0, style.length - 2));
  }
  function endNextSlideAnimation(slider, oldSlide, newSlide) {
    newSlide.style.left = 0 + 'px';
    slider.removeChild(oldSlide);
    newSlide.style.position = 'relative';
    slider.animRunning = false;
  }
  function prevSlide(slider) {
    currentSlide = carouselDecrement(currentSlide, 0, images.length-1);
    var prevSrc = images[currentSlide].src;
    var prevSlide = createSlide(slider, prevSrc);
    prevSlide.style.position = 'absolute';
    prevSlide.style.left = '-100%';
    slider.appendChild(prevSlide);
    fitImageToSlider(prevSlide, slider);
    slideToPrev(slider);
  }
  function carouselDecrement(variable, min, max) {
    if(variable - 1 < min) return max;
    else return --variable;
  }
  function slideToPrev(slider) {
    var oldSlide = slider.children[2];
    var newSlide = slider.children[3];
    startPrevSlideAnimation(slider, oldSlide, newSlide);
  }
  function startPrevSlideAnimation(slider, oldSlide, newSlide) {
    slider.animRunning = true;
    var newSlidePos = getPxStyle(newSlide, 'left');
    var delta = -Math.floor(newSlidePos * slideSpeed);
    if(delta < 4) delta = 4;
    oldSlide.style.left = getPxStyle(oldSlide, 'left') + delta + 'px';
    newSlide.style.left = newSlidePos + delta + 'px';
    if(getPxStyle(newSlide, 'left') >= 0)
      endNextSlideAnimation(slider, oldSlide, newSlide);
    else window.requestAnimationFrame(function() {
      startPrevSlideAnimation(slider, oldSlide, newSlide);
    });
  }
  function endPrevSlideAnimation(slider, oldSlide, newSlide) {
    newSlide.style.left = 0 + 'px';
    slider.removeChild(oldSlide);
    newSlide.style.position = 'relative';
    slider.animRunning = false;
  }

  window.onresize = function() {
    sliders = document.getElementsByClassName('carousel-slideshow');
    for(var i = 0; i < sliders.length; i++) {
      var slide = sliders[i].children[2];
      fitImageToSlider(slide, sliders[i]);
    }
  };

