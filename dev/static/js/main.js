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
    modernSoftSlider();
    reviewsTabsInit();
    reviewsSliderInit();
    // yamapsInit();
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
const cssLoaderHtml = `<div class="lds-default"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>`;

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
      duration: 600,
      disable: () => {
        return window.matchMedia('(min-width: 768px)').matches ? false : true;
      }
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
  
  // modern Soft Slider
  function modernSoftSlider() {
    const sliderContainer = document.querySelector('.modern-soft__slider');
    const sliderElement = $('#modern-soft__slider-js');
    const dataSliderElement = $('#modern-soft__info-slider');
    const logoControlElements = document.querySelectorAll('.modern-soft__logo-control');
    
    const loader = document.createElement('div');
    loader.classList.add('loader');
    loader.innerHTML = cssLoaderHtml;
    
    const lazyStartedLoading = () => {
      sliderContainer.append(loader);
    }
    
    const lazyLoaded = () => {
      loader.remove();
    }
    
    new LazyLoad({
      elements_selector: ".ms-slider-img",
      callback_reveal: lazyStartedLoading,
      callback_loaded: lazyLoaded
    });
    
    const slickParams = {
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      fade: true,
      asNavFor: '#modern-soft__info-slider',
      prevArrow: '#slider-arrow__modern-soft--prev',
      nextArrow: '#slider-arrow__modern-soft--next'
    }
    
    const ds_slickParams = {
      infinite: true,
      arrows: false,
      slidesToShow: 1,
      slidesToScroll: 1,
      draggable: false,
      accessibility: false,
      swipeToSlide: false,
      touchMove: false
    }
    
    
    sliderElement.slick(slickParams);
    dataSliderElement.slick(ds_slickParams);
    
    Array.from(logoControlElements).forEach(el => {
      el.addEventListener('click', () => {
        sliderElement.slick('slickGoTo', parseInt(el.dataset.slide));
        
        [...logoControlElements].forEach(lcEl => {
          lcEl.classList.remove('active');
          el.classList.add('active');
        })
      });
    })
  }
  
  function reviewsTabsInit() {
    const tabsContainer = $('.reviews-slide-tabs');

    if (window.matchMedia('(min-width: 951px)').matches) {
      tabsContainer.each(function(_) {
        $(tabsContainer[_]).find('.reviews-slide-tabs__block').each(function(el) {
          $(this).find('.reviews-slide-tabs__btn').each(function() {
            this.addEventListener('click', () => {
              $(this).closest('.reviews-slide-tabs').find('.reviews-slide-tabs__block').removeClass('reviews-slide-tabs__block--active');
              $(this).parent().addClass('reviews-slide-tabs__block--active');
            })
          });
          
        })
        
      });
    }
    
  }
  
  function reviewsSliderInit() {
    const slider = $('#rev-block-slider');
    const navBtns = $('.rev-block__nav-item');
    
    slider.slick({
      infinite: false,
      arrows: false,
      slidesToShow: 1,
      slidesToScroll: 1
    });
    
    navBtns.click(function() {
      navBtns.removeClass('rev-block__nav-item--active');
      $(this).addClass('rev-block__nav-item--active');
      
      const slideNum = this.dataset.revslide;
      slider.slick('slickGoTo', slideNum);
    });
  }
  
function yamapsInit() {
  ymaps.ready(init);

  function init(){

      var myMap = new ymaps.Map("yaMap", {

        center: [55.736731, 37.712946],
        zoom: 15,
        controls: ['smallMapDefaultSet']
      }, {
        searchControlProvider: 'yandex#search'
      });

      var myPlacemark = new ymaps.Placemark(myMap.getCenter(), {
        hintContent: 'Мастер-РМ',
        balloonContent: 'г. Москва, ул.Смирновская, д.25, стр.10'
      }, {
        iconLayout: 'default#image',
        iconImageHref: 'static/images/general/map-pin.png',
        iconImageSize: [148, 160],
        iconImageOffset: [-74, -80]
      });

      myMap.geoObjects
        .add(myPlacemark);
  }
};