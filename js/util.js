'use strict';

(function () {

  /**
   * перемешивает массив по алгоритму Фишера-Йетса
   * @param {Array} array - исходный массив
   * @return {Array} - перемешанный массив
   */
  const shuffleArray = function (array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      let k = array[i];
      array[i] = array[j];
      array[j] = k;
    }
    return array;
  };

  /**
 * задерживает выполнение функции на время не менее delay
 * @param {Object} func - функция, для которой устанавливается задержка
 * @param {number} delay - время задержки в мс
 * @return {Object} - функция, исполняемая не чаще чем delay
 */
  const debounce = function (func, delay) {
    let lastTimeout;

    return function (args) {
      const boundFunc = func.bind(null, args);
      clearTimeout(lastTimeout);
      lastTimeout = setTimeout(boundFunc, delay);
    };
  };

  window.util = {
    shuffleArray: shuffleArray,
    debounce: debounce
  };
}());
