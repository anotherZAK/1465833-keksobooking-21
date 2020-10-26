'use strict';

(function () {

  const mapPinMain = document.querySelector(`.map__pin--main`);

  window.activation.activatePage(false);

  /**
  * по нажатию левой кнопки мыши вызывает активацию страницы и заполняет значение поля адреса
  * @param {Object} evt - объект-событие
  */
  const onMapPinClick = function (evt) {
    if (evt.button === 0) {
      window.activation.activatePage(true);
    }
  };

  /**
* по нажатию клавиши Enter вызывает активацию страницы и заполняет значение поля адреса
* @param {Object} evt - объект-событие
*/
  const onMapPinKeyPress = function (evt) {
    if (evt.key === `Enter`) {
      window.activation.activatePage(true);
    }
  };

  mapPinMain.addEventListener(`keydown`, onMapPinKeyPress);
  mapPinMain.addEventListener(`mousedown`, window.mainPin.onMove);
  mapPinMain.addEventListener(`mousedown`, onMapPinClick);

  window.main = {
    onMapPinClick: onMapPinClick,
    onMapPinKeyPress: onMapPinKeyPress
  };
}());
