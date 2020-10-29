'use strict';

(function () {

  const mapPinMain = document.querySelector(`.map__pin--main`);
  const adForm = document.querySelector(`.ad-form`);
  const adFormReset = adForm.querySelector(`.ad-form__reset`);

  window.activation.deactivatePage();

  mapPinMain.addEventListener(`keydown`, window.activation.onMapPinKeyPress);
  mapPinMain.addEventListener(`mousedown`, window.mainPin.onMove);
  mapPinMain.addEventListener(`mousedown`, window.activation.onMapPinClick);

  /**
   * функция-обработчик, отправляет данные формы на сервер
   * @param {Object} evt - объект-событие
   */
  const onAdFormSubmit = function (evt) {
    evt.preventDefault();
    window.backend.save(new FormData(adForm), window.util.successHandlerSubmit, window.util.errorHandlerSubmit);
  };

  /**
   * функция-обработчик, переводит страницу в неактивное состояние
   * @param {Object} evt - объект-событие
   */
  const onAdFormReset = function (evt) {
    evt.preventDefault();
    window.activation.deactivatePage();
  };

  adForm.addEventListener(`submit`, onAdFormSubmit);
  adFormReset.addEventListener(`click`, onAdFormReset);
}());
