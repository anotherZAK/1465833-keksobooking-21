'use strict';

const NUMBER_OF_ADVERTISEMENT = 8;

/**
 * выбирает случайный индекс массива или случайное число из заданного диапазона
 * @param {Array, number} arrayOrNumber - исходный массив или верхний диапазон
 * @param {number} min - диапазон
 * @return {number} - случайный индекс или случайное число
 */

const getRandomNumber = function (arrayOrNumber, min = 0) {
  let randomNumber = 0;

  if (typeof (arrayOrNumber) === `number`) {
    randomNumber = Math.floor(Math.random() * arrayOrNumber);
  } else {
    const arrayLength = arrayOrNumber.length;
    randomNumber = Math.floor(Math.random() * (arrayLength - min)) + min;
  }

  return randomNumber;
};

/**
 * выбирает случайный элемент из массива
 * @param {Array} array - исходный массив
 * @return {string} - случайный элемент массива
 */

const getRandomElementFromArray = function (array) {
  return array[getRandomNumber(array)];
};

/**
 * формирует моки для тестирования
 * @param {number} indexNumber - порядковый индекс
 * @return {Object} - объект с данными объявления
 */

const generateMockData = function (indexNumber) {
  const ADVERTISEMENT_DATA = {
    TITLES: [
      `Старинный дворец`,
      `Обычная квартира`,
      `Квартира в новостройке`,
      `Загородный дом`,
      `Старая дача`,
      `Домик в деревне`,
      `Хижина в лесу`,
      `Дом на пляже`
    ],
    TYPES: [
      `palace`,
      `flat`,
      `house`,
      `bungalow`
    ],
    ADDRESS: [
      `650`,
      `350`
    ],
    ROOMS: [
      1,
      2,
      3
    ],
    GUESTS: [
      1,
      2,
      3
    ],
    CHECKIN: [
      `12:00`,
      `13:00`,
      `14:00`
    ],
    CHECKOUT: [
      `12:00`,
      `13:00`,
      `14:00`
    ],
    FEATURES: [
      `wifi`,
      `dishwasher`,
      `parking`,
      `washer`,
      `elevator`,
      `conditioner`
    ],
    DESCRIPTION: [
      `Для ценителей истории и роскоши`,
      `Уютная и небольшае жилплощадь`,
      `Двухкомнатная квартира с евроремонтом`,
      `Стильный дом по индивидуальному архитектурному проекту`,
      `Условия проживания неприхотливые. Протекает крыша`,
      `Как у бабушки в детстве`,
      `Острые ощущения обеспечены`,
      `Райский уголок с видом на закат`
    ],
    PHOTOS: [
      `http://o0.github.io/assets/images/tokyo/hotel1.jpg`,
      `http://o0.github.io/assets/images/tokyo/hotel2.jpg`,
      `http://o0.github.io/assets/images/tokyo/hotel3.jpg`
    ],
    PRICE_MAX: 1000000,
    X_MAX: 1200,
    Y_MIN: 130,
    Y_MAX: 630,
    X_SHIFT: 25,
    Y_SHIFT: 70,

    generateAdvertisementData() {
      let advertisementData = {};
      advertisementData.author = {};
      advertisementData.offer = {};
      advertisementData.location = {};

      advertisementData.author.avatar = `img/avatars/user0${indexNumber}.png`;
      advertisementData.offer.title = getRandomElementFromArray(ADVERTISEMENT_DATA.TITLES);
      advertisementData.offer.address = `${ADVERTISEMENT_DATA.ADDRESS[0]}, ${ADVERTISEMENT_DATA.ADDRESS[1]}`;
      advertisementData.offer.price = getRandomNumber(ADVERTISEMENT_DATA.PRICE_MAX);
      advertisementData.offer.type = getRandomElementFromArray(ADVERTISEMENT_DATA.TYPES);
      advertisementData.offer.rooms = getRandomElementFromArray(ADVERTISEMENT_DATA.ROOMS);
      advertisementData.offer.guests = getRandomElementFromArray(ADVERTISEMENT_DATA.GUESTS);
      advertisementData.offer.checkin = getRandomElementFromArray(ADVERTISEMENT_DATA.CHECKIN);
      advertisementData.offer.checkout = getRandomElementFromArray(ADVERTISEMENT_DATA.CHECKOUT);
      advertisementData.offer.features = ADVERTISEMENT_DATA.FEATURES.slice(getRandomNumber(ADVERTISEMENT_DATA.FEATURES));
      advertisementData.offer.description = getRandomElementFromArray(ADVERTISEMENT_DATA.DESCRIPTION);
      advertisementData.offer.photos = ADVERTISEMENT_DATA.PHOTOS.slice(getRandomNumber(ADVERTISEMENT_DATA.PHOTOS));
      advertisementData.location.x = getRandomNumber(ADVERTISEMENT_DATA.X_MAX - ADVERTISEMENT_DATA.X_SHIFT);
      advertisementData.location.y = getRandomNumber(ADVERTISEMENT_DATA.Y_MAX, ADVERTISEMENT_DATA.Y_MIN);

      return advertisementData;
    }
  };
  return ADVERTISEMENT_DATA.generateAdvertisementData();
};

const mapBlock = document.querySelector(`.map`);
mapBlock.classList.remove(`map--faded`);

const similarAdvertisementTemplate = document.querySelector(`#pin`).content;
const similarAdvertisementItem = similarAdvertisementTemplate.querySelector(`.map__pin`);

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
 * создаёт массив объектов с данными объявлений
 * @param {number} numberOfAnnouncement - количество объявлений
 * @return {Array} - массив с объектами - объявлениями
 */

const generateAnnouncement = function (numberOfAnnouncement) {
  let announcementData = [];
  for (let i = 0; i < numberOfAnnouncement; i++) {
    announcementData[i] = generateMockData(i + 1);
  }

  return announcementData;
};

/**
 * добавляет объявления в разметку документа
 * @param {Array} announcements - исходный массив с объектами - объявлениями
 * @return {Object} - объект с новой разметкой, содержащей разметку объектов - объявлений
 */

const incarnateAnnouncements = function (announcements) {
  const mapPins = document.querySelector(`.map__pins`);
  const pinsContainer = document.createDocumentFragment();

  for (let i = 0; i < announcements.length; i++) {
    pinsContainer.appendChild(makeHtmlAnnouncement(announcements[i]));
  }
  return mapPins.appendChild(pinsContainer);
};

const advertisement = generateAnnouncement(NUMBER_OF_ADVERTISEMENT);
incarnateAnnouncements(advertisement);

