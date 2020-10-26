'use strict';

(function () {

  const BorderLimits = {
    X_MAX: 1200 - window.activation.MainPin.halfWidth,
    X_MIN: -window.activation.MainPin.halfWidth,
    Y_MAX: 630 - window.activation.MainPin.halfHeight - window.activation.MainPin.markerOffset,
    Y_MIN: 130 - window.activation.MainPin.halfHeight - window.activation.MainPin.markerOffset
  };

  const map = document.querySelector(`.map__pins`);
  const mapPinMain = document.querySelector(`.map__pin--main`);
  const absoluteLeftShift = map.getBoundingClientRect().left;

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
    } else {
      mapPinMain.style.left = `${x}px`;
    }
    if (y > BorderLimits.Y_MAX) {
      mapPinMain.style.top = `${BorderLimits.Y_MAX}px`;
    } else if (y < BorderLimits.Y_MIN) {
      mapPinMain.style.top = `${BorderLimits.Y_MIN}px`;
    } else {
      mapPinMain.style.top = `${y}px`;
    }
  };

  /**
   * осуществляет передвижение метки
   * @param {Object} evt - объект-событие
   */
  const onMove = function (evt) {
    if (evt.button === 0) {
      evt.preventDefault();

      mapPinMain.style.zIndex = 100;
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
        checkBorders(currentX, currentY);
      };

      /**
       * обновляет координаты в строке адреса при передвижении метки
       * @param {Object} moveEvt - объект-событие
       */
      const onMouseMove = function (moveEvt) {
        moveAt(moveEvt.pageX, moveEvt.pageY);
        let ADDRESS_X = parseInt(mapPinMain.style.left, 10) + window.activation.MainPin.halfWidth;
        let ADDRESS_Y = parseInt(mapPinMain.style.top, 10) + window.activation.MainPin.halfHeight + window.activation.MainPin.markerOffset;
        window.form.setAddress(ADDRESS_X, ADDRESS_Y);
      };

      document.addEventListener(`mousemove`, onMouseMove);
      document.addEventListener(`mouseup`, function () {
        document.removeEventListener(`mousemove`, onMouseMove);
      });
    }
  };

  window.mainPin = {
    onMove: onMove
  };
}());
