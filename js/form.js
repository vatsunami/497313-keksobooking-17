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
    type: 'flat',
    price: '',
    time: '12:00',
    rooms: 1,
    capacity: 1,
    description: ''
  };

  var form = document.querySelector('.ad-form');
  var formTitle = form.querySelector('#title');
  var formType = form.querySelector('#type');
  var formPrice = form.querySelector('#price');
  var formTimeIn = form.querySelector('#timein');
  var formTimeOut = form.querySelector('#timeout');
  var formRooms = form.querySelector('#room_number');
  var formCapacity = form.querySelector('#capacity');
  var formDescription = form.querySelector('#description');
  var formButtonSubmit = form.querySelector('.ad-form__submit');
  var formButtonReset = form.querySelector('.ad-form__reset');
  var formFeatures = form.querySelectorAll('.feature__checkbox');

  var resetFormData = function () {
    formTitle.value = startFormValues.title;
    formType.value = startFormValues.type;
    formPrice.value = startFormValues.price;
    formPrice.placeholder = OFFERS.flat;
    formTimeIn.value = startFormValues.time;
    formTimeOut.value = startFormValues.time;
    formRooms.value = startFormValues.rooms;
    formCapacity.value = startFormValues.capacity;
    formDescription.value = startFormValues.description;
    formFeatures.forEach(function (feature) {
      feature.checked = false;
    });
  };

  var onFormTypeChange = function (evt) {
    var target = evt.target;
    var price = OFFERS[target.value];
    formPrice.placeholder = price;
    formPrice.min = price;
  };

  var onFormTimeChange = function (evt) {
    var target = evt.target;
    if (target === formTimeIn) {
      formTimeOut.value = target.value;
    } else {
      formTimeIn.value = target.value;
    }
  };

  var onFormRoomsAndCapacityChange = function () {
    if ((formRooms.value === '100' && formCapacity.value !== '0') ||
    (formRooms.value !== '100' && formCapacity.value === '0') ||
    (formRooms.value < formCapacity.value)) {
      formCapacity.setCustomValidity('Недопустимое значение');
    } else {
      formCapacity.setCustomValidity('');
    }
  };

  var onSuccess = function () {
    formButtonSubmit.disabled = false;
    window.page.deactivate();
    window.message.showSuccess();
  };

  var onError = function () {
    formButtonSubmit.disabled = false;
    window.message.showError();
  };

  var onFormButtonSubmit = function (evtSubmit) {
    evtSubmit.preventDefault();
    formButtonSubmit.disabled = true;
    window.backend.save(new FormData(form), onSuccess, onError);
  };

  var onFormButtonResetClick = function () {
    window.page.deactivate();
  };

  formType.addEventListener('change', onFormTypeChange);
  formTimeIn.addEventListener('change', onFormTimeChange);
  formTimeOut.addEventListener('change', onFormTimeChange);
  formRooms.addEventListener('change', onFormRoomsAndCapacityChange);
  formCapacity.addEventListener('change', onFormRoomsAndCapacityChange);
  formButtonReset.addEventListener('click', onFormButtonResetClick);
  form.addEventListener('submit', onFormButtonSubmit);

  window.form = {
    reset: resetFormData
  };

})();
