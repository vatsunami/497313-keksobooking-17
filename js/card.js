'use strict';

(function () {

  var HIDDEN_CLASS = 'visually-hidden';

  var HousingType = {
    BUNGALO: 'Бунгало',
    FLAT: 'Квартира',
    HOUSE: 'Дом',
    PALACE: 'Квартира'
  };

  var CardPhoto = {
    WIDTH: 45,
    HEIGHT: 40
  };

  var cardContainer = document.querySelector('.map__pins');
  var cardTemplate = document.querySelector('#card').content;

  var createCard = function (ad) {
    var card = cardTemplate.cloneNode(true);
    var cardFeatures = card.querySelector('.popup__features');
    var cardPhotos = card.querySelector('.popup__photos');
    var cardButtonClose = card.querySelector('.popup__close');
    card.querySelector('.popup__avatar').src = ad.author.avatar;
    card.querySelector('.popup__title').textContent = ad.offer.title;
    card.querySelector('.popup__text--address').textContent = ad.offer.address;
    card.querySelector('.popup__text--price').textContent = ad.offer.price + '₽/ночь';
    card.querySelector('.popup__type').textContent = HousingType[ad.offer.type.toUpperCase()];
    card.querySelector('.popup__text--capacity').textContent = ad.offer.rooms + ' комнат для ' + ad.offer.guests + ' гостей';
    card.querySelector('.popup__text--time').textContent = 'Заезд после ' + ad.offer.checkin + ', выезд до ' + ad.offer.checkout;
    card.querySelector('.popup__description').textContent = ad.offer.description;
    cardFeatures.innerHTML = '';
    cardPhotos.innerHTML = '';

    if (ad.offer.features.length !== 0) {
      ad.offer.features.forEach(function (feature) {
        var listItem = document.createElement('li');
        listItem.className = 'popup__feature popup__feature--' + feature;
        cardFeatures.appendChild(listItem);
      });
    } else {
      cardFeatures.classList.add(HIDDEN_CLASS);
    }

    if (ad.offer.photos.length !== 0) {
      ad.offer.photos.forEach(function (photo, i) {
        var img = document.createElement('img');
        img.className = 'popup__photo';
        img.src = ad.offer.photos[i];
        img.alt = 'Фотография жилья';
        img.width = CardPhoto.WIDTH;
        img.height = CardPhoto.HEIGHT;
        cardPhotos.appendChild(img);
      });
    } else {
      cardPhotos.classList.add(HIDDEN_CLASS);
    }

    cardButtonClose.addEventListener('click', onCardButtonCloseClick);
    document.addEventListener('keydown', onEscPress);
    return card;
  };

  var renderCard = function (advertisement) {
    if (advertisement.offer) {
      var fragment = document.createDocumentFragment();
      fragment.appendChild(createCard(advertisement));
      cardContainer.appendChild(fragment);
    }
  };

  var removeCard = function () {
    if (cardContainer.querySelector('.map__card')) {
      var card = cardContainer.querySelector('.map__card');
      cardContainer.removeChild(card);
      document.removeEventListener('keydown', onEscPress);
    }
  };

  var onEscPress = function (evt) {
    if (window.keyboard.isEscPressed(evt)) {
      removeCard();
    }
  };

  var onCardButtonCloseClick = function () {
    removeCard();
  };

  window.card = {
    render: renderCard,
    remove: removeCard
  };

})();
