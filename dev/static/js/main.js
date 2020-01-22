$(document).ready(function () {
  svg4everybody({});
  burgerAction();

  new LazyLoad({
    elements_selector: ".lazy"
  });

  if (document.getElementById('page-sectioning')) {
    console.log('page-sectioning');
  }

  if (document.getElementById('page-all')) {
    
    if (window.matchMedia('(min-width: 951px)').matches) {
      economyCardsActions();
    }

    initAOS();
    initLazyBG();
  }
  
});


// Полифилы

// forEach IE 11
if ('NodeList' in window && !NodeList.prototype.forEach) {
  console.info('polyfill for IE11');
  NodeList.prototype.forEach = function (callback, thisArg) {
    thisArg = thisArg || window;
    for (var i = 0; i < this.length; i++) {
      callback.call(thisArg, this[i], i, this);
    }
  };
}

// closest IE 11
(function () {
  if (!Element.prototype.closest) {
    Element.prototype.closest = function (css) {
      var node = this;
      while (node) {
        if (node.matches(css)) return node;
        else node = node.parentElement;
      }
      return null;
    };
  }
})();

// matches IE 11
(function () {
  if (!Element.prototype.matches) {
    Element.prototype.matches = Element.prototype.matchesSelector ||
    Element.prototype.webkitMatchesSelector ||
    Element.prototype.mozMatchesSelector ||
    Element.prototype.msMatchesSelector;
  }
})();

//Array.form IE 11
if (!Array.from) {
  Array.from = function (object) {
    'use strict';
    return [].slice.call(object);
  };
}


// Modules

function burgerAction() {
  var burgerElement = document.querySelector('.burger');
  var headNavEl = document.querySelector('.head-nav');
  
  // my mistake, loosely had thought about container element
  var burgerContainer = $('.top-line__mobile-nav');
  var burgerContainerMain = $('.top-line-main__mobile-nav');
  
  burgerElement.addEventListener('click', function() {
    if (this.classList.contains('burger--active')) {
      this.classList.add('burger--reverse');
      headNavEl.classList.remove('head-nav--mobile');
      burgerContainer.removeAttr('style');
      burgerContainerMain.removeAttr('style');
      
      setTimeout(function() {
        burgerElement.classList.remove('burger--active');
        burgerElement.classList.remove('burger--reverse');
      }, 300);
    } else {
      this.classList.add('burger--active');
      headNavEl.classList.add('head-nav--mobile');
      burgerContainer.css(burgerContainerStyles);
      burgerContainerMain.css(burgerContainerStyles);
      
    }
  });
  
  var burgerContainerStyles = {
    border: '1px solid #D4DBEF',
    position: 'relative',
    zIndex: '12',
  }
}

function economyCardsActions() {
  const cards = document.querySelectorAll('.economy-card');
  const columns = [...(document.querySelectorAll(
    '#blue-columns__column-1 .blue-columns__inner-column-outer, #blue-columns__column-2 .blue-columns__inner-column-outer'
  ))];
  const colBalloon = document.querySelector('#column-ballon');

  [...cards].forEach(el => {
    el.addEventListener('click', cardClickHandler);
  });

  cards[0].classList.add('economy-card--active');

  function cardClickHandler(event) {
    const targetEl = event.currentTarget;
    const values = targetEl.dataset.value.split(',');
    const ballonText = targetEl.dataset.ballon;
    

    [...cards].forEach(el => {
      el.classList.remove('economy-card--active');
    });

    targetEl.classList.add('economy-card--active');

    changeColumnHeight(values);
    setColumnBalloon(ballonText.trim());
  }

  function changeColumnHeight(vals) {
    const val_1 = parseInt(vals[0], 10);
    const val_2 = parseInt(vals[1], 10);

    columns[0].style.height = `${val_1}%`;
    columns[1].style.height = `${val_2}%`;
  }

  function setColumnBalloon(rawtext) {
    colBalloon.innerHTML = rawtext;
  }
}

function initAOS() {
  AOS.init({
    // easing: 'ease-in-out-back',
    duration: 600
  });
}

function initLazyBG() {

  var callback_enter = function(element) {
    console.log(element);
    
  };

  new LazyLoad({
    elements_selector: ".lazyBg"
  });
}