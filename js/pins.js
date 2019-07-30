'use strict';

(function () {

  var COUNT_OF_ADVERTISEMENTS = 5;

  var Pin = {
    WIDTH: 50,
    HEIGHT: 70
  };

  var pinsContainer = document.querySelector('.map__pins');
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  var createPin = function (advertisement) {
    var pin = pinTemplate.cloneNode(true);
    pin.style = 'left: ' + (advertisement.location.x - Pin.WIDTH / 2) + 'px; top: ' + (advertisement.location.y - Pin.HEIGHT) + 'px;';
    pin.querySelector('img').src = advertisement.author.avatar;
    pin.querySelector('img').alt = 'Метка объявления';
    pin.addEventListener('click', function () {
      window.card.remove();
      window.card.render(advertisement);
    });
    return pin;
  };

  var renderPins = function (advertisements) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < COUNT_OF_ADVERTISEMENTS && i < advertisements.length; i++) {
      fragment.appendChild(createPin(advertisements[i]));
    }
    pinsContainer.appendChild(fragment);
  };

  var removePins = function () {
    var pins = pinsContainer.querySelectorAll('.map__pin');
    pins.forEach(function (pin) {
      if (!pin.classList.contains('map__pin--main')) {
        pinsContainer.removeChild(pin);
      }
    });
  };

  window.pins = {
    render: renderPins,
    remove: removePins
  };

})();
