'use strict';

(function () {

  const GuestsCapacity = {
    1: [`1`],
    2: [`1`, `2`],
    3: [`1`, `2`, `3`],
    100: [`0`]
  };

  const TitleLength = {
    MIN: 30,
    MAX: 100
  };

  const PriceLimit = {
    bungalow: `0`,
    flat: 1000,
    house: 5000,
    palace: 10000,
    max: 1000000
  };

  const availablePreviewFormats = [
    `jpg`,
    `jpeg`,
    `png`
  ];

  const addressInput = document.querySelector(`input[name="address"]`);
  const roomsInput = document.querySelector(`select[name="rooms"]`);
  const capacityInput = document.querySelector(`select[name="capacity"]`);
  const titleInput = document.querySelector(`input[name="title"]`);
  const priceInput = document.querySelector(`input[name="price"]`);
  const typeInput = document.querySelector(`select[name="type"]`);
  const timeField = document.querySelector(`.ad-form__element--time`);
  const timeInTimeOut = timeField.querySelectorAll(`select[name="timein"], select[name="timeout"]`);

  const userAvatarChooser = document.querySelector(`.ad-form-header__input`);
  const userAvatarPreview = document.querySelector(`.ad-form-header__preview > img`);
  const userHousePhotoChooser = document.querySelector(`.ad-form__input`);
  const userHousePhotoPreview = document.querySelector(`.ad-form__photo`);

  addressInput.setAttribute(`readonly`, ``);
  priceInput.setAttribute(`min`, PriceLimit[typeInput.value]);
  priceInput.placeholder = PriceLimit[typeInput.value];

  /**
   * заполняет поле "Адрес" формы на странице
   * @param {number} ADDRESS_X - значение адреса по оси x
   * @param {number} ADDRESS_Y - значение адреса по оси y
   */
  const setAddress = function (ADDRESS_X, ADDRESS_Y) {
    addressInput.value = `${ADDRESS_X}, ${ADDRESS_Y}`;
  };

  /**
  * проверяет, сколько гостей можно пригласить
  */
  const checkGuestsCapacity = function () {
    if (GuestsCapacity[roomsInput.value].includes(capacityInput.value)) {
      capacityInput.setCustomValidity(``);
    } else {
      capacityInput.setCustomValidity(`Количество гостей не более числа комнат. При выборе 100 комнат - не для гостей`);
    }
  };

  capacityInput.addEventListener(`change`, checkGuestsCapacity);
  roomsInput.addEventListener(`change`, checkGuestsCapacity);

  /**
   * проверяет длину заголовка объявления
   */
  const checkTitleLength = function () {
    let valueLength = titleInput.value.length;
    if (valueLength < TitleLength.MIN) {
      titleInput.setCustomValidity(`Минимальная длина заголовка объявления -  ${TitleLength.MIN} символов. Осталось ввести ${TitleLength.MIN - titleInput.value.length}`);
    } else if (valueLength > TitleLength.MAX) {
      titleInput.setCustomValidity(`Максимальная длина заголовка объявления -  ${TitleLength.MAX} символов. Удалите ${titleInput.value.length - TitleLength.MAX}`);
    } else {
      titleInput.setCustomValidity(``);
    }
    titleInput.reportValidity();
  };

  titleInput.addEventListener(`input`, checkTitleLength);

  /**
 * проверяет максимально допустимое значение цены объявления
 */
  const checkPrice = function () {
    let valueMax = priceInput.value;
    if (valueMax > PriceLimit.max) {
      priceInput.setCustomValidity(`Максимальное значение - ${PriceLimit.max}`);
    } else if (valueMax < PriceLimit.max) {
      priceInput.setCustomValidity(``);
    }
    priceInput.reportValidity();
  };

  priceInput.addEventListener(`input`, checkPrice);

  /**
   * устанавливает минимальное значение цены в зависимости от типа жилья
   */
  const checkPricefromType = function () {
    priceInput.value = ``;
    if (PriceLimit[`${typeInput.value}`]) {
      priceInput.setAttribute(`min`, PriceLimit[typeInput.value]);
      priceInput.placeholder = PriceLimit[typeInput.value];
    }
  };

  typeInput.addEventListener(`change`, checkPricefromType);

  /**
   * синхронизирует значения полей "Время заезда и выезда"
   * @param {Object} evt - объект-событие
   */
  const syncTime = function (evt) {
    timeInTimeOut.forEach(function (selectItem) {
      selectItem.value = evt.target.value;
    });
  };

  timeField.addEventListener(`change`, syncTime);

  /**
   * устанавливает и отображает миниизображение, выбранное пользователем
   * @param {Object} chooser - поле выбора файла
   * @param {Object} preview - блок для вывода изображения
   */
  const setPreview = function (chooser, preview) {
    let file = chooser.files[0];

    const equal = availablePreviewFormats.some(function (formatItem) {
      return file.type.endsWith(formatItem);
    });

    if (equal) {
      let reader = new FileReader();
      reader.addEventListener(`load`, function () {
        window.markup.makeHtmlPreview(preview, reader);
      });

      reader.readAsDataURL(file);
    }
  };

  userAvatarChooser.addEventListener(`change`, function () {
    setPreview(userAvatarChooser, userAvatarPreview);
  });
  userHousePhotoChooser.addEventListener(`change`, function () {
    setPreview(userHousePhotoChooser, userHousePhotoPreview);
  });

  window.form = {
    setAddress
  };
}());
