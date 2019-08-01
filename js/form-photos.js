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
    var photosArray = [].slice.call(photos);
    photosArray.filter(function (photo) {
      return photo.firstChild;
    }).forEach(function (photo) {
      photo.remove();
    });
    avatarPreview.src = AVATAR_DEFAULT_SOURCE;
    avatarFileChooser.value = '';
    photoFileChooser.value = '';
  };

  var changeAvatar = function (data) {
    avatarPreview.src = data;
  };

  var onAvatarFileChooserChange = function () {
    getFiles(avatarFileChooser, changeAvatar);
  };

  var onPhotoFileChooserChange = function () {
    getFiles(photoFileChooser, renderPhoto);
  };

  var getFiles = function (fileChooser, callback) {
    if (fileChooser.files.length > 0) {
      var files = [].slice.call(fileChooser.files);
      uploadFiles(files, callback);
    }
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

  var addEventListeners = function () {
    avatarFileChooser.addEventListener('change', onAvatarFileChooserChange);
    photoFileChooser.addEventListener('change', onPhotoFileChooserChange);
  };

  var removeEventListeners = function () {
    avatarFileChooser.removeEventListener('change', onAvatarFileChooserChange);
    photoFileChooser.removeEventListener('change', onPhotoFileChooserChange);
  };

  window.formPhotos = {
    reset: resetPhotosAndAvatar,
    addEventListeners: addEventListeners,
    removeEventListeners: removeEventListeners
  };

})();
