'use strict';

(function () {

  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;
  var COUNT_OF_ADVERTISEMENTS = 5;

  var pinsContainer = document.querySelector('.map__pins');
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var filterHousingType = document.querySelector('#housing-type');

  var receivedData;

  var onSuccess = function (data) {
    receivedData = data;
    renderPins(receivedData);
  };

  var onError = function () {
    var mainBlock = document.querySelector('main');
    var errorTemplate = document.querySelector('#error').content.querySelector('.error');
    var error = errorTemplate.cloneNode(true);
    mainBlock.appendChild(error);
  };

  var getData = function () {
    window.backend.load(onSuccess, onError);
  };

  var createPin = function (advertisement) {
    var pin = pinTemplate.cloneNode(true);
    pin.style = 'left: ' + (advertisement.location.x - PIN_WIDTH / 2) + 'px; top: ' + (advertisement.location.y - PIN_HEIGHT) + 'px;';
    pin.querySelector('img').src = advertisement.author.avatar;
    pin.querySelector('img').alt = 'Метка объявления';
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

  var updatePins = function () {
    var filteredPins;
    if (filterHousingType.value === 'any') {
      renderPins(receivedData);
    } else {
      filteredPins = receivedData.filter(function (ad) {
        return filterHousingType.value === ad.offer.type;
      });
      renderPins(filteredPins);
    }
  };

  window.map = {
    renderPins: renderPins,
    removePins: removePins,
    updatePins: updatePins,
    getData: getData
  };

})();
