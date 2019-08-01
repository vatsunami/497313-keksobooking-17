'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var mainBlock = document.querySelector('main');
  var templateSuccess = document.querySelector('#success').content.querySelector('.success');
  var templateError = document.querySelector('#error').content.querySelector('.error');
  var errorButton = templateError.querySelector('.error__button');

  var renderMessage = function (status) {
    var template;
    var message;
    if (status === 'success') {
      template = templateSuccess;
      message = template.cloneNode(true);
    }
    if (status === 'error') {
      template = templateError;
      message = template.cloneNode(true);
      errorButton.addEventListener('click', onErrorButtonClick);
    }
    document.addEventListener('click', onDocumentClick);
    document.addEventListener('keydown', onEscPress);
    mainBlock.appendChild(message);
  };

  var removeMessage = function () {
    var lastChild = mainBlock.lastChild;
    if (lastChild.classList.contains('success') || lastChild.classList.contains('error')) {
      mainBlock.removeChild(lastChild);
    }
    document.removeEventListener('click', onDocumentClick);
    document.removeEventListener('keydown', onEscPress);
  };

  var onDocumentClick = function () {
    removeMessage();
  };

  var onEscPress = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      removeMessage();
    }
  };

  var onErrorButtonClick = function () {
    removeMessage();
  };

  var showSuccessMessage = function () {
    renderMessage('success');
  };

  var showErrorMessage = function () {
    renderMessage('error');
  };

  window.message = {
    showSuccess: showSuccessMessage,
    showError: showErrorMessage
  };

})();
