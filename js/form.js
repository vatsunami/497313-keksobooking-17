'use strict';

(function () {

  var formMapFilter = document.querySelector('.map__filters');
  var formMapFilterGroups = formMapFilter.querySelectorAll('select, fieldset');
  var formAd = document.querySelector('.ad-form');
  var formAdGroups = formAd.querySelectorAll('fieldset');
  var formAdAddress = formAd.querySelector('#address');
  var formAdType = formAd.querySelector('#type');
  var formAdPrice = formAd.querySelector('#price');
  var formAdTimeIn = formAd.querySelector('#timein');
  var formAdTimeOut = formAd.querySelector('#timeout');

  var switchDisabledAttr = function (formElements, isDisabled) {
    for (var i = 0; i < formElements.length; i++) {
      formElements[i].disabled = isDisabled;
    }
  };

  var switchDisabledAttrAll = function (isDisabled) {
    switchDisabledAttr(formAdGroups, isDisabled);
    switchDisabledAttr(formMapFilterGroups, isDisabled);
  };

  switchDisabledAttrAll(true);

  var writePinMainCoordinates = function () {
    formAdAddress.value = window.pin.getPinMainCoordinates();
  };

  writePinMainCoordinates();

  var onChangeFormAdType = function (evt) {
    var target = evt.target;
    var price = window.data.OFFERS[target.value];
    formAdPrice.placeholder = price;
    formAdPrice.min = price;
  };

  var onChangeFormAdTime = function (evt) {
    var target = evt.target;
    if (target === formAdTimeIn) {
      formAdTimeOut.value = target.value;
    } else {
      formAdTimeIn.value = target.value;
    }
  };

  formAdType.addEventListener('change', onChangeFormAdType);
  formAdTimeIn.addEventListener('change', onChangeFormAdTime);
  formAdTimeOut.addEventListener('change', onChangeFormAdTime);

  window.form = {
    switchDisabledAttrAll: switchDisabledAttrAll,
    writePinMainCoordinates: writePinMainCoordinates
  };
})();
