'use strict';

(function () {
  var mainBlock = document.querySelector('main');

  var removeMessage = function () {
    var lastChild = mainBlock.lastChild;
    mainBlock.removeChild(lastChild);
    document.removeEventListener('click', onDocumentClick);
    document.removeEventListener('keydown', onEscPress);
  };

  var onDocumentClick = function () {
    removeMessage();
  };

  var onEscPress = function (evt) {
    if (window.util.isEscPressed(evt)) {
      removeMessage();
    }
  };

  var onErrorButtonClick = function () {
    removeMessage();
  };

  var renderMessage = function (status) {
    var template;
    var message;
    if (status === 'success') {
      template = document.querySelector('#success').content.querySelector('.success');
      message = template.cloneNode(true);
    }
    if (status === 'error') {
      template = document.querySelector('#error').content.querySelector('.error');
      message = template.cloneNode(true);
      var errorButton = message.querySelector('.error__button');
      errorButton.addEventListener('click', onErrorButtonClick);
    }
    document.addEventListener('click', onDocumentClick);
    document.addEventListener('keydown', onEscPress);
    mainBlock.appendChild(message);
  };

  var showSuccessMessage = function () {
    renderMessage('success');
  };

  var showErrorMessage = function () {
    renderMessage('error');
  };

  window.message = {
    showSuccessMessage: showSuccessMessage,
    showErrorMessage: showErrorMessage
  };

})();
