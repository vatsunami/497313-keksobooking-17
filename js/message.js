'use strict';

(function () {

  var renderMessage = function (status) {
    var mainBlock = document.querySelector('main');

    if (status === 'success') {
      var successTemplate = document.querySelector('#success').content.querySelector('.success');
      var success = successTemplate.cloneNode(true);
      mainBlock.appendChild(success);
    }

    if (status === 'error') {
      var errorTemplate = document.querySelector('#error').content.querySelector('.error');
      var error = errorTemplate.cloneNode(true);
      mainBlock.appendChild(error);
    }
  };

  var onSuccess = function () {
    renderMessage('success');
  };

  var onError = function () {
    renderMessage('error');
  };

  window.message = {
    onSuccess: onSuccess,
    onError: onError
  };

})();
