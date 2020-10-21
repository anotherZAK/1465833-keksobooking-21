'use strict';

(function () {
  const roomsInput = document.querySelector(`select[name="rooms"]`);
  const capacityInput = document.querySelector(`select[name="capacity"]`);

  const GUESTS_CAPACITY = {
    1: [`1`],
    2: [`1`, `2`],
    3: [`1`, `2`, `3`],
    100: [`0`]
  };

  /**
  * проверяет, сколько гостей можно пригласить
  */
  const checkGuestsCapacity = function () {
    if (GUESTS_CAPACITY[roomsInput.value].includes(capacityInput.value)) {
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

  const TitleLength = {
    min: 30,
    max: 100
  };

  /**
   * проверяет длину заголовка объявления
   */
  const checkTitleLength = function () {
    let valueLength = titleInput.value.length;
    if (valueLength < TitleLength.min) {
      titleInput.setCustomValidity(`Минимальная длина заголовка объявления -  ${TitleLength.min} символов. Осталось ввести ${TitleLength.min - titleInput.value.length}`);
    } else if (valueLength > TitleLength.max) {
      titleInput.setCustomValidity(`Максимальная длина заголовка объявления -  ${TitleLength.max} символов. Удалите ${titleInput.value.length - TitleLength.max}`);
    } else {
      titleInput.setCustomValidity(``);
    }
    titleInput.reportValidity();
  };

  const titleInput = document.querySelector(`input[name="title"]`);
  titleInput.addEventListener(`input`, function () {
    checkTitleLength();
  });

  const PriceLimit = {
    flat: `1000`,
    bungalow: `0`,
    house: `5000`,
    palace: `10000`,
    max: `1000000`
  };

  /**
 * проверяет максимально допустимое значение цены объявления
 */
  const checkPrice = function () {
    let valueMax = priceInput.value;
    if (valueMax > PriceLimit.max) {
      priceInput.setCustomValidity(`Максимальная значение - ${PriceLimit.max}`);
    } else {
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

}());
