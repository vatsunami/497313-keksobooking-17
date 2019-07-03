'use strict';

(function () {

  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;

  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  var renderPin = function (advertisement) {
    var pin = pinTemplate.cloneNode(true);
    pin.style = 'left: ' + (advertisement.location.x - PIN_WIDTH / 2) + 'px; top: ' + (advertisement.location.y - PIN_HEIGHT) + 'px;';
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
    generateFragment: generateFragment
  };
})();
