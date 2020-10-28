'use strict';

(function () {

  const DEBOUNCE_INTERVAL = 500;

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
 * задерживает выполнение функции на время не менее DEBOUNCE_INTERVAL
 * @param {Object} callback - функция, для которой устанавливается задержка
 * @return {Object} - функция, исполняемая не чаще чем DEBOUNCE_INTERVAL
 */
  const debounce = function (callback) {
    let timeout;
    return function (argument) {
      clearTimeout(timeout);
      timeout = setTimeout(callback, DEBOUNCE_INTERVAL, argument);
    };
  };

  window.util = {
    shuffleArray: shuffleArray,
    debounce: debounce
  };
}());
