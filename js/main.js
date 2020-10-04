'use strict';

const NUMBER_OF_ADVERTISEMENT = 8;

/**
 * выбирает случайное число из заданного диапазона
 * @param {*} max - верхний предел
 * @param {*} min - нижний предел
 * @return {number} - случайное число
 */
const getRandomNumber = function (max, min = 0) {
  let randomNumber = 0;
  randomNumber = Math.floor(Math.random() * (max - min)) + min;

  return randomNumber;
};

/**
 * выбирает случайный индекс массива
 * @param {Array} array - исходный массив или верхний диапазон
 * @param {number} min - диапазон
 * @return {number} - случайный индекс
 */

const getRandomIndex = function (array) {
  let randomIndex = 0;
  const arrayLength = array.length;
  randomIndex = Math.floor(Math.random() * arrayLength);

  return randomIndex;
};

/**
 * перемешивает массив по алгоритму Фишера-Йетса
 * @param {Array} array - исходный массив
 * @return {Array} - перемешанный массив
 */
const shuffleArray = function (array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let k = array[i];
    array[i] = array[j];
    array[j] = k;
  }
  return array;
};

/**
 * выбирает случайный элемент из массива
 * @param {Array} array - исходный массив
 * @return {*} - случайный элемент массива
 */
const getRandomElementFromArray = function (array) {
  return array[getRandomIndex(array)];
};

/**
 * формирует моки для тестирования
 * @param {number} indexNumber - порядковый индекс изображений
 * @return {Object} - объект с данными объявления
 */
const generateMockData = function (indexNumber) {
  const AdevertisementData = {
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
    ROOMS: [
      1,
      2,
      3,
      100
    ],
    GUESTS: [
      1,
      2,
      3
    ],
    CHECKINOUT: [
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
      `Уютная и небольшая жилплощадь`,
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
      let locationX = getRandomNumber(AdevertisementData.X_MAX - AdevertisementData.X_SHIFT);
      let locationY = getRandomNumber(AdevertisementData.Y_MAX, AdevertisementData.Y_MIN);
      return {
        author: {
          avatar: `img/avatars/user0${indexNumber}.png`,
        },
        location: {
          x: locationX,
          y: locationY
        },
        offer: {
          title: getRandomElementFromArray(AdevertisementData.TITLES),
          price: getRandomNumber(AdevertisementData.PRICE_MAX),
          type: getRandomElementFromArray(AdevertisementData.TYPES),
          rooms: getRandomElementFromArray(AdevertisementData.ROOMS),
          guests: getRandomElementFromArray(AdevertisementData.GUESTS),
          checkin: getRandomElementFromArray(AdevertisementData.CHECKINOUT),
          checkout: getRandomElementFromArray(AdevertisementData.CHECKINOUT),
          features: shuffleArray(AdevertisementData.FEATURES).slice(getRandomNumber(AdevertisementData.FEATURES)),
          description: getRandomElementFromArray(AdevertisementData.DESCRIPTION),
          photos: AdevertisementData.PHOTOS.slice(getRandomNumber(AdevertisementData.PHOTOS)),
          address: `${locationX} ${locationY}`
        }
      };
    }
  };
  return AdevertisementData.generateAdvertisementData();
};

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
const renderPins = function (announcements) {
  const mapPins = document.querySelector(`.map__pins`);
  const pinsContainer = document.createDocumentFragment();
  announcements.forEach(function (item) {
    pinsContainer.appendChild(makeHtmlAnnouncement(item));
  });

  return mapPins.appendChild(pinsContainer);
};

const advertisement = generateAnnouncement(NUMBER_OF_ADVERTISEMENT);
renderPins(advertisement);

const fieldsetElements = document.querySelectorAll(`.ad-form__element`);
const mapFilters = document.querySelectorAll(`.map__filter`);
const mapFeatures = document.querySelector(`.map__features`);
const mapBlock = document.querySelector(`.map`);

/**
 * переключает страницу между активным и неактивным состоянием
 * @param {boolean} flag - признак переключения
 */
const changeState = function (flag) {
  if (flag) {
    fieldsetElements.forEach(function (item) {
      item.removeAttribute(`disabled`);
    });
    mapFilters.forEach(function (item) {
      item.removeAttribute(`disabled`);
    });
    mapFeatures.removeAttribute(`disabled`);
    mapBlock.classList.remove(`map--faded`);
  } else {
    fieldsetElements.forEach(function (item) {
      item.setAttribute(`disabled`, `disabled`);
    });
    mapFilters.forEach(function (item) {
      item.setAttribute(`disabled`, `disabled`);
    });
    mapFeatures.setAttribute(`disabled`, `disabled`);
    mapBlock.classList.add(`map--faded`);
  }
};

changeState(false);

const mapPinMain = document.querySelector(`.map__pin--main`);

const MAP_PIN_X_OFFSET = Math.floor(window.getComputedStyle(mapPinMain).width.replace(/[^0-9]/g, ``) / 2);
const MAP_PIN_Y_OFFSET = Math.floor(window.getComputedStyle(mapPinMain).height.replace(/[^0-9]/g, ``) / 2);
const MAP_PIN_ACTIVE_Y_OFFSET = 22;
const ADDRESS_X = Number(mapPinMain.style.left.replace(/[^0-9]/g, ``)) + MAP_PIN_X_OFFSET;
const ADDRESS_Y = Number(mapPinMain.style.top.replace(/[^0-9]/g, ``)) + MAP_PIN_Y_OFFSET;

const addressInput = document.querySelector(`input[name="address"]`);
addressInput.value = `${ADDRESS_X} ${ADDRESS_Y}`;

mapPinMain.addEventListener(`mousedown`, function (evt) {
  if (evt.button === 0) {
    changeState(true);
    addressInput.value = `${ADDRESS_X} ${ADDRESS_Y + MAP_PIN_ACTIVE_Y_OFFSET}`;
  }
});

mapPinMain.addEventListener(`keydown`, function (evt) {
  if (evt.key === `Enter`) {
    changeState(true);
    addressInput.value = `${ADDRESS_X} ${ADDRESS_Y + MAP_PIN_ACTIVE_Y_OFFSET}`;
  }
});

const roomsInput = document.querySelector(`select[name="rooms"]`);
const capacityInput = document.querySelector(`select[name="capacity"]`);

/**
 * проверяет, сколько гостей можно пригласить
 */
const checkGuestsCapacity = function () {
  if (roomsInput.value === `1` && capacityInput.value !== `1`) {
    capacityInput.setCustomValidity(`Возможно выбрать только для одного гостя`);
  } else if (roomsInput.value === `2` && capacityInput.value !== `1` && capacityInput.value !== `2`) {
    capacityInput.setCustomValidity(`Возможно выбрать для одного или для двух гостей`);
  } else if (roomsInput.value === `3` && capacityInput.value === `0`) {
    capacityInput.setCustomValidity(`Возможно выбрать для одного, двух или для трёх гостей`);
  } else if (roomsInput.value === `100` && capacityInput.value !== `0`) {
    capacityInput.setCustomValidity(`Этот вариант не для гостей`);
  } else {
    capacityInput.setCustomValidity(``);
  }
};

capacityInput.addEventListener(`change`, function () {
  checkGuestsCapacity();
});

roomsInput.addEventListener(`change`, function () {
  checkGuestsCapacity();
});
