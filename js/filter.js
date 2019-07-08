'use strict';

(function () {

  var filterHousingType = document.querySelector('#housing-type');

  var onFilterHousingTypeChange = function () {
    window.map.removePins();
    window.map.updatePins();
  };

  filterHousingType.addEventListener('change', onFilterHousingTypeChange);
})();
