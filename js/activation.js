'use strict';

(function () {

  const MainPin = {
    halfWidth: 32,
    halfHeight: 32,
    markerOffset: 21
  };

  const mapBlock = document.querySelector(`.map`);
  const adForm = document.querySelector(`.ad-form`);
  const mapFilters = document.querySelector(`.map__filters`);
  const mapPinMain = document.querySelector(`.map__pin--main`);
  const adFormElements = document.querySelectorAll(`.ad-form__element, .ad-form-header`);
  const mapFiltersElements = mapFilters.querySelectorAll(`.map__filter, .map__checkbox`);

  let ADDRESS_X = parseInt(mapPinMain.style.left, 10) + MainPin.halfWidth;
  let ADDRESS_Y = parseInt(mapPinMain.style.top, 10) + MainPin.halfHeight;

  /**
  * переключает страницу в активное состояние
  */
  const activatePage = function () {
    window.form.setAddress(ADDRESS_X, ADDRESS_Y + MainPin.markerOffset);
    window.backend.load(window.util.successHandlerLoad, window.util.errorHandlerLoad);

    adFormElements.forEach(function (item) {
      item.removeAttribute(`disabled`);
    });
    mapFiltersElements.forEach(function (item) {
      item.removeAttribute(`disabled`);
    });
    mapBlock.classList.remove(`map--faded`);
    adForm.classList.remove(`ad-form--disabled`);
    mapPinMain.removeEventListener(`mousedown`, onMapPinClick);
    mapPinMain.removeEventListener(`keydown`, onMapPinKeyPress);
  };

  /**
  * переключает страницу в неактивное состояние
  */
  const deactivatePage = function () {
    mapBlock.classList.add(`map--faded`);
    adForm.classList.add(`ad-form--disabled`);
    adForm.reset();
    mapFilters.reset();

    window.util.removePins();
    window.util.removeCard();

    mapPinMain.addEventListener(`mousedown`, onMapPinClick);
    mapPinMain.addEventListener(`keydown`, onMapPinKeyPress);
    mapPinMain.style.left = `${ADDRESS_X - MainPin.halfWidth}px`;
    mapPinMain.style.top = `${ADDRESS_Y - MainPin.halfHeight}px`;
    window.form.setAddress(ADDRESS_X, ADDRESS_Y);

    adFormElements.forEach(function (item) {
      item.setAttribute(`disabled`, `disabled`);
    });
    mapFiltersElements.forEach(function (item) {
      item.setAttribute(`disabled`, `disabled`);
    });
  };

  /**
  * по нажатию левой кнопки мыши вызывает активацию страницы и заполняет значение поля адреса
  * @param {Object} evt - объект-событие
  */
  const onMapPinClick = function (evt) {
    if (evt.button === 0) {
      activatePage();
    }
  };

  /**
* по нажатию клавиши Enter вызывает активацию страницы и заполняет значение поля адреса
* @param {Object} evt - объект-событие
*/
  const onMapPinKeyPress = function (evt) {
    if (evt.key === `Enter`) {
      activatePage();
    }
  };

  window.activation = {
    MainPin: MainPin,
    activatePage: activatePage,
    deactivatePage: deactivatePage,
    onMapPinClick: onMapPinClick,
    onMapPinKeyPress: onMapPinKeyPress
  };
}());
