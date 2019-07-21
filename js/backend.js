'use strict';

(function () {

  var URL_GET = 'https://js.dump.academy/keksobooking/data';
  var URL_POST = 'https://js.dump.academy/keksobooking';
  var METHOD_GET = 'GET';
  var METHOD_POST = 'POST';
  var TIMEOUT = 10000;
  var STATUS_OK = 200;

  var createXhr = function (method, url, onLoad, onError, data) {
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
    xhr.open(method, url);
    if (method === METHOD_GET) {
      xhr.send();
    }
    if (method === METHOD_POST && data) {
      xhr.send(data);
    }
  };

  var load = function (onLoad, onError) {
    createXhr(METHOD_GET, URL_GET, onLoad, onError);
  };

  var save = function (data, onLoad, onError) {
    createXhr(METHOD_POST, URL_POST, onLoad, onError, data);
  };

  window.backend = {
    load: load,
    save: save
  };

})();
