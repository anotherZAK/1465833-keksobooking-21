'use strict';

(function () {
  const similarAdvertisementTemplate = document.querySelector(`#pin`).content;
  const similarAdvertisementItem = similarAdvertisementTemplate.querySelector(`.map__pin`);
  const similarPopupTemplate = document.querySelector(`#card`).content;
  const similarPopupItem = similarPopupTemplate.querySelector(`.map__card`);

  /**
   * формирует разметку с данными объявления
   * @param {Object} announcement - исходный объект с данными объявления
   * @return {Object} - объект html-разметки с модифицированными данными объявления
   */

  const makeHtmlAnnouncement = function (announcement) {
    const announcementElement = similarAdvertisementItem.cloneNode(true);
    const announcementImg = announcementElement.querySelector(`img`);

    announcementImg.src = announcement.author.avatar;
    announcementImg.alt = announcement.offer.title;
    announcementElement.style = `left: ${announcement.location.x}px; top: ${announcement.location.y}px`;

    return announcementElement;
  };

  /**
   * формирует разметку с данными карточки с информацией объявления
   * @param {Object} announcement - исходный объект с данными объявления
   * @return {Object} - объект html-разметки с модифицированными данными карточки
   */
  const makeHtmlPopup = function (announcement) {
    const popupElement = similarPopupItem.cloneNode(true);
    const popupTitle = popupElement.querySelector(`.popup__title`);
    const popupAddress = popupElement.querySelector(`.popup__text--address`);
    const popupPrice = popupElement.querySelector(`.popup__text--price`);
    const popupType = popupElement.querySelector(`.popup__type`);
    const popupGuestsCapacity = popupElement.querySelector(`.popup__text--capacity`);
    const popupTime = popupElement.querySelector(`.popup__text--time`);
    const popupFeatures = popupElement.querySelector(`.popup__features`);
    const popupDescription = popupElement.querySelector(`.popup__description`);
    const popupAvatar = popupElement.querySelector(`.popup__avatar`);
    const popupPhotos = popupElement.querySelector(`.popup__photos`);

    if (announcement.offer.title) {
      popupTitle.textContent = announcement.offer.title;
    } else {
      popupTitle.remove();
    }

    if (announcement.offer.address) {
      popupAddress.textContent = announcement.offer.address;
    } else {
      popupAddress.remove();
    }

    if (announcement.offer.price) {
      popupPrice.textContent = `${announcement.offer.price} ₽/ночь`;
    } else {
      popupPrice.remove();
    }

    if (announcement.offer.type) {
      switch (announcement.offer.type) {
        case `palace`:
          popupType.textContent = `Дворец`;
          break;
        case `flat`:
          popupType.textContent = `Квартира`;
          break;
        case `house`:
          popupType.textContent = `Дом`;
          break;
        case `bungalow`:
          popupType.textContent = `Бунгало`;
          break;
      }
    } else {
      popupType.remove();
    }

    if (announcement.offer.rooms && announcement.offer.guests) {
      popupGuestsCapacity.textContent = `${announcement.offer.rooms} комнаты для ${announcement.offer.guests} гостей`;
    } else {
      popupGuestsCapacity.remove();
    }

    if (announcement.offer.checkin && announcement.offer.checkout) {
      popupTime.textContent = `Заезд после ${announcement.offer.checkin}, выезд до ${announcement.offer.checkout}`;
    } else {
      popupTime.remove();
    }

    if (announcement.offer.features) {
      popupFeatures.textContent = ``;
      announcement.offer.features.forEach(function (feature) {
        const featureElement = document.createElement(`li`);
        featureElement.classList.add(`popup__feature`, `popup__feature--${feature}`);
        popupFeatures.append(featureElement);
      });
    } else {
      popupFeatures.remove();
    }

    if (announcement.offer.photos) {
      const photoNode = popupPhotos.querySelector(`.popup__photo`);
      popupPhotos.textContent = ``;
      announcement.offer.photos.forEach(function (photo) {
        const photoElement = photoNode.cloneNode(true);
        photoElement.src = photo;
        popupPhotos.append(photoElement);
      });
    } else {
      popupPhotos.remove();
    }

    if (announcement.offer.description) {
      popupDescription.textContent = announcement.offer.description;
    } else {
      popupDescription.remove();
    }

    if (announcement.author.avatar) {
      popupAvatar.src = announcement.author.avatar;
    } else {
      popupAvatar.remove();
    }

    return popupElement;
  };

  const mapPins = document.querySelector(`.map__pins`);


  /**
   * отображает данные (похожие объявления) при успешной загрузке
   * @param {Array} announcements - массив объектов с данными
   */
  const successHandlerLoad = function (announcements) {
    const pinsContainer = document.createDocumentFragment();

    announcements.forEach(function (item) {
      pinsContainer.appendChild(makeHtmlAnnouncement(item));
      pinsContainer.appendChild(makeHtmlPopup(item));
    });
    mapPins.appendChild(pinsContainer);
  };

  /**
   * отображает сообщение при неуспешной загрузке данных
   * @param {String} errorMessage - сообщение
   */
  const errorHandlerLoad = function (errorMessage) {
    const node = document.createElement(`div`);
    node.style = `z-index: 1; margin: 0 auto; text-align: center; background-color: tomato; border-width: 3px; border-style: solid; border-color: red;`;
    node.style.fontSize = `22px`;
    node.style.position = `fixed`;
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontWeight = `bold`;
    node.textContent = errorMessage;

    mapPins.appendChild(node);

  };

  window.backend.load(successHandlerLoad, errorHandlerLoad);
}());
