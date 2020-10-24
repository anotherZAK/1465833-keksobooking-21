'use strict';

(function () {

  const mapPinMain = document.querySelector(`.map__pin--main`);
  const MAP_PIN_HALF_WIDTH = Math.floor(mapPinMain.offsetWidth / 2);
  const MAP_PIN_HALF_HEIGHT = Math.floor(mapPinMain.offsetHeight / 2);
  const MAP_PIN_ACTIVE_Y_OFFSET = Math.floor(parseInt(getComputedStyle(mapPinMain, `::after`).height, 10));

  const BorderLimits = {
    X_MAX: 1200 - MAP_PIN_HALF_WIDTH,
    X_MIN: -MAP_PIN_HALF_WIDTH,
    Y_MAX: 630 - MAP_PIN_HALF_HEIGHT - MAP_PIN_ACTIVE_Y_OFFSET,
    Y_MIN: 130 - MAP_PIN_HALF_HEIGHT - MAP_PIN_ACTIVE_Y_OFFSET
  };

  /**
   * проверяет и устанавливает предельные значения (границы) координат метки
   * @param {number} x - координата метки по оси x
   * @param {number} y - координата метки по оси y
   */
  const checkBorders = function (x, y) {
    if (x > BorderLimits.X_MAX) {
      mapPinMain.style.left = `${BorderLimits.X_MAX}px`;
    } else if (x < BorderLimits.X_MIN) {
      mapPinMain.style.left = `${BorderLimits.X_MIN}px`;
    }
    if (y > BorderLimits.Y_MAX) {
      mapPinMain.style.top = `${BorderLimits.Y_MAX}px`;
    } else if (y < BorderLimits.Y_MIN) {
      mapPinMain.style.top = `${BorderLimits.Y_MIN}px`;
    }
  };

  /**
   * осуществляет передвижение метки
   * @param {Object} evt - объект-событие
   */
  const pinMainMove = function (evt) {
    if (evt.button === 0) {
      evt.preventDefault();

      mapPinMain.style.zIndex = 100;
      const absoluteLeftShift = parseInt(getComputedStyle(document.body).marginLeft, 10);
      let shiftX = evt.clientX - mapPinMain.getBoundingClientRect().left;
      let shiftY = evt.clientY - mapPinMain.getBoundingClientRect().top;

      /**
       * вычисляет текущие координаты метки с учётом сдвига указателя мыши относительно левого верхнего угла метки
       * @param {number} pageX - расстояние от левой границы экрана до курсора с учётом прокрутки
       * @param {number} pageY - расстояние от верхней границы экрана до курсора с учётом прокрутки
       */
      const moveAt = function (pageX, pageY) {
        let currentX = pageX - absoluteLeftShift - shiftX;
        let currentY = pageY - shiftY;
        mapPinMain.style.left = currentX + `px`;
        mapPinMain.style.top = currentY + `px`;
        checkBorders(currentX, currentY);
      };

      /**
       * обновляет координаты в строке адреса при передвижении метки
       * @param {Object} moveEvt - объект-событие
       */
      const onMouseMove = function (moveEvt) {
        moveAt(moveEvt.pageX, moveEvt.pageY);
        window.activation.ADDRESS_X = Math.floor(parseInt(mapPinMain.style.left, 10) + mapPinMain.offsetWidth / 2);
        window.activation.ADDRESS_Y = Math.floor(parseInt(mapPinMain.style.top, 10) + mapPinMain.offsetHeight / 2 + MAP_PIN_ACTIVE_Y_OFFSET);
        window.activation.addressInput.value = `${window.activation.ADDRESS_X} ${window.activation.ADDRESS_Y}`;
      };

      document.addEventListener(`mousemove`, onMouseMove);
      document.addEventListener(`mouseup`, function () {
        document.removeEventListener(`mousemove`, onMouseMove);
      });
    }
  };

  window.pinMove = {
    MAP_PIN_ACTIVE_Y_OFFSET: MAP_PIN_ACTIVE_Y_OFFSET,
    pinMainMove: pinMainMove
  };
}());
