'use strict';

(function () {

  var map = document.querySelector('.map');
  var formAd = document.querySelector('.ad-form');
  var isPageActive = false;

  var activatePage = function () {
    if (!isPageActive) {
      isPageActive = true;
      window.data.loadData();
      map.classList.remove('map--faded');
      formAd.classList.remove('ad-form--disabled');
      window.form.switchDisabledAttrAll(false);
    }
  };

  var deactivatePage = function () {
    isPageActive = false;
    map.classList.add('map--faded');
    formAd.classList.add('ad-form--disabled');
    window.pin.movePinMainToStartCoordinates();
    window.form.switchDisabledAttrAll(true);
    window.form.resetFormData();
    window.card.removeCard();
    window.map.removePins();
  };

  window.page = {
    activatePage: activatePage,
    deactivatePage: deactivatePage
  };

})();
