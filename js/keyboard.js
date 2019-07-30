'use strict';

(function () {

  var ESC_KEYCODE = 27;

  window.keyboard = {

    isEscPressed: function (evt) {
      return evt.keyCode === ESC_KEYCODE;
    }
  };

})();
