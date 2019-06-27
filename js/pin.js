'use strict';

(function () {

  var PIN_MAIN_HEIGHT = 80;
  var PIN_MAIN_WIDTH = 65;
  var NUMBER_OF_ADS = 8;

  var pinsContainer = document.querySelector('.map__pins');
  var pinMain = pinsContainer.querySelector('.map__pin--main');
  var map = document.querySelector('.map');
  var formAd = document.querySelector('.ad-form');
  var ads = window.map.generateAds(NUMBER_OF_ADS);

  var activatePage = function () {
    pinsContainer.appendChild(window.map.generateFragment(ads));
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

      var pinMainMinX = pinsContainer.offsetLeft;
      var pinMainMaxX = pinsContainer.offsetWidth - PIN_MAIN_WIDTH;
      var pinMainMaxY = pinsContainer.offsetHeight - PIN_MAIN_HEIGHT;

      if (moveEvt.pageX < map.offsetLeft + PIN_MAIN_WIDTH) {
        pinMain.style.left = pinMainMinX + 'px';
      }
      if (moveEvt.pageX > map.offsetLeft + pinsContainer.offsetWidth - PIN_MAIN_WIDTH) {
        pinMain.style.left = pinMainMaxX + 'px';
      }
      if (moveEvt.pageY < window.data.PIN_MIN_Y) {
        pinMain.style.top = window.data.PIN_MIN_Y + 'px';
      }
      if (moveEvt.pageY > pinMainMaxY) {
        pinMain.style.top = pinMainMaxY + 'px';
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
