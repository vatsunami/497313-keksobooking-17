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
  var filterHousingType = filtersContainer.querySelector('#housing-type');
  var filterHousingPrice = filtersContainer.querySelector('#housing-price');
  var filterHousingRooms = filtersContainer.querySelector('#housing-rooms');
  var filterHousingGuests = filtersContainer.querySelector('#housing-guests');
  var filterFeatures = filtersContainer.querySelectorAll('.map__checkbox');
  var filterFeaturesArray = [].slice.call(filterFeatures);

  var filterPins = function () {
    var pins = window.receivedData.slice();

    var filterPinsByType = function (it) {
      if (filterHousingType.value !== FILTER_DEFAULT_VALUE) {
        return filterHousingType.value === it.offer.type;
      } else {
        return it;
      }
    };

    var filterPinsByPrice = function (it) {
      if (filterHousingPrice.value !== FILTER_DEFAULT_VALUE) {
        var price;
        if (it.offer.price < Price.MIN) {
          price = 'low';
        } else if (it.offer.price >= Price.MIN && it.offer.price <= Price.MAX) {
          price = 'middle';
        } else if (it.offer.price > Price.MAX) {
          price = 'high';
        }
        return filterHousingPrice.value === price;
      } else {
        return it;
      }
    };

    var filterPinsByRooms = function (it) {
      if (filterHousingRooms.value !== FILTER_DEFAULT_VALUE) {
        return +filterHousingRooms.value === it.offer.rooms;
      } else {
        return it;
      }
    };

    var filterPinsByGuests = function (it) {
      if (filterHousingGuests.value !== FILTER_DEFAULT_VALUE) {
        return +filterHousingGuests.value === it.offer.guests;
      } else {
        return it;
      }
    };

    var checkedFeaturesValues = filterFeaturesArray
      .filter(filterChecked)
      .map(selectValue);

    var filterPinsByFeatures = function (it) {
      if (checkedFeaturesValues.length > 0) {
        var isContainsInOffer = checkedFeaturesValues.every(function (value) {
          return it.offer.features.indexOf(value) !== -1;
        });
        return isContainsInOffer;
      } else {
        return it;
      }
    };

    var filteredPins = pins
      .filter(filterPinsByType)
      .filter(filterPinsByPrice)
      .filter(filterPinsByRooms)
      .filter(filterPinsByGuests)
      .filter(filterPinsByFeatures);

    return filteredPins;
  };

  var filterChecked = function (it) {
    return it.checked === true;
  };

  var selectValue = function (it) {
    return it.value;
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
