'use strict';

(function () {

  var map = document.querySelector('.map');
  var formMap = map.querySelector('.map__filters');
  var formMapFilterGroups = formMap.querySelectorAll('select, fieldset');
  var formAd = document.querySelector('.ad-form');
  var formAdGroups = formAd.querySelectorAll('fieldset');
  var isPageActive = false;

  var switchDisabledAttrAllElements = function (elements, isDisabled) {
    elements.forEach(function (element) {
      element.disabled = isDisabled;
    });
  };

  var removeDisabledAttrAllMapFilters = function () {
    switchDisabledAttrAllElements(formMapFilterGroups, false);
  };

  var activatePage = function () {
    if (!isPageActive) {
      isPageActive = true;
      switchDisabledAttrAllElements(formAdGroups, false);
      window.data.receive();
      map.classList.remove('map--faded');
      formAd.classList.remove('ad-form--disabled');
      window.form.addEventListeners();
      window.formPhotos.addEventListeners();
      window.filter.addEventListener();
    }
  };

  var deactivatePage = function () {
    isPageActive = false;
    switchDisabledAttrAllElements(formAdGroups, true);
    switchDisabledAttrAllElements(formMapFilterGroups, true);
    map.classList.add('map--faded');
    formAd.classList.add('ad-form--disabled');
    window.pinMain.moveToStartCoordinates();
    window.pinMain.writeCenterCoordinates();
    window.card.remove();
    window.pins.remove();
    window.filter.reset();
    window.filter.removeEventListener();
    window.form.reset();
    window.formPhotos.reset();
    window.formPhotos.removeEventListeners();
    window.form.removeEventListeners();
  };

  switchDisabledAttrAllElements(formAdGroups, true);
  switchDisabledAttrAllElements(formMapFilterGroups, true);

  window.page = {
    activate: activatePage,
    deactivate: deactivatePage,
    removeDisabledAttrAllMapFilters: removeDisabledAttrAllMapFilters
  };

})();
