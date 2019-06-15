'use strict';

var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;
var PIN_MIN_Y = 130;
var PIN_MAX_Y = 630;
var NUMBER_OF_ADS = 8;
var OFFER_TYPES = ['palace', 'flat', 'house', 'bungalo'];
var mapWidth = document.querySelector('.map').offsetWidth;

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
        type: randomInteger(0, OFFER_TYPES.length - 1)},
      location: {
        x: randomInteger(PIN_WIDTH, mapWidth - PIN_WIDTH),
        y: randomInteger(PIN_MIN_Y + PIN_HEIGHT, PIN_MAX_Y - PIN_HEIGHT)
      }
    };
  }
  return ads;
};

var map = document.querySelector('.map');
map.classList.remove('map--faded');

var pinsContainer = document.querySelector('.map__pins');
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

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

pinsContainer.appendChild(generateFragment(generateAds(NUMBER_OF_ADS)));
