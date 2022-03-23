'use strict';

///////////////////////////////////////
// Selectors

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

///////////////////////////////////////
// Modal window

const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(modal => modal.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

///////////////////////////////////////
// Links

btnScrollTo.addEventListener('click', function (e) {
  const s1coords = section1.getBoundingClientRect();
  section1.scrollIntoView({ behavior: 'smooth' });
});

///////////////////////////////////////
// Page Navigation

document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

///////////////////////////////////////
// Menu Fade Animation
const nav = document.querySelector('.nav');
const navLogo = nav.querySelector('.nav__logo');

const changeOpacity = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const siblings = e.target.closest('.nav').querySelectorAll('.nav__link');

    siblings.forEach(elem => {
      if (elem !== e.target) {
        elem.style.opacity = this;
      }
      navLogo.style.opacity = this;
    });
  }
};

// Sticky Navbar
window.addEventListener('scroll', function () {
  if (section1.getBoundingClientRect().top <= 0) {
    nav.classList.add('sticky');
  } else {
    nav.classList.remove('sticky');
  }
});

// Passing argument into `this`
nav.addEventListener('mouseover', changeOpacity.bind(0.5));

nav.addEventListener('mouseout', changeOpacity.bind(1));

///////////////////////////////////////
// Tabbed Component

tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');

  // Guard clause
  if (!clicked) return;

  // Activate Tab
  tabs.forEach(elem => elem.classList.remove('operations__tab--active'));
  clicked.classList.add('operations__tab--active');

  // Activate Content Area
  const num = clicked.dataset.tab;
  tabsContent.forEach(elem =>
    elem.classList.remove('operations__content--active')
  );
  document
    .querySelector(`.operations__content--${num}`)
    .classList.add('operations__content--active');
});
