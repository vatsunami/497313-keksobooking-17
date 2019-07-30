'use strict';

(function () {

  var map = document.querySelector('.map');
  var formMap = map.querySelector('.map__filters');
  var formMapFilterGroups = formMap.querySelectorAll('select, fieldset');
  var formAd = document.querySelector('.ad-form');
  var formAdGroups = formAd.querySelectorAll('fieldset');
  var isPageActive = false;

  var switchDisabledAttrAllElements = function (elements, isDisabled) {
    for (var i = 0; i < elements.length; i++) {
      elements[i].disabled = isDisabled;
    }
  };

  var switchDisabledAttrAllFormElements = function (isDisabled) {
    switchDisabledAttrAllElements(formMapFilterGroups, isDisabled);
    switchDisabledAttrAllElements(formAdGroups, isDisabled);
  };

  var activatePage = function () {
    if (!isPageActive) {
      isPageActive = true;
      switchDisabledAttrAllFormElements(false);
      window.data.receive();
      map.classList.remove('map--faded');
      formAd.classList.remove('ad-form--disabled');
    }
  };

  var deactivatePage = function () {
    isPageActive = false;
    switchDisabledAttrAllFormElements(true);
    map.classList.add('map--faded');
    formAd.classList.add('ad-form--disabled');
    window.pinMain.moveToStartCoordinates();
    window.pinMain.writeCenterCoordinates();
    window.card.remove();
    window.pins.remove();
    window.filter.reset();
    window.form.reset();
    window.formPhotos.reset();
  };

  switchDisabledAttrAllFormElements(true);

  window.page = {
    activate: activatePage,
    deactivate: deactivatePage
  };

})();
