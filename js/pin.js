'use strict';

(function () {

  var PIN_MAIN_HEIGHT = 80;
  var PIN_MAIN_WIDTH = 65;
  var PIN_MIN_X = 0;
  var PIN_MAX_X = 1135;
  var PIN_MIN_Y = 130;
  var PIN_MAX_Y = 624;

  var pinsContainer = document.querySelector('.map__pins');
  var pinMain = pinsContainer.querySelector('.map__pin--main');
  var map = document.querySelector('.map');
  var formAd = document.querySelector('.ad-form');

  var onSuccess = function (ads) {
    pinsContainer.appendChild(window.map.generateFragment(ads));
  };

  var onError = function () {
    var mainBlock = document.querySelector('main');
    var errorTemplate = document.querySelector('#error').content.querySelector('.error');
    var error = errorTemplate.cloneNode(true);
    mainBlock.appendChild(error);
  };

  var activatePage = function () {
    window.backend.load(onSuccess, onError);
    map.classList.remove('map--faded');
    formAd.classList.remove('ad-form--disabled');
    window.form.switchDisabledAttrAll(false);
  };

  var getPinMainCoordinates = function () {
    var pinMainX = Math.round(pinMain.offsetLeft + PIN_MAIN_WIDTH / 2);
    var pinMainY = Math.round(pinMain.offsetTop + PIN_MAIN_HEIGHT);
    var pinMainCoordinates = pinMainX + ', ' + pinMainY;
    return pinMainCoordinates;
  };

  pinMain.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onPinMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      pinMain.style.left = (pinMain.offsetLeft - shift.x) + 'px';
      pinMain.style.top = (pinMain.offsetTop - shift.y) + 'px';

      if (moveEvt.pageX < map.offsetLeft + PIN_MAIN_WIDTH) {
        pinMain.style.left = PIN_MIN_X + 'px';
      }
      if (moveEvt.pageX > map.offsetLeft + PIN_MAX_X) {
        pinMain.style.left = PIN_MAX_X + 'px';
      }
      if (moveEvt.pageY < PIN_MIN_Y) {
        pinMain.style.top = PIN_MIN_Y + 'px';
      }
      if (moveEvt.pageY > PIN_MAX_Y) {
        pinMain.style.top = PIN_MAX_Y + 'px';
      }
    };

    var onPinMouseUp = function (upEvt) {
      upEvt.preventDefault();
      activatePage();
      window.form.writePinMainCoordinates();

      document.removeEventListener('mousemove', onPinMouseMove);
      document.removeEventListener('mouseup', onPinMouseUp);
    };

    document.addEventListener('mousemove', onPinMouseMove);
    document.addEventListener('mouseup', onPinMouseUp);
  });

  window.pin = {
    getPinMainCoordinates: getPinMainCoordinates
  };
})();
