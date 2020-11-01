'use strict';

(function () {
  const URL_UPLOAD = `https://21.javascript.pages.academy/keksobooking`;

  const mapPinMain = document.querySelector(`.map__pin--main`);
  const adForm = document.querySelector(`.ad-form`);
  const adFormReset = adForm.querySelector(`.ad-form__reset`);

  window.activation.deactivatePage();

  mapPinMain.addEventListener(`mousedown`, window.mainPin.onMove);

  /**
   * функция-обработчик, отправляет данные формы на сервер
   * @param {Object} evt - объект-событие
   */
  const onAdFormSubmit = function (evt) {
    evt.preventDefault();
    window.backend.sendRequest(`POST`, URL_UPLOAD, new FormData(adForm))
    .then(window.util.successHandlerSubmit)
    .catch(window.util.errorHandlerSubmit);
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
