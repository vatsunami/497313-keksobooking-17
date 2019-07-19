'use strict';

(function () {

  var onSuccess = function (data) {
    window.map.renderPins(data);
  };

  var onError = function () {
    window.message.showErrorMessage();
  };

  var loadData = function () {
    window.backend.load(onSuccess, onError);
  };

  window.data = {
    loadData: loadData
  };

})();
