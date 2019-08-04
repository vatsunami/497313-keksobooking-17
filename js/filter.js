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
  var filterWifi = filtersContainer.querySelector('#filter-wifi');
  var filterDishwasher = filtersContainer.querySelector('#filter-dishwasher');
  var filterParking = filtersContainer.querySelector('#filter-parking');
  var filterWasher = filtersContainer.querySelector('#filter-washer');
  var filterElevator = filtersContainer.querySelector('#filter-elevator');
  var filterConditioner = filtersContainer.querySelector('#filter-conditioner');

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

  var filterPinsByFeature = function (it, feature) {
    if (feature.checked) {
      return it.offer.features.indexOf(feature.value) !== -1;
    } else {
      return it;
    }
  };

  var filterPins = function () {
    var pins = window.receivedData.slice();
    var filteredPins = pins.filter(function (it) {
      return filterPinsByType(it) &&
      filterPinsByPrice(it) &&
      filterPinsByRooms(it) &&
      filterPinsByGuests(it) &&
      filterPinsByFeature(it, filterWifi) &&
      filterPinsByFeature(it, filterDishwasher) &&
      filterPinsByFeature(it, filterParking) &&
      filterPinsByFeature(it, filterWasher) &&
      filterPinsByFeature(it, filterElevator) &&
      filterPinsByFeature(it, filterConditioner);
    });
    return filteredPins;
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
