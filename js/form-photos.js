'use strict';

(function () {
  var AVATAR_DEFAULT_SOURCE = 'img/muffin-grey.svg';
  var PHOTO_SIZE = 70;
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var avatarContainer = document.querySelector('.ad-form-header__upload');
  var avatarPreview = avatarContainer.querySelector('.ad-form-header__preview img');
  var avatarFileChooser = avatarContainer.querySelector('#avatar');

  var photosContainer = document.querySelector('.ad-form__photo-container');
  var photoFileChooser = photosContainer.querySelector('#images');
  var photoTemplate = photosContainer.querySelector('.ad-form__photo');

  var createPhoto = function (source) {
    var photo = photoTemplate.cloneNode();
    var img = document.createElement('img');
    img.src = source;
    img.width = PHOTO_SIZE;
    img.height = PHOTO_SIZE;
    photo.appendChild(img);
    return photo;
  };

  var renderPhoto = function (source) {
    var fragment = document.createDocumentFragment();
    fragment.appendChild(createPhoto(source));
    photosContainer.insertBefore(fragment, photosContainer.children[1]);
  };

  var resetPhotosAndAvatar = function () {
    var photos = photosContainer.querySelectorAll('.ad-form__photo');
    photos.forEach(function (photo) {
      if (photo.querySelector('img')) {
        photo.remove();
      }
    });
    avatarPreview.src = AVATAR_DEFAULT_SOURCE;
  };

  var changeAvatar = function (data) {
    avatarPreview.src = data;
  };

  var uploadFiles = function (files, callback) {
    files.forEach(function (file) {
      var fileName = file.name.toLowerCase();
      var matches = FILE_TYPES.some(function (it) {
        return fileName.endsWith(it);
      });
      if (matches) {
        var reader = new FileReader();
        reader.addEventListener('load', function () {
          callback(reader.result);
        });
        reader.readAsDataURL(file);
      }
    });
  };

  var addChangeEventListener = function (fileChooser, callback) {
    fileChooser.addEventListener('change', function () {
      if (fileChooser.files.length > 0) {
        var files = [].slice.call(fileChooser.files);
        uploadFiles(files, callback);
      }
    });
  };

  var addEventsListeners = function (fileChooser, callback) {
    addChangeEventListener(fileChooser, callback);
  };

  addEventsListeners(avatarFileChooser, changeAvatar);
  addEventsListeners(photoFileChooser, renderPhoto);

  window.formPhotos = {
    reset: resetPhotosAndAvatar
  };

})();
