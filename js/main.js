'use strict';

var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;
var PIN_MAIN_HEIGHT = 80;
var PIN_MAIN_WIDTH = 65;
var PIN_MIN_Y = 130;
var PIN_MAX_Y = 630;
var NUMBER_OF_ADS = 8;
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

var pinMainMinX = pinsContainer.offsetLeft;
var pinMainMaxX = pinsContainer.offsetWidth - PIN_MAIN_WIDTH;
var pinMainMaxY = pinsContainer.offsetHeight - PIN_MAIN_HEIGHT;

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

var activatePage = function () {
  pinsContainer.appendChild(generateFragment(ads));
  map.classList.remove('map--faded');
  formAd.classList.remove('ad-form--disabled');
  switchDisabledAttr(formAdGroups, false);
  switchDisabledAttr(formMapFilterGroups, false);
};

var switchDisabledAttr = function (formElements, isDisabled) {
  for (var i = 0; i < formElements.length; i++) {
    formElements[i].disabled = isDisabled;
  }
};

var getPinMainCoordinates = function () {
  var pinMainX = Math.round(pinMain.offsetLeft + PIN_MAIN_WIDTH / 2);
  var pinMainY = Math.round(pinMain.offsetTop + PIN_MAIN_HEIGHT);
  var pinMainCoordinates = pinMainX + ', ' + pinMainY;
  return pinMainCoordinates;
};

var writePinMainCoordinates = function () {
  formAdAddress.value = getPinMainCoordinates();
};

writePinMainCoordinates();

switchDisabledAttr(formAdGroups, true);
switchDisabledAttr(formMapFilterGroups, true);

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

// --------------------------------------

pinMain.addEventListener('mousedown', function (evt) {
  evt.preventDefault();

  var startCoords = {
    x: evt.clientX,
    y: evt.clientY
  };

  var onPinMouseMove = function (moveEvt) {
    moveEvt.preventDefault();

    var shift = {
      x: startCoords.x - moveEvt.clientX,
      y: startCoords.y - moveEvt.clientY
    };

    startCoords = {
      x: moveEvt.clientX,
      y: moveEvt.clientY
    };

    pinMain.style.left = (pinMain.offsetLeft - shift.x) + 'px';
    pinMain.style.top = (pinMain.offsetTop - shift.y) + 'px';

    if (moveEvt.pageX < map.offsetLeft) {
      pinMain.style.left = pinMainMinX + 'px';
    }
    if (moveEvt.pageX > map.offsetLeft + pinsContainer.offsetWidth - PIN_MAIN_WIDTH) {
      pinMain.style.left = pinMainMaxX + 'px';
    }
    if (moveEvt.pageY < PIN_MIN_Y) {
      pinMain.style.top = PIN_MIN_Y + 'px';
    }
    if (moveEvt.pageY > pinMainMaxY) {
      pinMain.style.top = pinMainMaxY + 'px';
    }
  };

  var onPinMouseUp = function (upEvt) {
    upEvt.preventDefault();
    activatePage();
    writePinMainCoordinates();

    document.removeEventListener('mousemove', onPinMouseMove);
    document.removeEventListener('mouseup', onPinMouseUp);
  };

  document.addEventListener('mousemove', onPinMouseMove);
  document.addEventListener('mouseup', onPinMouseUp);
});
