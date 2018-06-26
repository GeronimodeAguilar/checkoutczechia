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
const slideInAt = (window.scrollY + window.innerHeight) - sliderImage.height / 4;
const imageBottom = sliderImage.offsetTop + sliderImage.height;
const isHalfShown = slideInAt > sliderImage.offsetTop;
const isNotScrolledPast = window.scrollY <imageBottom;
if(isHalfShown && isNotScrolledPast) {sliderImage.classList.add('active');
} else {
sliderImage.classList.remove('active');
}
})          
  }
/* slide in on mouseover*/

window.addEventListener('scroll',debounce(checkSlide));
for(pictureItem of sliderImages) {
function imgOnMouseEnter(e) {
  e.target.classList.add('active');
  pictureItem.removeEventListener('mouseover', imgOnMouseEnter);
}  
pictureItem.addEventListener('mouseover', imgOnMouseEnter);
}
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
    window.addEventListener('scroll', _checkPosition);
    window.addEventListener('resize', init);
    for( item of elems) { 
    item.addEventListener('mouseover', _checkPosition );
    } 
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

/*sequential image reveal*/

let revealImages = function () {
  let imgElements;
  let  revealBoxHeight;
  let revealPicInit = function () {
    imgElements = document.querySelectorAll('.reveal-img-box')
    revealBoxHeight = window.innerHeight
    _addRevealHandlers()
  }
    const _addRevealHandlers = function () {
    window.addEventListener('scroll', _checkRevealPosition)
    window.addEventListener('resize', revealPicInit)
  }
  const _checkRevealPosition = function () {
    for (let i = 0; i < imgElements.length; i++) {
      let fromTop = imgElements[i].getBoundingClientRect().top
      if (fromTop - revealBoxHeight <= 0) {
 let revealItems = document.querySelectorAll(".reveal-img-box img"), revealTime = 1;
  Array.prototype.forEach.call(revealItems, function(revealItem) { 
	setTimeout(function(){ revealItem.classList.add("img-visible") }, 100 * revealTime)
	revealTime++;
})
      }
    }
  }
  return {
    revealPicInit: revealPicInit
  }
}
revealImages().revealPicInit()

/*scroll to top*/

document.querySelector('.toTop').onclick = function () {
  window.scrollTo(0,0); 
}

/*scroll to bottom*/

document.querySelector('.down-arrow').onclick = function () {
  window.scrollTo(0,600); 
}

/*simple javascript accordion*/

const items = document.querySelectorAll(".accordionbox a");
    
function toggleAccordion(){
  this.classList.toggle('active');
  this.nextElementSibling.classList.toggle('active');
}

items.forEach(item => item.addEventListener('click', toggleAccordion));

/*javascript accordion*/

let accItem = document.getElementsByClassName('accordionItem');
let accHD = document.getElementsByClassName('accordionItemHeading');
for (i = 0; i < accHD.length; i++) {
    accHD[i].addEventListener('click', toggleItem, false);
}
function toggleItem() {
    let itemClass = this.parentNode.className;
    for (i = 0; i < accItem.length; i++) {
        accItem[i].className = 'accordionItem close-accord';
    }
    if (itemClass == 'accordionItem close-accord') {
        this.parentNode.className = 'accordionItem open-acccord';
    }
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

/*simple ripple effect*/

document.body.addEventListener("mousedown", function(event) {
  let target = event.target;
  while (target) {
    
    if (!target.classList || !target.classList.contains("ripple")) {
      
      target = target.parentNode;
    }
    else {
      
      break;
    }
  }
    
  if (target && target.classList.contains("ripple")) {
    
      // Get necessary variables
      let rect        = target.getBoundingClientRect(),
          left        = rect.left,
          top         = rect.top,
          width       = target.offsetWidth,
          height      = target.offsetHeight,
          offsetTop   = target.offsetTop, 
          offsetLeft  = target.offsetLeft, 
          dx          = event.clientX - left,
          dy          = event.clientY - top,
          maxX        = Math.max(dx, width - dx),
          maxY        = Math.max(dy, height - dy),
          style       = window.getComputedStyle(target),
          radius      = Math.sqrt((maxX * maxX) + (maxY * maxY));
    
      // Create the ripple and its container
      let ripple = document.createElement("div"), 
          rippleContainer = document.createElement("div");

      // Add optional classes
      if (target.classList.contains("light")) {
          ripple.classList.add("light");
      }
      else if (target.classList.contains("dark")) {
          ripple.classList.add("dark");
      }

      // Add class, append and set location
      ripple.classList.add("ripple-effect");
      rippleContainer.classList.add("ripple-container");
      rippleContainer.appendChild(ripple);
      document.body.appendChild(rippleContainer);

      ripple.style.marginLeft   = dx + "px";
      ripple.style.marginTop    = dy + "px";
    
      rippleContainer.style.left    = left + (((window.pageXOffset || document.scrollLeft) - (document.clientLeft || 0)) || 0) + "px";
      rippleContainer.style.top     = top + (((window.pageYOffset || document.scrollTop) - (document.clientTop || 0)) || 0) + "px";
      rippleContainer.style.width   = width + "px";
      rippleContainer.style.height  = height + "px";
      rippleContainer.style.borderTopLeftRadius  = style.borderTopLeftRadius;
      rippleContainer.style.borderTopRightRadius  = style.borderTopRightRadius;
      rippleContainer.style.borderBottomLeftRadius  = style.borderBottomLeftRadius;
      rippleContainer.style.borderBottomRightRadius  = style.borderBottomRightRadius;

      setTimeout(function() {

          ripple.style.width  = radius * 2 + "px";
          ripple.style.height = radius * 2 + "px";
          ripple.style.marginLeft   = dx - radius + "px";
          ripple.style.marginTop    = dy - radius + "px";
      }, 0);

      setTimeout(function() {

          ripple.style.backgroundColor = "rgba(0, 0, 0, 0)";
      }, 250);

      setTimeout(function() {

          ripple.remove();
          rippleContainer.remove();
      }, 650);
  }
}); 