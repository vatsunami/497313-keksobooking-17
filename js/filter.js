'use strict';

(function () {

  var FILTER_DEFAULT_VALUE = 'any';

  var Price = {
    MIN: 10000,
    MAX: 50000
  };

  var filtersContainer = document.querySelector('.map__filters');
  var filters = filtersContainer.querySelectorAll('.map__filter, .map__checkbox');
  var filterHousingType = filtersContainer.querySelector('#housing-type');
  var filterHousingPrice = filtersContainer.querySelector('#housing-price');
  var filterHousingRooms = filtersContainer.querySelector('#housing-rooms');
  var filterHousingGuests = filtersContainer.querySelector('#housing-guests');
  var filterFeatures = filtersContainer.querySelectorAll('.map__checkbox');
  var filterFeaturesArray = [].slice.call(filterFeatures);

  var filterPins = function () {
    var pins = window.receivedData.slice();

    var filterPinsByType = function () {
      if (filterHousingType.value !== FILTER_DEFAULT_VALUE) {
        pins = pins.filter(function (it) {
          return filterHousingType.value === it.offer.type;
        });
      }
    };

    var filterPinsByPrice = function () {
      if (filterHousingPrice.value !== FILTER_DEFAULT_VALUE) {
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
      if (filterHousingRooms.value !== FILTER_DEFAULT_VALUE) {
        pins = pins.filter(function (it) {
          return +filterHousingRooms.value === it.offer.rooms;
        });
      }
    };

    var filterPinsByGuests = function () {
      if (filterHousingGuests.value !== FILTER_DEFAULT_VALUE) {
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
    window.pins.remove();
    window.card.remove();
    window.pins.render(pins);
  };

  var resetFilters = function () {
    var filterSelects = filtersContainer.querySelectorAll('select');
    filterSelects.forEach(function (select) {
      select.value = FILTER_DEFAULT_VALUE;
    });
    filterFeatures.forEach(function (feature) {
      feature.checked = false;
    });
  };

  var onFilterChange = function (evt) {
    var target = evt.target;
    filters.forEach(function (it) {
      if (target === it) {
        window.debounce(updatePins);
      }
    });
  };

  filtersContainer.addEventListener('change', onFilterChange);

  window.filter = {
    reset: resetFilters
  };

})();
