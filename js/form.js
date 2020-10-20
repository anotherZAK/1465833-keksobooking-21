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
}());
