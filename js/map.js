'use strict';

(function () {

  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;
  var COUNT_OF_ADVERTISEMENTS = 5;

  var Price = {
    MIN: 10000,
    MAX: 50000
  };

  var pinsContainer = document.querySelector('.map__pins');
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var filtersContainer = document.querySelector('.map__filters');
  var filterHousingType = filtersContainer.querySelector('#housing-type');
  var filterHousingPrice = filtersContainer.querySelector('#housing-price');
  var filterHousingRooms = filtersContainer.querySelector('#housing-rooms');
  var filterHousingGuests = filtersContainer.querySelector('#housing-guests');
  var filterFeatures = filtersContainer.querySelectorAll('.map__checkbox');
  var filterFeaturesArray = [].slice.call(filterFeatures);

  var receivedData;

  var createPin = function (advertisement) {
    var pin = pinTemplate.cloneNode(true);
    pin.style = 'left: ' + (advertisement.location.x - PIN_WIDTH / 2) + 'px; top: ' + (advertisement.location.y - PIN_HEIGHT) + 'px;';
    pin.querySelector('img').src = advertisement.author.avatar;
    pin.querySelector('img').alt = 'Метка объявления';
    pin.addEventListener('click', function () {
      window.card.removeCard();
      window.card.renderCard(advertisement);
    });
    return pin;
  };

  var renderPins = function (advertisements) {
    if (receivedData === undefined) {
      receivedData = advertisements;
    }
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

  var filterPins = function () {
    var pins = receivedData.slice();

    var filterPinsByType = function () {
      if (filterHousingType.value !== 'any') {
        pins = pins.filter(function (it) {
          return filterHousingType.value === it.offer.type;
        });
      }
    };

    var filterPinsByPrice = function () {
      if (filterHousingPrice.value !== 'any') {
        var price;
        pins = pins.filter(function (it) {
          if (it.offer.price < Price.MIN) {
            price = 'low';
          } else if (it.offer.price >= Price.MIN && it.offer.price <= Price.MAX) {
            price = 'middle';
          } else if (it.offer.price > Price.MAX) {
            price = 'high';
          }
          return filterHousingPrice.value === price;
        });
      }
    };

    var filterPinsByRooms = function () {
      if (filterHousingRooms.value !== 'any') {
        pins = pins.filter(function (it) {
          return +filterHousingRooms.value === it.offer.rooms;
        });
      }
    };

    var filterPinsByGuests = function () {
      if (filterHousingGuests.value !== 'any') {
        pins = pins.filter(function (it) {
          return filterHousingGuests.value === it.offer.guests;
        });
      }
    };

    var filterPinsByFeatures = function () {
      filterFeaturesArray.forEach(function (feature) {
        if (feature.checked) {
          pins = pins.filter(function (it) {
            return it.offer.features.indexOf(feature.value) !== -1;
          });
        }
      });
    };

    filterPinsByType();
    filterPinsByPrice();
    filterPinsByRooms();
    filterPinsByGuests();
    filterPinsByFeatures();
    return pins;
  };

  var updatePins = function () {
    var pins = filterPins();
    renderPins(pins);
  };

  window.map = {
    renderPins: renderPins,
    removePins: removePins,
    updatePins: updatePins
  };

})();
