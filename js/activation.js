'use strict';

(function () {

  const MainPin = {
    halfWidth: 32,
    halfHeight: 32,
    markerOffset: 21
  };

  const mapBlock = document.querySelector(`.map`);
  const adForm = document.querySelector(`.ad-form`);
  const mapPinMain = document.querySelector(`.map__pin--main`);
  const adFormElements = document.querySelectorAll(`.ad-form__element, .ad-form-header`);

  let ADDRESS_X = parseInt(mapPinMain.style.left, 10) + MainPin.halfWidth;
  let ADDRESS_Y = parseInt(mapPinMain.style.top, 10) + MainPin.halfHeight;

  /**
  * переключает страницу между активным и неактивным состоянием
  * @param {boolean} flag - признак переключения
  */
  const activatePage = function (flag) {
    if (flag) {
      window.form.setAddress(ADDRESS_X, ADDRESS_Y + MainPin.markerOffset);
      window.backend.load(window.backend.successHandlerLoad, window.backend.errorHandlerLoad);

      adFormElements.forEach(function (item) {
        item.removeAttribute(`disabled`);
      });
      mapBlock.classList.remove(`map--faded`);
      adForm.classList.remove(`ad-form--disabled`);
      mapPinMain.removeEventListener(`mousedown`, window.main.onMapPinClick);
      mapPinMain.removeEventListener(`keydown`, window.main.onMapPinKeyPress);
    } else {
      window.form.setAddress(ADDRESS_X, ADDRESS_Y);
      adFormElements.forEach(function (item) {
        item.setAttribute(`disabled`, `disabled`);
      });
      mapBlock.classList.add(`map--faded`);
    }
  };

  window.activation = {
    MainPin: MainPin,
    activatePage: activatePage
  };
}());
