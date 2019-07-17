'use strict';

(function () {

  var map = document.querySelector('.map');
  var formAd = document.querySelector('.ad-form');

  var activatePage = function () {
    window.map.getData();
    map.classList.remove('map--faded');
    formAd.classList.remove('ad-form--disabled');
    window.form.switchDisabledAttrAll(false);
  };

  var deactivatePage = function () {
    map.classList.add('map--faded');
    formAd.classList.add('ad-form--disabled');
    window.form.switchDisabledAttrAll(true);
  };

  window.page = {
    activatePage: activatePage,
    deactivatePage: deactivatePage
  };

})();
