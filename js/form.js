'use strict';

(function () {

  var OFFERS = {
    bungalo: 0,
    flat: 1000,
    house: 5000,
    palace: 10000
  };

  var startFormValues = {
    title: '',
    address: '',
    type: 'flat',
    price: 1000,
    time: '12:00',
    rooms: 1,
    capacity: 1
  };

  var formMapFilter = document.querySelector('.map__filters');
  var formMapFilterGroups = formMapFilter.querySelectorAll('select, fieldset');
  var formAd = document.querySelector('.ad-form');
  var formAdGroups = formAd.querySelectorAll('fieldset');
  // var formAdTitle = formAd.querySelector('#title');
  var formAdType = formAd.querySelector('#type');
  var formAdPrice = formAd.querySelector('#price');
  var formAdTimeIn = formAd.querySelector('#timein');
  var formAdTimeOut = formAd.querySelector('#timeout');
  var formAdRooms = formAd.querySelector('#room_number');
  var formAdCapacity = formAd.querySelector('#capacity');
  // var formAdButtonSubmit = formAd.querySelector('.ad-form__submit');
  var formAdButtonReset = formAd.querySelector('.ad-form__reset');

  var resetFormData = function () {
    formAdType.value = startFormValues.title;
    formAdPrice.value = startFormValues.type;
    formAdTimeIn.value = startFormValues.time;
    formAdTimeOut.value = startFormValues.time;
    formAdRooms.value = startFormValues.rooms;
    formAdCapacity.value = startFormValues.capacity;
  };

  var switchDisabledAttr = function (formElements, isDisabled) {
    for (var i = 0; i < formElements.length; i++) {
      formElements[i].disabled = isDisabled;
    }
  };

  var switchDisabledAttrAll = function (isDisabled) {
    switchDisabledAttr(formAdGroups, isDisabled);
    switchDisabledAttr(formMapFilterGroups, isDisabled);
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

  var onFormAdRoomsAndCapacityChange = function () {
    if ((formAdRooms.value === '100' && formAdCapacity.value !== '0') ||
    (formAdRooms.value !== '100' && formAdCapacity.value === '0') ||
    (formAdRooms.value < formAdCapacity.value)) {
      formAdCapacity.setCustomValidity('Недопустимое значение');
    } else {
      formAdCapacity.setCustomValidity('');
    }
  };

  var onFormAdButtonSubmit = function (evtSubmit) {
    evtSubmit.preventDefault();
    window.message.onSuccess();
  };

  var onFormAdButtonResetClick = function () {
    resetFormData();
  };

  formAdType.addEventListener('change', onFormAdTypeChange);
  formAdTimeIn.addEventListener('change', onFormAdTimeChange);
  formAdTimeOut.addEventListener('change', onFormAdTimeChange);
  formAdRooms.addEventListener('change', onFormAdRoomsAndCapacityChange);
  formAdCapacity.addEventListener('change', onFormAdRoomsAndCapacityChange);
  formAdButtonReset.addEventListener('click', onFormAdButtonResetClick);
  formAd.addEventListener('submit', onFormAdButtonSubmit);

  switchDisabledAttrAll(true);

  window.form = {
    switchDisabledAttrAll: switchDisabledAttrAll,
    resetFormData: resetFormData
  };

})();
