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
    formPrice.min = formPrice.placeholder;
    formTimeIn.value = startFormValues.time;
    formTimeOut.value = startFormValues.time;
    formRooms.value = startFormValues.rooms;
    formCapacity.value = startFormValues.capacity;
    formDescription.value = startFormValues.description;
    formFeatures.forEach(function (feature) {
      feature.checked = false;
    });
    formTitle.style.borderColor = '';
    formPrice.style.borderColor = '';
    formCapacity.style.borderColor = '';
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

  var checkFormCapacity = function () {
    if ((formRooms.value === '100' && formCapacity.value !== '0') ||
    (formRooms.value !== '100' && formCapacity.value === '0') ||
    (formRooms.value < formCapacity.value)) {
      formCapacity.setCustomValidity('Недопустимое значение');
    } else {
      formCapacity.setCustomValidity('');
    }
  };

  var onFormCapacityChange = function () {
    checkFormCapacity();
  };

  var onFormRoomsChange = function () {
    checkFormCapacity();
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

  var highlightField = function (element) {
    element.style.borderColor = '#f00';
  };

  var unhighlightField = function (element) {
    element.style.borderColor = '';
  };

  var checkValidity = function (formElement) {
    if (!formElement.validity.valid) {
      highlightField(formElement);
    } else {
      unhighlightField(formElement);
    }
  };

  var onFormButtonSubmitClick = function () {
    checkFormCapacity();
    checkValidity(formTitle);
    checkValidity(formPrice);
    checkValidity(formCapacity);
  };

  var addFormEventListeners = function () {
    formType.addEventListener('change', onFormTypeChange);
    formTimeIn.addEventListener('change', onFormTimeChange);
    formTimeOut.addEventListener('change', onFormTimeChange);
    formRooms.addEventListener('change', onFormRoomsChange);
    formCapacity.addEventListener('change', onFormCapacityChange);
    formButtonReset.addEventListener('click', onFormButtonResetClick);
    form.addEventListener('submit', onFormButtonSubmit);
    formButtonSubmit.addEventListener('click', onFormButtonSubmitClick);
  };

  var removeFormEventListeners = function () {
    formType.removeEventListener('change', onFormTypeChange);
    formTimeIn.removeEventListener('change', onFormTimeChange);
    formTimeOut.removeEventListener('change', onFormTimeChange);
    formRooms.removeEventListener('change', onFormRoomsChange);
    formCapacity.removeEventListener('change', onFormCapacityChange);
    formButtonReset.removeEventListener('click', onFormButtonResetClick);
    form.removeEventListener('submit', onFormButtonSubmit);
    formButtonSubmit.removeEventListener('click', onFormButtonSubmitClick);
  };

  window.form = {
    reset: resetFormData,
    addEventListeners: addFormEventListeners,
    removeEventListeners: removeFormEventListeners
  };

})();
