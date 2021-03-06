'use strict';

const HouseType = {
  palace: `Дворец`,
  flat: `Квартира`,
  house: `Дом`,
  bungalow: `Бунгало`
};

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

  if (announcement && announcement.offer.title) {
    popupTitle.textContent = announcement.offer.title;
  } else {
    popupTitle.remove();
  }

  if (announcement && announcement.offer.address) {
    popupAddress.textContent = announcement.offer.address;
  } else {
    popupAddress.remove();
  }

  if (announcement && announcement.offer.price) {
    popupPrice.textContent = `${announcement.offer.price} ₽/ночь`;
  } else {
    popupPrice.remove();
  }

  if (announcement && Object.keys(HouseType).includes(announcement.offer.type)) {
    popupType.textContent = HouseType[announcement.offer.type];
  } else {
    popupType.remove();
  }

  if (announcement && announcement.offer.rooms && announcement.offer.guests) {
    popupGuestsCapacity.textContent = `${announcement.offer.rooms} комнаты для ${announcement.offer.guests} гостей`;
  } else {
    popupGuestsCapacity.remove();
  }

  if (announcement && announcement.offer.checkin && announcement.offer.checkout) {
    popupTime.textContent = `Заезд после ${announcement.offer.checkin}, выезд до ${announcement.offer.checkout}`;
  } else {
    popupTime.remove();
  }

  if (announcement && announcement.offer.features) {
    popupFeatures.textContent = ``;
    announcement.offer.features.forEach(function (feature) {
      const featureElement = document.createElement(`li`);
      featureElement.classList.add(`popup__feature`, `popup__feature--${feature}`);
      popupFeatures.append(featureElement);
    });
  } else {
    popupFeatures.remove();
  }

  if (announcement && announcement.offer.photos) {
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

  if (announcement && announcement.offer.description) {
    popupDescription.textContent = announcement.offer.description;
  } else {
    popupDescription.remove();
  }

  if (announcement && announcement.author.avatar) {
    popupAvatar.src = announcement.author.avatar;
  } else {
    popupAvatar.remove();
  }

  return popupElement;
};

/**
 * формирует разметку для изображения
 * @param {Object} element - блок для вывода изображения
 * @param {Object} readerObject - экземпляр FileReader
 */
const makeHtmlPreview = function (element, readerObject) {
  if (element.tagName === `DIV`) {
    let previewImg = document.createElement(`img`);
    previewImg.style.width = getComputedStyle(element).width;
    previewImg.alt = `Фотография жилья`;
    previewImg.src = readerObject.result;
    element.appendChild(previewImg);
  } else {
    element.src = readerObject.result;
  }
};

window.markup = {
  makeHtmlAnnouncement,
  makeHtmlPopup,
  makeHtmlPreview
};
