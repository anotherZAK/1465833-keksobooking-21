'use strict';

(function () {

  const AD_FORM_ELEMENTS = [
    `.ad-form__element`,
    `.ad-form-header`,
  ];

  const mapBlock = document.querySelector(`.map`);
  const adForm = document.querySelector(`.ad-form`);
  const mapPinMain = document.querySelector(`.map__pin--main`);
  const adFormElements = document.querySelectorAll(AD_FORM_ELEMENTS);
  const addressInput = document.querySelector(`input[name="address"]`);

  const MAP_PIN_HALF_WIDTH = Math.floor(mapPinMain.offsetWidth / 2);
  const MAP_PIN_HALF_HEIGHT = Math.floor(mapPinMain.offsetHeight / 2);

  /**
  * переключает страницу между активным и неактивным состоянием
  * @param {boolean} flag - признак переключения
  */
  const changeState = function (flag) {
    if (flag) {
      adFormElements.forEach(function (item) {
        item.removeAttribute(`disabled`);
      });
      mapBlock.classList.remove(`map--faded`);
      adForm.classList.remove(`ad-form--disabled`);
      mapPinMain.removeEventListener(`mousedown`, window.main.onMapPinClick);
      mapPinMain.removeEventListener(`keydown`, window.main.onMapPinKeyPress);
    } else {
      adFormElements.forEach(function (item) {
        item.setAttribute(`disabled`, `disabled`);
      });
      mapBlock.classList.add(`map--faded`);
    }
  };

  let ADDRESS_X = parseInt(mapPinMain.style.left, 10) + MAP_PIN_HALF_WIDTH;
  let ADDRESS_Y = parseInt(mapPinMain.style.top, 10) + MAP_PIN_HALF_HEIGHT;

  addressInput.value = `${ADDRESS_X} ${ADDRESS_Y}`;

  window.activation = {
    ADDRESS_X: ADDRESS_X,
    ADDRESS_Y: ADDRESS_Y,
    addressInput: addressInput,
    changeState: changeState
  };
}());
