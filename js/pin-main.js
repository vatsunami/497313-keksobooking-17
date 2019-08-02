'use strict';

(function () {

  var PinMain = {
    WIDTH: 62,
    HEIGHT: 62,
    BOTTOM_TRIANGLE_HEIGHT: 18,
    MIN_X: 0,
    MIN_Y: 130,
    MAX_X: 1135,
    MAX_Y: 624,
    START_X: 570,
    START_Y: 375
  };

  var pinsContainer = document.querySelector('.map__pins');
  var pinMain = pinsContainer.querySelector('.map__pin--main');
  var formAdAddress = document.querySelector('#address');

  var getPinMainCoordinates = function () {
    var pinMainX = Math.round(pinMain.offsetLeft + PinMain.WIDTH / 2);
    var pinMainY = Math.round(pinMain.offsetTop + PinMain.HEIGHT + PinMain.BOTTOM_TRIANGLE_HEIGHT);
    var pinMainCoordinates = pinMainX + ', ' + pinMainY;
    return pinMainCoordinates;
  };

  var getPinMainCenterCoordinates = function () {
    var pinMainX = Math.round(pinMain.offsetLeft + PinMain.WIDTH / 2);
    var pinMainY = Math.round(pinMain.offsetTop + PinMain.HEIGHT / 2);
    var pinMainCenterCoordinates = pinMainX + ', ' + pinMainY;
    return pinMainCenterCoordinates;
  };

  var writePinMainCoordinates = function () {
    formAdAddress.value = getPinMainCoordinates();
  };

  var writePinMainCenterCoordinates = function () {
    formAdAddress.value = getPinMainCenterCoordinates();
  };

  var movePinMainToStartCoordinates = function () {
    pinMain.style.left = PinMain.START_X + 'px';
    pinMain.style.top = PinMain.START_Y + 'px';
  };

  pinMain.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    var dragged = false;

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onPinMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      dragged = true;

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var pinMainX = pinMain.offsetLeft - shift.x;
      var pinMainY = pinMain.offsetTop - shift.y;

      if (pinMainY < PinMain.MIN_Y) {
        pinMainY = PinMain.MIN_Y;
      }

      if (pinMainY > PinMain.MAX_Y) {
        pinMainY = PinMain.MAX_Y;
      }

      if (pinMainX < PinMain.MIN_X) {
        pinMainX = PinMain.MIN_X;
      }

      if (pinMainX > PinMain.MAX_X) {
        pinMainX = PinMain.MAX_X;
      }

      pinMain.style.top = pinMainY + 'px';
      pinMain.style.left = pinMainX + 'px';
    };

    var onPinMouseUp = function (upEvt) {
      upEvt.preventDefault();
      if (dragged) {
        window.page.activate();
        writePinMainCoordinates();
      }
      document.removeEventListener('mousemove', onPinMouseMove);
      document.removeEventListener('mouseup', onPinMouseUp);
    };
    document.addEventListener('mousemove', onPinMouseMove);
    document.addEventListener('mouseup', onPinMouseUp);
  });

  writePinMainCenterCoordinates();

  window.pinMain = {
    moveToStartCoordinates: movePinMainToStartCoordinates,
    writeCenterCoordinates: writePinMainCenterCoordinates,
    writeCoordinates: writePinMainCoordinates
  };

})();
