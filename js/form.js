'use strict';

(function () {

  var OFFERS = {
    bungalo: 0,
    flat: 1000,
    house: 5000,
    palace: 10000
  };

  var formMapFilter = document.querySelector('.map__filters');
  var formMapFilterGroups = formMapFilter.querySelectorAll('select, fieldset');
  var formAd = document.querySelector('.ad-form');
  var formAdGroups = formAd.querySelectorAll('fieldset');
  var formAdAddress = formAd.querySelector('#address');
  var formAdType = formAd.querySelector('#type');
  var formAdPrice = formAd.querySelector('#price');
  var formAdTimeIn = formAd.querySelector('#timein');
  var formAdTimeOut = formAd.querySelector('#timeout');
  var formAdRooms = formAd.querySelector('#room_number');
  var formAdCapacity = formAd.querySelector('#capacity');

  var switchDisabledAttr = function (formElements, isDisabled) {
    for (var i = 0; i < formElements.length; i++) {
      formElements[i].disabled = isDisabled;
    }
  };

  var switchDisabledAttrAll = function (isDisabled) {
    switchDisabledAttr(formAdGroups, isDisabled);
    switchDisabledAttr(formMapFilterGroups, isDisabled);
  };

  var writePinMainCoordinates = function () {
    formAdAddress.value = window.pin.getPinMainCoordinates();
  };

  var onFormAdTypeChange = function (evt) {
    var target = evt.target;
    var price = OFFERS[target.value];
    formAdPrice.placeholder = price;
    formAdPrice.min = price;
  };

  var onFormAdTimeChange = function (evt) {
    var target = evt.target;
    if (target === formAdTimeIn) {
      formAdTimeOut.value = target.value;
    } else {
      formAdTimeIn.value = target.value;
    }
  };

  var checkFormAdRoomsAndCapacityValues = function () {
    if (formAdRooms.value < formAdCapacity.value) {
      formAdCapacity.setCustomValidity('Недопустимое значение');
    } else {
      formAdCapacity.setCustomValidity('');
    }
  };

  var onFormAdRoomsAndCapacityChange = function () {
    if ((formAdRooms.value === '100' && formAdCapacity.value !== '0') ||
    (formAdRooms.value !== '100' && formAdCapacity.value === '0') ||
    (formAdRooms.value < formAdCapacity.value)) {
      formAdCapacity.setCustomValidity('Недопустимое значение');
    } else {
      formAdCapacity.setCustomValidity('');
    }
  };

  checkFormAdRoomsAndCapacityValues();
  switchDisabledAttrAll(true);
  writePinMainCoordinates();

  formAdType.addEventListener('change', onFormAdTypeChange);
  formAdTimeIn.addEventListener('change', onFormAdTimeChange);
  formAdTimeOut.addEventListener('change', onFormAdTimeChange);
  formAdRooms.addEventListener('change', onFormAdRoomsAndCapacityChange);
  formAdCapacity.addEventListener('change', onFormAdRoomsAndCapacityChange);

  window.form = {
    switchDisabledAttrAll: switchDisabledAttrAll,
    writePinMainCoordinates: writePinMainCoordinates
  };
})();
