'use strict';

(function () {

  const MAP_FILTER_ELEMENTS = [
    `.map__filter`,
    `.map__features`
  ];

  const mapPinMain = document.querySelector(`.map__pin--main`);
  const mapPins = document.querySelector(`.map__pins`);
  const mapFormElements = document.querySelectorAll(MAP_FILTER_ELEMENTS);

  window.activation.changeState(false);

  /**
  * по нажатию левой кнопки мыши вызывает активацию страницы и заполняет значение поля адреса
  * @param {Object} evt - объект-событие
  */
  const onMapPinClick = function (evt) {
    if (evt.button === 0) {
      window.activation.changeState(true);
      window.backend.load(successHandlerLoad, errorHandlerLoad);
      window.activation.addressInput.value = `${window.activation.ADDRESS_X} ${window.activation.ADDRESS_Y + window.pinMove.MAP_PIN_ACTIVE_Y_OFFSET}`;
    }
  };

  /**
* по нажатию клавиши Enter вызывает активацию страницы и заполняет значение поля адреса
* @param {Object} evt - объект-событие
*/
  const onMapPinKeyPress = function (evt) {
    if (evt.key === `Enter`) {
      window.activation.changeState(true);
      window.backend.load(successHandlerLoad, errorHandlerLoad);
      window.activation.addressInput.value = `${window.activation.ADDRESS_X} ${window.activation.ADDRESS_Y + window.pinMove.MAP_PIN_ACTIVE_Y_OFFSET}`;
    }
  };

  mapPinMain.addEventListener(`keydown`, onMapPinKeyPress);
  mapPinMain.addEventListener(`mousedown`, window.pinMove.pinMainMove);
  mapPinMain.addEventListener(`mousedown`, onMapPinClick);


  /**
   * отображает данные (похожие объявления) при успешной загрузке
   * @param {Array} announcements - массив объектов с данными
   */
  const successHandlerLoad = function (announcements) {
    window.render.renderPins(announcements);

    window.filter.housingTypeElement.addEventListener(`change`, function (evt) {
      window.filter.byHousingType(evt, announcements);
    });

    mapPins.addEventListener(`click`, function (evt) {
      window.render.renderCards(evt, announcements);
    });
    mapPins.addEventListener(`keydown`, function (evt) {
      if (evt.key === `Enter`) {
        window.render.renderCards(evt, announcements);
      }
    });
  };

  /**
   * отображает сообщение при неуспешной загрузке данных
   * @param {String} errorMessage - сообщение
   */
  const errorHandlerLoad = function (errorMessage) {
    mapFormElements.forEach(function (item) {
      item.setAttribute(`disabled`, `disabled`);
    });

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

  window.main = {
    onMapPinClick: onMapPinClick,
    onMapPinKeyPress: onMapPinKeyPress
  };
}());
