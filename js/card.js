'use strict';

(function () {

  var HousingType = {
    BUNGALO: 'Бунгало',
    FLAT: 'Квартира',
    HOUSE: 'Дом',
    PALACE: 'Квартира'
  };

  var cardsContainer = document.querySelector('.map__pins');
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
    card.querySelector('.popup__text--capacity').textContent = ad.offer.rooms + ' комнаты для ' + ad.offer.guests + ' гостей';
    card.querySelector('.popup__text--time').textContent = 'Заезд после ' + ad.offer.checkin + ', выезд до ' + ad.offer.checkout;
    card.querySelector('.popup__description').textContent = ad.offer.description;

    cardFeatures.innerHTML = '';
    cardPhotos.innerHTML = '';

    ad.offer.features.forEach(function (feature) {
      var listItem = document.createElement('li');
      listItem.className = 'popup__feature popup__feature--' + feature;
      cardFeatures.appendChild(listItem);
    });

    ad.offer.photos.forEach(function (photo, i) {
      var img = document.createElement('img');
      img.className = 'popup__photo';
      img.src = ad.offer.photos[i];
      img.alt = 'Фотография жилья';
      img.width = 45;
      img.height = 40;
      cardPhotos.appendChild(img);
    });

    cardButtonClose.addEventListener('click', onCardButtonCloseClick);
    document.addEventListener('keydown', onEscPress);

    return card;
  };

  var renderCard = function (advertisement) {
    var fragment = document.createDocumentFragment();
    fragment.appendChild(createCard(advertisement));
    cardsContainer.appendChild(fragment);
  };

  var removeCard = function () {
    if (cardsContainer.querySelector('.map__card')) {
      var card = cardsContainer.querySelector('.map__card');
      cardsContainer.removeChild(card);
      document.removeEventListener('keydown', onEscPress);
    }
  };

  var onEscPress = function (evt) {
    if (window.util.isEscPressed(evt)) {
      removeCard();
    }
  };

  var onCardButtonCloseClick = function () {
    removeCard();
  };

  window.card = {
    renderCard: renderCard,
    removeCard: removeCard
  };

})();
