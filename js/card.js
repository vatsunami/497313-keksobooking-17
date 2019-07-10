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

    card.querySelector('.popup__avatar').src = ad.author.avatar;
    card.querySelector('.popup__title').textContent = ad.offer.title;
    card.querySelector('.popup__text--address').textContent = ad.offer.address;
    card.querySelector('.popup__text--price').textContent = ad.offer.price + '₽/ночь';
    card.querySelector('.popup__type').textContent = HousingType[ad.offer.type.toUpperCase()];
    card.querySelector('.popup__text--capacity').textContent = ad.offer.rooms + ' комнаты ' + ad.offer.guests + ' гостей';
    card.querySelector('.popup__text--time').textContent = 'Заезд после ' + ad.offer.checkin + ', выезд до ' + ad.offer.checkout;
    card.querySelector('.popup__description').textContent = ad.offer.description;

    var cardFeatures = card.querySelector('.popup__features');
    var cardPhotos = card.querySelector('.popup__photos');
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
    return card;
  };

  var renderCard = function (advertisements) {
    var fragment = document.createDocumentFragment();
    advertisements.slice(0, 1).forEach(function (it) {
      fragment.appendChild(createCard(it));
    });
    cardsContainer.appendChild(fragment);
  };

  window.card = {
    renderCard: renderCard
  };

})();
