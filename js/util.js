'use strict';

const DEBOUNCE_INTERVAL = 500;

const mapPins = document.querySelector(`.map__pins`);
const mapFormElements = document.querySelectorAll(`.map__filter, .map__features`);
const mapFilters = document.querySelector(`.map__filters`);
const errorTemplate = document.querySelector(`#error`).content;
const errorItem = errorTemplate.querySelector(`.error`);
const successTemplate = document.querySelector(`#success`).content;
const successItem = successTemplate.querySelector(`.success`);
const main = document.querySelector(`main`);

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
* задерживает выполнение функции на время не менее DEBOUNCE_INTERVAL
* @param {Object} callback - функция, для которой устанавливается задержка
* @return {Object} - функция, исполняемая не чаще чем DEBOUNCE_INTERVAL
*/
const debounce = function (callback) {
  let timeout;
  return function (argument) {
    clearTimeout(timeout);
    timeout = setTimeout(callback, DEBOUNCE_INTERVAL, argument);
  };
};

/**
 * удаляет сообщение ошибочной загрузки данных и пины объявлений
 */
const removePins = function () {
  const pins = document.querySelectorAll(`.map__pin, .load-error`);
  for (let i = 1; i < pins.length; i++) {
    pins[i].remove();
  }
};

/**
 * удаляет открытую карточку объявления
 */
const removeCard = function () {
  const card = document.querySelector(`.map__card`);
  if (card) {
    card.remove();
  }
};

/**
* отображает сообщение при успешной отправке данных
* @return {Object} - блок с сообщением
*/
const successHandlerSubmit = function () {
  const popupNode = successItem.cloneNode(true);
  main.appendChild(popupNode);

  popupNode.addEventListener(`click`, function () {
    popupNode.remove();
    window.activation.deactivatePage();
  });
  document.addEventListener(`keydown`, function (evt) {
    if (evt.key === `Escape`) {
      popupNode.remove();
      window.activation.deactivatePage();
    }
  });

  return popupNode;
};

/**
* отображает сообщение при неуспешной отправке данных
* @return {Object} - блок с сообщением
*/
const errorHandlerSubmit = function () {
  const popupNode = errorItem.cloneNode(true);
  main.appendChild(popupNode);

  popupNode.addEventListener(`click`, function () {
    popupNode.remove();
  });
  document.addEventListener(`keydown`, function (evt) {
    if (evt.key === `Escape`) {
      popupNode.remove();
    }
  });

  return popupNode;
};

/**
* отображает данные (похожие объявления) при успешной загрузке
* @param {Array} announcements - массив объектов с данными
*/
const successHandlerLoad = function (announcements) {
  const limitAnnouncements = window.filter.filterData(announcements);
  window.render.pins(limitAnnouncements);

  const onFilterFormChange = window.util.debounce(function () {
    const filteresAnnouncements = window.filter.filterData(announcements);
    removeCard();
    window.render.pins(filteresAnnouncements);
  });

  mapFilters.addEventListener(`change`, onFilterFormChange);

  mapPins.addEventListener(`click`, function (evt) {
    window.render.cards(evt, announcements);
  });
  mapPins.addEventListener(`keydown`, function (evt) {
    if (evt.key === `Enter`) {
      window.render.cards(evt, announcements);
    }
  });
};

/**
* отображает сообщение при неуспешной загрузке данных
* @param {String} errorMessage - сообщение
*/
const errorHandlerLoad = function (errorMessage) {
  mapFormElements.forEach(function (formElement) {
    formElement.setAttribute(`disabled`, `disabled`);
  });

  const popupNode = document.createElement(`div`);
  popupNode.classList.add(`load-error`);
  popupNode.style = `z-index: 1; margin: 0 auto; text-align: center; background-color: tomato; border-width: 3px; border-style: solid; border-color: red;`;
  popupNode.style.fontSize = `22px`;
  popupNode.style.position = `fixed`;
  popupNode.style.left = 0;
  popupNode.style.right = 0;
  popupNode.style.fontWeight = `bold`;
  popupNode.textContent = errorMessage;

  mapPins.appendChild(popupNode);
};

window.util = {
  shuffleArray,
  debounce,
  removePins,
  removeCard,
  successHandlerSubmit,
  errorHandlerSubmit,
  successHandlerLoad,
  errorHandlerLoad
};
