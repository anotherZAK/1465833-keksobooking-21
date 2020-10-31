'use strict';

(function () {

  const userAvatarDefaultSrc = `img/muffin-grey.svg`;
  const URL_DOWNLOAD = `https://21.javascript.pages.academy/keksobooking/data`;

  const MainPin = {
    HALF_WIDTH: 32,
    HALF_HEIGHT: 32,
    MARKER_OFFSET: 21
  };

  const mapBlock = document.querySelector(`.map`);
  const adForm = document.querySelector(`.ad-form`);
  const mapFilters = document.querySelector(`.map__filters`);
  const mapPinMain = document.querySelector(`.map__pin--main`);
  const adFormElements = document.querySelectorAll(`.ad-form__element, .ad-form-header`);
  const mapFiltersElements = mapFilters.querySelectorAll(`.map__filter, .map__checkbox`);

  const userAvatarPreview = document.querySelector(`.ad-form-header__preview > img`);
  const userHousePhotoPreview = document.querySelector(`.ad-form__photo`);

  let ADDRESS_X = parseInt(mapPinMain.style.left, 10) + MainPin.HALF_WIDTH;
  let ADDRESS_Y = parseInt(mapPinMain.style.top, 10) + MainPin.HALF_HEIGHT;

  /**
  * переключает страницу в активное состояние
  */
  const activatePage = function () {
    window.form.setAddress(ADDRESS_X, ADDRESS_Y + MainPin.MARKER_OFFSET);
    window.backend.sendRequest(`GET`, URL_DOWNLOAD)
    .then(window.util.successHandlerLoad)
    .catch(window.util.errorHandlerLoad);

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
    userAvatarPreview.src = userAvatarDefaultSrc;
    if (userHousePhotoPreview.firstChild) {
      userHousePhotoPreview.firstChild.remove();
    }

    mapBlock.classList.add(`map--faded`);
    adForm.classList.add(`ad-form--disabled`);
    adForm.reset();
    mapFilters.reset();

    window.util.removePins();
    window.util.removeCard();

    mapPinMain.addEventListener(`mousedown`, onMapPinClick);
    mapPinMain.addEventListener(`keydown`, onMapPinKeyPress);
    mapPinMain.style.left = `${ADDRESS_X - MainPin.HALF_WIDTH}px`;
    mapPinMain.style.top = `${ADDRESS_Y - MainPin.HALF_HEIGHT}px`;
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
    MainPin,
    activatePage,
    deactivatePage,
    onMapPinClick,
    onMapPinKeyPress
  };
}());
