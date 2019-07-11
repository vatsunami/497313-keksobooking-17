'use strict';

(function () {

  var ESC_KEYCODE = 27;

  window.util = {

    isEscPressed: function (evt) {
      return evt.keyCode === ESC_KEYCODE;
    }
  };

})();
