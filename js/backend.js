'use strict';

(function () {

  var URL_GET = 'https://js.dump.academy/keksobooking/data';
  var TIMEOUT = 10000;
  var STATUS_OK = 200

  var load = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === STATUS_OK) {
        onLoad(xhr.response);
      } else {
        onError();
      }
    });

    xhr.addEventListener('error', function () {
      onError();
    });

    xhr.addEventListener('timeout', function () {
      onError();
    });

    xhr.timeout = TIMEOUT;
    xhr.open('GET', URL_GET);
    xhr.send();
  };

  window.backend = {
    load: load
  };
})();
