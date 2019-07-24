'use strict';

(function () {

  var filtersContainer = document.querySelector('.map__filters');
  var filters = filtersContainer.querySelectorAll('.map__filter, .map__checkbox');

  var onFilterChange = function (evt) {
    var target = evt.target;
    filters.forEach(function (it) {
      if (target === it) {
        window.setTimeout(function () {
          window.map.removePins();
          window.card.removeCard();
          window.map.updatePins();
        }, 500);
      }
    });
  };

  filtersContainer.addEventListener('change', onFilterChange);

})();
