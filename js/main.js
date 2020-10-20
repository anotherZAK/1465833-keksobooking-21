'use strict';

(function () {
  const INACTIVE_ELEMENTS = [
    `.ad-form__element`,
    `.ad-form-header`,
    `.map__filter`,
    `.map__features`
  ];

  const mapBlock = document.querySelector(`.map`);
  const adForm = document.querySelector(`.ad-form`);
  const mapPinMain = document.querySelector(`.map__pin--main`);
  const inactiveElements = document.querySelectorAll(INACTIVE_ELEMENTS);

  /**
  * переключает страницу между активным и неактивным состоянием
  * @param {boolean} flag - признак переключения
  */
  const changeState = function (flag) {
    if (flag) {
      inactiveElements.forEach(function (item) {
        item.removeAttribute(`disabled`);
      });
      mapBlock.classList.remove(`map--faded`);
      adForm.classList.remove(`ad-form--disabled`);
      mapPinMain.removeEventListener(`mousedown`, onMapPinClick);
      mapPinMain.removeEventListener(`keydown`, onMapPinKeyPress);
    } else {
      inactiveElements.forEach(function (item) {
        item.setAttribute(`disabled`, `disabled`);
      });
      mapBlock.classList.add(`map--faded`);
    }
  };

  changeState(false);

  const MAP_PIN_X_OFFSET = Math.floor(window.getComputedStyle(mapPinMain).width.replace(/[^0-9]/g, ``) / 2);
  const MAP_PIN_Y_OFFSET = Math.floor(window.getComputedStyle(mapPinMain).height.replace(/[^0-9]/g, ``) / 2);
  const MAP_PIN_ACTIVE_Y_OFFSET = 22;
  const ADDRESS_X = Number(mapPinMain.style.left.replace(/[^0-9]/g, ``)) + MAP_PIN_X_OFFSET;
  const ADDRESS_Y = Number(mapPinMain.style.top.replace(/[^0-9]/g, ``)) + MAP_PIN_Y_OFFSET;

  const addressInput = document.querySelector(`input[name="address"]`);
  addressInput.value = `${ADDRESS_X} ${ADDRESS_Y}`;

  /**
  * по нажатию левой кнопки мыши вызывает активацию страницы и заполняет значение поля адреса
  * @param {Object} evt - объект-событие
  */
  const onMapPinClick = function (evt) {
    if (evt.button === 0) {
      changeState(true);
      window.backend.load(successHandlerLoad, errorHandlerLoad);
      addressInput.value = `${ADDRESS_X} ${ADDRESS_Y + MAP_PIN_ACTIVE_Y_OFFSET}`;
    }
  };

  /**
  * по нажатию клавиши Enter вызывает активацию страницы и заполняет значение поля адреса
  * @param {Object} evt - объект-событие
  */
  const onMapPinKeyPress = function (evt) {
    if (evt.key === `Enter`) {
      changeState(true);
      window.backend.load(successHandlerLoad, errorHandlerLoad);
      addressInput.value = `${ADDRESS_X} ${ADDRESS_Y + MAP_PIN_ACTIVE_Y_OFFSET}`;
    }
  };

  mapPinMain.addEventListener(`mousedown`, onMapPinClick);
  mapPinMain.addEventListener(`keydown`, onMapPinKeyPress);

  const mapPins = document.querySelector(`.map__pins`);

  /**
   * отображает данные (похожие объявления) при успешной загрузке
   * @param {Array} announcements - массив объектов с данными
   */
  const successHandlerLoad = function (announcements) {
    const pinsContainer = document.createDocumentFragment();

    announcements.forEach(function (item) {
      pinsContainer.appendChild(window.markup.makeHtmlAnnouncement(item));
      pinsContainer.appendChild(window.markup.makeHtmlPopup(item));
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
}());
