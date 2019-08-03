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
    var pinX = advertisement.location.x - Pin.WIDTH / 2 + 'px';
    var pinY = advertisement.location.y - Pin.HEIGHT + 'px';
    pin.style.left = pinX;
    pin.style.top = pinY;
    pin.querySelector('img').src = advertisement.author.avatar;
    pin.querySelector('img').alt = 'Метка объявления';
    pin.addEventListener('click', function () {
      window.card.remove();
      window.card.render(advertisement);
      addPinActiveClass(pin);
    });
    return pin;
  };

  var renderPins = function (advertisements) {
    var fragment = document.createDocumentFragment();
    advertisements = advertisements.slice(0, COUNT_OF_ADVERTISEMENTS);
    advertisements.forEach(function (ad) {
      fragment.appendChild(createPin(ad));
    });
    pinsContainer.appendChild(fragment);
  };

  var removePins = function () {
    var pins = pinsContainer.querySelectorAll('.map__pin');
    var pinsArray = [].slice.call(pins);
    pinsArray.filter(function (pin) {
      return !pin.classList.contains('map__pin--main');
    }).forEach(function (pin) {
      pin.remove();
    });
  };

  var addPinActiveClass = function (pin) {
    pin.classList.add('map__pin--active');
  };

  var removePinActiveClass = function () {
    var pin = pinsContainer.querySelector('.map__pin--active');
    if (pin) {
      pin.classList.remove('map__pin--active');
    }
  };

  window.pins = {
    render: renderPins,
    remove: removePins,
    removeActiveClass: removePinActiveClass
  };

})();
