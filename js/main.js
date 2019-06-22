'use strict';

var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;
var PIN_MIN_Y = 130;
var PIN_MAX_Y = 630;
var NUMBER_OF_ADS = 8;
// var OFFER_TYPES = ['palace', 'flat', 'house', 'bungalo'];
// var OFFER_PRICES = [10000, 1000, 5000, 0];
var OFFERS = {
  bungalo: 0,
  flat: 1000,
  house: 5000,
  palace: 10000
};

var mapWidth = document.querySelector('.map').offsetWidth;
var pinsContainer = document.querySelector('.map__pins');
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var map = document.querySelector('.map');
var pinMain = pinsContainer.querySelector('.map__pin--main');
var formMapFilter = map.querySelector('.map__filters');
var formMapFilterGroups = formMapFilter.querySelectorAll('select, fieldset');
var formAd = document.querySelector('.ad-form');
var formAdGroups = formAd.querySelectorAll('fieldset');
var formAdAddress = formAd.querySelector('#address');
var formAdType = formAd.querySelector('#type');
var formAdPrice = formAd.querySelector('#price');
var formAdTimeIn = formAd.querySelector('#timein');
var formAdTimeOut = formAd.querySelector('#timeout');

var randomInteger = function (min, max) {
  var random = min + Math.random() * (max + 1 - min);
  random = Math.floor(random);
  return random;
};

var generateAds = function (number) {
  var ads = [];
  for (var i = 0; i < number; i++) {
    ads[i] = {
      author: {
        avatar: 'img/avatars/user0' + (i + 1) + '.png'},
      offer: {
        type: randomInteger(0, OFFERS.length - 1)},
      location: {
        x: randomInteger(PIN_WIDTH, mapWidth - PIN_WIDTH),
        y: randomInteger(PIN_MIN_Y + PIN_HEIGHT, PIN_MAX_Y - PIN_HEIGHT)
      }
    };
  }
  return ads;
};

var ads = generateAds(NUMBER_OF_ADS);

var renderPin = function (advertisement) {
  var pin = pinTemplate.cloneNode(true);
  pin.style = 'left: ' + advertisement.location.x + 'px; top: ' + advertisement.location.y + 'px;';
  pin.querySelector('img').src = advertisement.author.avatar;
  pin.querySelector('img').alt = 'Метка объявления';
  return pin;
};

var generateFragment = function (advertisements) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < advertisements.length; i++) {
    fragment.appendChild(renderPin(advertisements[i]));
  }
  return fragment;
};

pinMain.addEventListener('click', function () {
  pinsContainer.appendChild(generateFragment(ads));
  map.classList.remove('map--faded');
  formAd.classList.remove('ad-form--disabled');
  switchDisabledAttr(formAdGroups, false);
  switchDisabledAttr(formMapFilterGroups, false);
});

pinMain.addEventListener('mouseup', function () {
  writePinMainCoordinates();
});

var switchDisabledAttr = function (formElements, isDisabled) {
  for (var i = 0; i < formElements.length; i++) {
    formElements[i].disabled = isDisabled;
  }
};

var getPinMainCoordinates = function () {
  var pinMainX = pinMain.offsetLeft - PIN_WIDTH / 2;
  var pinMainY = pinMain.offsetTop + PIN_HEIGHT;
  var pinMainCoordinates = pinMainX + ', ' + pinMainY;
  return pinMainCoordinates;
};

var writePinMainCoordinates = function () {
  formAdAddress.value = getPinMainCoordinates();
};

writePinMainCoordinates();

switchDisabledAttr(formAdGroups, true);
switchDisabledAttr(formMapFilterGroups, true);

// var createOffers = function() {
//   var offerTypesCopy = OFFER_TYPES.slice();
//   var offerPricesCopy = OFFER_PRICES.slice();
//   var offers = {};
//
//   for (var i = 0; i < OFFER_TYPES.length; i++) {
//     offers[offerTypesCopy[i]] = offerPricesCopy[i];
//   }
//   return offers;
// }
//
// var offers = createOffers();

var onChangeFormAdType = function (evt) {
  var target = evt.target;
  var price = OFFERS[target.value];
  formAdPrice.placeholder = price;
  formAdPrice.min = price;
};

var onChangeFormAdTime = function (evt) {
  var target = evt.target;
  if (target === formAdTimeIn) {
    formAdTimeOut.value = target.value;
  } else {
    formAdTimeIn.value = target.value;
  }
};

formAdType.addEventListener('change', onChangeFormAdType);
formAdTimeIn.addEventListener('change', onChangeFormAdTime);
formAdTimeOut.addEventListener('change', onChangeFormAdTime);
