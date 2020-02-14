$(document).ready(function() {
  svg4everybody({});
  burgerAction();

  new LazyLoad({
    elements_selector: ".lazy"
  });

  // Remove phone app action on desktop
  if (window.matchMedia("(min-width: 769px)").matches) {
    $('.head-phone, .phone-block__phone').click(evt => {
      evt.preventDefault();

      $.fancybox.open({
        src  : '#popup-left-phone',
        type : 'inline',
        closeExisting: true,
        smallBtn: false,
        buttons: [],
        autoFocus: false,
      });
    });
  }

  hangPopups();

  if (document.getElementById("page-all") ||
      document.getElementById("page-commercial")) {

    economyCardsActions();
    initAOS();
    initLazyBG();
    modernSoftSlider();
    reviewsTabsInit();
    reviewsSliderInit();
    // yamapsInit();
    fancyboxInitLogic();
    navLine();
    scrollToActions();
  }

  if (document.getElementById("page-security")) {
    // economyCardsActions();
    initAOS();
    initLazyBG();
    modernSoftSlider();
    reviewsTabsInit();
    reviewsSliderInit();
    // yamapsInit();
    fancyboxInitLogic();
    navLine();
    scrollToActions();
  }

  if (document.getElementById("page-it")) {
    initAOS();
    initLazyBG();
    modernSoftSlider();
    reviewsTabsInit();
    reviewsSliderInit();
    // yamapsInit();
    fancyboxInitLogic();
    navLine();
    scrollToActions();
  }

  initDatepicker();
  initInputmask();
  // reviewsShowMore();
});

// Полифилы

// forEach IE 11
if ("NodeList" in window && !NodeList.prototype.forEach) {
  console.info("polyfill for IE11");
  NodeList.prototype.forEach = function(callback, thisArg) {
    thisArg = thisArg || window;
    for (var i = 0; i < this.length; i++) {
      callback.call(thisArg, this[i], i, this);
    }
  };
}

// closest IE 11
(function() {
  if (!Element.prototype.closest) {
    Element.prototype.closest = function(css) {
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
(function() {
  if (!Element.prototype.matches) {
    Element.prototype.matches =
      Element.prototype.matchesSelector ||
      Element.prototype.webkitMatchesSelector ||
      Element.prototype.mozMatchesSelector ||
      Element.prototype.msMatchesSelector;
  }
})();

//Array.form IE 11
if (!Array.from) {
  Array.from = function(object) {
    "use strict";
    return [].slice.call(object);
  };
}

// Modules
const cssLoaderHtml = `<div class="lds-default"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>`;

function burgerAction() {
  var burgerElement = document.querySelector(".burger");
  var headNavEl = document.querySelector(".head-nav");

  // my mistake, loosely had thought about container element
  var burgerContainer = $(".top-line__mobile-nav");
  var burgerContainerMain = $(".top-line-main__mobile-nav");

  burgerElement.addEventListener("click",burgerElHandler);

  var burgerContainerStyles = {
    border: "1px solid #D4DBEF",
    position: "relative",
    zIndex: "12"
  };

  function burgerElHandler() {
    if (this.classList.contains("burger--active")) {
      this.classList.add("burger--reverse");
      headNavEl.classList.remove("head-nav--mobile");
      burgerContainer.removeAttr("style");
      burgerContainerMain.removeAttr("style");

      setTimeout(function() {
        burgerElement.classList.remove("burger--active");
        burgerElement.classList.remove("burger--reverse");
      }, 300);
    } else {
      this.classList.add("burger--active");
      headNavEl.classList.add("head-nav--mobile");
      burgerContainer.css(burgerContainerStyles);
      burgerContainerMain.css(burgerContainerStyles);
    }
  }

  if (window.matchMedia("(max-width: 1280px)").matches) {
    $(headNavEl).find('a').click(() => {
      burgerElement.click();
    });
  }
  
}

function economyCardsActions() {
  if (window.matchMedia("(min-width: 951px)").matches) {
    const cards = document.querySelectorAll(".economy-card");
    const columns = [
      ...document.querySelectorAll(
        "#blue-columns__column-1 .blue-columns__inner-column-outer, #blue-columns__column-2 .blue-columns__inner-column-outer"
      )
    ];
    const colBalloon = document.querySelector("#column-ballon");

    [...cards].forEach(el => {
      el.addEventListener("click", cardClickHandler);
    });

    cards[0].classList.add("economy-card--active");

    function cardClickHandler(event) {
      const targetEl = event.currentTarget;
      const values = targetEl.dataset.value.split(",");
      const ballonText = targetEl.dataset.ballon;

      [...cards].forEach(el => {
        el.classList.remove("economy-card--active");
      });

      targetEl.classList.add("economy-card--active");

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
}

function initAOS() {
  AOS.init({
    duration: 600,
    disable: () => {
      return window.matchMedia("(min-width: 768px)").matches ? false : true;
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
  const sliderContainer = document.querySelector(".modern-soft__slider");
  const sliderElement = $("#modern-soft__slider-js");
  const dataSliderElement = $("#modern-soft__info-slider");
  const logoControlElements = document.querySelectorAll(
    ".modern-soft__logo-control"
  );

  const loader = document.createElement("div");
  loader.classList.add("loader");
  loader.innerHTML = cssLoaderHtml;

  const lazyStartedLoading = () => {
    sliderContainer.append(loader);
  };

  const lazyLoaded = () => {
    loader.remove();
  };

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
    asNavFor: "#modern-soft__info-slider",
    prevArrow: "#slider-arrow__modern-soft--prev",
    nextArrow: "#slider-arrow__modern-soft--next"
  };

  const ds_slickParams = {
    infinite: true,
    arrows: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    draggable: false,
    accessibility: false,
    swipeToSlide: false,
    touchMove: false,
    adaptiveHeight: true
  };

  sliderElement.slick(slickParams);
  dataSliderElement.slick(ds_slickParams);

  Array.from(logoControlElements).forEach(el => {
    el.addEventListener("click", () => {
      sliderElement.slick("slickGoTo", parseInt(el.dataset.slide));

      [...logoControlElements].forEach(lcEl => {
        lcEl.classList.remove("active");
        el.classList.add("active");
      });
    });
  });

  // dataSliderElement.on('afterChange', (evt, _, currentSlide) => {
  //   $(logoControlElements).removeClass('active');
  //   $(logoControlElements[currentSlide]).addClass('active');
  // });

  dataSliderElement.on('afterChange', (evt, _, currentSlide) => {
    $(logoControlElements).removeClass('active');
    $(logoControlElements[currentSlide]).addClass('active');
  });
}

function reviewsTabsInit() {
  const tabsContainer = $(".reviews-slide-tabs");

  tabsContainer.each(function(i) {
    if (window.matchMedia("(max-width: 950px)").matches) {
      $(tabsContainer[i]).find('.reviews-slide-tabs__btn:first-of-type').addClass("reviews-slide-tabs__btn--open");
      $(tabsContainer[i]).find('.reviews-slide-tabs__btn:first-of-type + .reviews-slide-tabs__content').slideToggle();
    }

    $(tabsContainer[i]).find('.reviews-slide-tabs__btn').each(function() {
      this.addEventListener('click', () => {
        if (window.matchMedia("(max-width: 950px)").matches) {
          if ($(this).hasClass("reviews-slide-tabs__btn--open")) {
            $(this).removeClass("reviews-slide-tabs__btn--open");
          } else {
            $(this).addClass("reviews-slide-tabs__btn--open");
          }
          $(this).next().slideToggle();
        } else {
          $(this)
          .closest(".reviews-slide-tabs")
          .find(".reviews-slide-tabs__btn")
          .removeClass("reviews-slide-tabs__btn--active");
          $(this).addClass("reviews-slide-tabs__btn--active");
        }
        
      })
    });
    
  });
}

function reviewsSliderInit() {
  const slider = $("#rev-block-slider");
  const navBtns = $(".rev-block__nav-item");

  slider.slick({
    infinite: false,
    arrows: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: "#slider-arrow__rev-block--prev",
    nextArrow: "#slider-arrow__rev-block--next"
  });

  navBtns.click(function() {
    navBtns.removeClass("rev-block__nav-item--active");
    $(this).addClass("rev-block__nav-item--active");

    const slideNum = this.dataset.revslide;
    slider.slick("slickGoTo", slideNum);
  });
}

function yamapsInit() {
  ymaps.ready(init);

  function init() {
    var myMap = new ymaps.Map(
      "yaMap",
      {
        center: [55.736731, 37.712946],
        zoom: 15,
        controls: ["smallMapDefaultSet"]
      },
      {
        searchControlProvider: "yandex#search"
      }
    );

    var myPlacemark = new ymaps.Placemark(
      myMap.getCenter(),
      {
        hintContent: "Мастер-РМ",
        balloonContent: "г. Москва, ул.Смирновская, д.25, стр.10"
      },
      {
        iconLayout: "default#image",
        iconImageHref: "static/images/general/map-pin.png",
        iconImageSize: [148, 160],
        iconImageOffset: [-74, -80]
      }
    );

    myMap.geoObjects.add(myPlacemark);
  }
}

// Fancybox
function fancyboxInitLogic() {
  const headerBtn = document.getElementById('header-btn');
  // Open quiz on Calc Price Button
  const calcPriceBtn = document.getElementById("ms-calc-price");
  const quizCopy = document.getElementById("quiz-form").cloneNode(true);
  quizCopy.id = quizCopy.id + "-copy";

  const quizWrapper = document.createElement("div");
  quizWrapper.classList.add("quizPopup");
  quizWrapper.appendChild(quizCopy);


  

  const quizPopuphandler = e => {
    e.preventDefault();
    
    $.fancybox.open("<div>" + quizWrapper.innerHTML + "</div>", {
      afterShow: function( instance, current ) {
        const phoneInput = current.$slide[0].querySelector('input[name="telephone"]')
        
        IMask(phoneInput, {
          mask: '{+7} (000) 000-00-00',
          lazy: false,
        });

        validPhone([phoneInput]);

        current.$slide[0].querySelector('.quiz-form__quiz-list-link').addEventListener('click', e => {
          e.preventDefault();

          $.fancybox.open({
            src  : '#popup-popup-questionnaire',
            type : 'inline',
            closeExisting: true,
            hideScrollbar: false,
            smallBtn: false,
            buttons: [],
            autoFocus: false,
            touch: {
              vertical: true
            }
          });
        })
      },
      smallBtn: false,
      autoFocus: false,
      hideScrollbar: false,
    });
  }

  calcPriceBtn.addEventListener("click", quizPopuphandler);
  headerBtn.addEventListener("click", quizPopuphandler);
}

// navigation line
function navLine() {
  let scrollActive = false;
  const navLine = document.querySelector(".header__navigation");
  const headerEl = document.querySelector(".header");

  window.addEventListener("scroll", evt => {
    if (window.pageYOffset > 1000 && !scrollActive) {
      scrollActive = true;
      navLine.classList.add("floating");
      headerEl.classList.add("floating");
    } else if (window.pageYOffset <= 1000 && scrollActive) {
      scrollActive = false;
      navLine.classList.add("hiding");

      setTimeout(() => {
        navLine.classList.remove("floating");
        navLine.classList.remove("hiding");
        headerEl.classList.remove("floating");
      }, 220);

    }
  });
}

function initDatepicker() {
  const monthNames = ["Января", "Февраля", "Марта", "Апреля", "Мая", "Июня", "Июля", "Августа", "Сентября", "Октября", "Ноября", "Декабря"];

  const fields = document.querySelectorAll('input[name="input_date"]');

  [...fields].forEach(el => {
    new Datepicker(el, {
      time: true,
      toValue: function(val) {

        if (!val) {
          var today = new Date();
          return today;
          // return `${today.getDate()} ${monthNames[parseInt(today.getMonth())-1]} в ${today.getHours()}:${today.getMinutes()}`;
        }

        let [date, time] = val.split('@');
        let [day, month, year] = date.split('.');

        if (day) {
          day = day.startsWith('0') ? day.slice(1) : day;
        } else {
          day = '';
        }

        if (month) {
          month = month.startsWith('0') ? monthNames[parseInt(month.slice(1))-1] : monthNames[parseInt(month)-1];
        } else {
          month = '';
        }

        if (!time) {
          time = '';
        }

        // el.setAttribute('value', `${day} ${month} в ${time}`);
        return `${day} ${month} в ${time}`;

      },
      fromValue: function(val) {
        return new Date();
      }
    });
  });

}

function initInputmask() {
  const phoneInputs = document.querySelectorAll('input[name="telephone"]');

  [...phoneInputs].forEach(el => {
    IMask(el, {
      mask: '{+7} (000) 000-00-00',
      lazy: false,
    })
  });

  validPhone(phoneInputs);
}

function validPhone(inputs) {
  const regex = /\d+/g;

  // safary fix
  for (let i = 0; i < inputs.length; i++) {
    inputs[i]
        .closest('form')
        .querySelector('button[type="submit"]')
        .addEventListener('click', inputErrHandler(inputs[i]));
  }

  function inputErrHandler(inpEl) {  
    
    return (evt) => {

      if (inpEl.value.length !== 18 || isSameNumbers(inpEl.value)) {
        inpEl.setCustomValidity('Неверный формат номера!');
      } else {
        inpEl.setCustomValidity('');
      }
    }

  }

  function isSameNumbers(num) {
    const digits = num.match(regex).slice(1).join('');
    
    if (digits.length !== 10) {
      return true;
    }

    if (digits === '1234567890') {
      return true;
    }

    return digits.split('').every((el, i, arr) => {
      
      if (i > 0) {
        return arr[i-1] === el;
      } else {
        return true;
      }
    });
  }
}

function hangPopups() {
  const btnToPopup = [
    ['#popup-free-test', ['#free-test', '#rev-block-turquoise-btn', '#next-step-card-30-days-free']],
    ['#popup-get-presentation', ['.modern-soft__get-presentation']],
    ['#popup-popup-questionnaire', ['.quiz-form__quiz-list-link']],
    ['#popup-places', ['#weak-spots-btn', '#next-step-card-order-audit', '#get-audit-btn']],
    ['#popup-left-phone', ['#next-step-card-get-consult']]
  ];

  btnToPopup.forEach(pair => {

    pair[1].forEach(button => {
      
      $(button).click((evt) => {
        evt.preventDefault();
        
        $.fancybox.open({
          src  : pair[0],
          type : 'inline',
          closeExisting: false,
          smallBtn: false,
          buttons: [],
          autoFocus: false,
          touch: {
            vertical: true,
            momentum: false
          }
        });
      })
    })
  });

  $('.close-btn').click(() => $.fancybox.close());
}

function scrollToActions() {

  const links = ['.header-logo', '.head-nav__link'];

  links.forEach(el => {
    $(el).click(scrollToaction);
  })

  function scrollToaction(evt) {
    evt.preventDefault();
    var scroll_el = $($(this).attr('href'));

    if ($(scroll_el).length != 0) {
        $('html, body').animate({
            scrollTop: $(scroll_el).offset().top
        }, 800);
    }
  }
}

// Show More Actions
// function reviewsShowMore() {
//   const showMoreBtn = document.getElementById('show-more-remivews');
//   const cardsConts = document.querySelectorAll('.audio-cards__column');
//   const audioCards = [
//     filterShown(cardsConts[0].querySelectorAll('.audio-cards__card')),
//     filterShown(cardsConts[1].querySelectorAll('.audio-cards__card'))
//   ];
//
//   console.log(audioCards);
//
//
//   function filterShown(nList) {
//     return Array.from(nList).filter(el => {
//       console.log(el)
//       return !el.classList.contains('show');
//     })
//   }
// }