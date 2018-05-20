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
  burger.style.display = 'none';
  } else { 
burger.innerHTML = '×';
burger.style.display = 'block';
}
}

burger.addEventListener('click', changeBurger);




