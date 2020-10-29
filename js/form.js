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
    BUNGALOW: `0`,
    FLAT: 1000,
    HOUSE: 5000,
    PALACE: 10000,
    MAX: 1000000
  };

  const addressInput = document.querySelector(`input[name="address"]`);
  const roomsInput = document.querySelector(`select[name="rooms"]`);
  const capacityInput = document.querySelector(`select[name="capacity"]`);
  addressInput.setAttribute(`readonly`, ``);

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

  capacityInput.addEventListener(`change`, function () {
    checkGuestsCapacity();
  });

  roomsInput.addEventListener(`change`, function () {
    checkGuestsCapacity();
  });

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

  const titleInput = document.querySelector(`input[name="title"]`);
  titleInput.addEventListener(`input`, function () {
    checkTitleLength();
  });

  /**
 * проверяет максимально допустимое значение цены объявления
 */
  const checkPrice = function () {
    let valueMax = priceInput.value;
    if (valueMax > PriceLimit.MAX) {
      priceInput.setCustomValidity(`Максимальное значение - ${PriceLimit.MAX}`);
    } else if (valueMax < PriceLimit.MAX) {
      priceInput.setCustomValidity(``);
    }
    priceInput.reportValidity();
  };

  const priceInput = document.querySelector(`input[name="price"]`);
  const typeInput = document.querySelector(`select[name="type"]`);
  priceInput.setAttribute(`min`, PriceLimit[typeInput.value]);
  priceInput.placeholder = PriceLimit[typeInput.value];

  priceInput.addEventListener(`input`, function () {
    checkPrice();
  });

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

  typeInput.addEventListener(`change`, function () {
    checkPricefromType();
  });

  const timeInTimeOut = document.querySelectorAll(`select[name="timein"], select[name="timeout"]`);
  for (let i = 0; i < timeInTimeOut.length; i++) {
    if (i === 0) {
      timeInTimeOut[i].addEventListener(`change`, function () {
        timeInTimeOut[i + 1].value = timeInTimeOut[i].value;
      });
    } else {
      timeInTimeOut[i].addEventListener(`change`, function () {
        timeInTimeOut[i - 1].value = timeInTimeOut[i].value;
      });
    }
  }

  window.form = {
    setAddress: setAddress
  };
}());
