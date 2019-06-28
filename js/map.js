'use strict';

(function () {

  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;
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
          type: randomInteger(0, window.data.OFFERS.length - 1)},
        location: {
          x: randomInteger(PIN_WIDTH, mapWidth - PIN_WIDTH),
          y: randomInteger(window.data.PIN_MIN_Y + PIN_HEIGHT, window.data.PIN_MAX_Y - PIN_HEIGHT)
        }
      };
    }
    return ads;
  };

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

  window.map = {
    generateFragment: generateFragment,
    generateAds: generateAds
  };
})();
