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

// Passing argument into `this`
nav.addEventListener('mouseover', changeOpacity.bind(0.5));
nav.addEventListener('mouseout', changeOpacity.bind(1));

///////////////////////////////////////
// Sticky Navbar

const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;
const obsCallback = function (entries) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) {
      nav.classList.add('sticky');
    } else {
      nav.classList.remove('sticky');
    }
  });
};

const observer = new IntersectionObserver(obsCallback, {
  root: null,
  rootMargin: `-${navHeight}px`,
  threshold: 0,
});
observer.observe(header);

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

///////////////////////////////////////
// Reveal Section
const sections = document.querySelectorAll('.section');

const revealSection = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) {
    entry.target.classList.add('section--hidden');
  }

  if (entry.isIntersecting) {
    entry.target.classList.remove('section--hidden');
  }
};

const secObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

sections.forEach(section => {
  section.classList.add('section--hidden');
  secObserver.observe(section);
});

///////////////////////////////////////
// Lazy Loading Images

const imageTargets = document.querySelectorAll('img[data-src]');
const imgCallback = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  if (entry.isIntersecting) {
    entry.target.setAttribute('src', `${entry.target.dataset.src}`);

    // Remove filter only after the image is loaded
    entry.target.addEventListener('load', function () {
      entry.target.classList.remove('lazy-img');
    });
    observer.unobserve(entry.target);
  }
};

const imgObserver = new IntersectionObserver(imgCallback, {
  root: null,
  threshold: 0,
  rootMargin: '200px',
});

imageTargets.forEach(image => imgObserver.observe(image));

///////////////////////////////////////
// Sliders
const sliders = function () {
  const slides = document.querySelectorAll('.slide');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  let currentSlide = 0;

  const dotContainer = document.querySelector('.dots');
  const createDots = function () {
    slides.forEach((_, i) => {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class='dots__dot' data-slide = ${i}></button>`
      );
    });
  };
  const activateDot = function (num) {
    document
      .querySelectorAll('.dots__dot')
      .forEach(dot => dot.classList.remove('dots__dot--active'));
    document
      .querySelector(`.dots__dot[data-slide="${num}"]`)
      .classList.add('dots__dot--active');
  };

  // Go to slide function
  const goToSlide = function (num) {
    slides.forEach(
      (elem, i) => (elem.style.transform = `translateX(${100 * (i - num)}%)`)
    );
    activateDot(num);
  };

  const nextSlide = function () {
    if (currentSlide === slides.length - 1) {
      currentSlide = 0;
    } else {
      currentSlide++;
    }
    goToSlide(currentSlide);
  };
  const prevSlide = function () {
    if (currentSlide === 0) {
      currentSlide = slides.length - 1;
    } else {
      currentSlide--;
    }
    goToSlide(currentSlide);
  };

  // Init
  createDots();
  activateDot(0);
  goToSlide(0);

  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', prevSlide);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') {
      prevSlide();
    }
    if (e.key === 'ArrowRight') {
      nextSlide();
    }
  });

  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      goToSlide(`${e.target.dataset.slide}`);
    }
  });
};
sliders();
