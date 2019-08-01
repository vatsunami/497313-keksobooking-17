'use strict';

(function () {

  var onSuccess = function (data) {
    window.receivedData = data;
    window.pins.render(data);
    window.page.removeDisabledAttrAllMapFilters();
  };

  var onError = function () {
    window.message.showError();
  };

  var receiveData = function () {
    window.backend.load(onSuccess, onError);
  };

  window.data = {
    receive: receiveData
  };

})();
