'use strict';

(function () {

  var FILTER_DEFAULT_VALUE = 'any';

  var Price = {
    MIN: 10000,
    MAX: 50000
  };

  var filtersContainer = document.querySelector('.map__filters');
  var filters = filtersContainer.querySelectorAll('.map__filter, .map__checkbox');
  var filtersArray = [].slice.call(filters);
  var filterSelects = filtersContainer.querySelectorAll('select');
  var filterSelectsArray = [].slice.call(filterSelects);
  var filterHousingType = filtersContainer.querySelector('#housing-type');
  var filterHousingPrice = filtersContainer.querySelector('#housing-price');
  var filterHousingRooms = filtersContainer.querySelector('#housing-rooms');
  var filterHousingGuests = filtersContainer.querySelector('#housing-guests');
  var filterFeatures = filtersContainer.querySelectorAll('.map__checkbox');

  var filterPins = function () {
    var pins = window.receivedData.slice();
    var checkedFeatures = filtersContainer.querySelectorAll('.map__checkbox:checked');

    var filterChangedSelects = filterSelectsArray.filter(function (it) {
      return it.value !== FILTER_DEFAULT_VALUE;
    });

    var filterPinsByType = function (it) {
      return filterHousingType.value === it.offer.type;
    };

    var filterPinsByPrice = function (it) {
      var price;
      if (it.offer.price < Price.MIN) {
        price = 'low';
      } else if (it.offer.price >= Price.MIN && it.offer.price <= Price.MAX) {
        price = 'middle';
      } else if (it.offer.price > Price.MAX) {
        price = 'high';
      }
      return filterHousingPrice.value === price;
    };

    var filterPinsByRooms = function (it) {
      return +filterHousingRooms.value === it.offer.rooms;
    };

    var filterPinsByGuests = function (it) {
      return +filterHousingGuests.value === it.offer.guests;
    };

    var filterPinsByParameters = function () {
      filterChangedSelects.forEach(function (select) {
        if (select === filterHousingType) {
          pins = pins.filter(filterPinsByType);
        }
        if (select === filterHousingPrice) {
          pins = pins.filter(filterPinsByPrice);
        }
        if (select === filterHousingRooms) {
          pins = pins.filter(filterPinsByRooms);
        }
        if (select === filterHousingGuests) {
          pins = pins.filter(filterPinsByGuests);
        }
      });
    };

    var filterPinsByFeatures = function () {
      var checkedFeaturesArray = [].slice.call(checkedFeatures);
      var checkedFeaturesValues = checkedFeaturesArray.map(function (it) {
        return it.value;
      });
      pins = pins.filter(function (pin) {
        var isValuesContainsInOffer = checkedFeaturesValues.every(function (value) {
          return pin.offer.features.indexOf(value) !== -1;
        });
        return isValuesContainsInOffer;
      });
    };

    if (filterChangedSelects.length !== 0) {
      filterPinsByParameters();
    }
    if (checkedFeatures.length !== 0) {
      filterPinsByFeatures();
    }
    return pins;
  };

  var updatePins = function () {
    if (window.receivedData) {
      var pins = filterPins();
      window.pins.remove();
      window.card.remove();
      window.pins.render(pins);
    }
  };

  var resetFilters = function () {
    filterSelects.forEach(function (select) {
      select.value = FILTER_DEFAULT_VALUE;
    });
    filterFeatures.forEach(function (feature) {
      feature.checked = false;
    });
  };

  var onFilterChange = function (evt) {
    var target = evt.target;
    var isFilter = filtersArray.some(function (element) {
      return target === element;
    });
    if (isFilter) {
      window.debounce(updatePins);
    }
  };

  var addFilterEventListener = function () {
    filtersContainer.addEventListener('change', onFilterChange);
  };

  var removeFilterEventListener = function () {
    filtersContainer.removeEventListener('change', onFilterChange);
  };

  window.filter = {
    reset: resetFilters,
    addEventListener: addFilterEventListener,
    removeEventListener: removeFilterEventListener
  };

})();
