'use strict';

(function () {

  /**
 * выбирает случайное число из заданного диапазона
 * @param {number} max - верхний предел
 * @param {number} min - нижний предел
 * @return {number} - случайное число
 */
  const getRandomNumber = function (max, min = 0) {
    let randomNumber = 0;
    randomNumber = Math.floor(Math.random() * (max - min)) + min;

    return randomNumber;
  };

  /**
   * выбирает случайный индекс массива
   * @param {Array} array - исходный массив или верхний диапазон
   * @param {number} min - диапазон
   * @return {number} - случайный индекс
   */

  const getRandomIndex = function (array) {
    let randomIndex = 0;
    const arrayLength = array.length;
    randomIndex = Math.floor(Math.random() * arrayLength);

    return randomIndex;
  };

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
   * выбирает случайный элемент из массива
   * @param {Array} array - исходный массив
   * @return {number} - случайный элемент массива
   */
  const getRandomElementFromArray = function (array) {
    return array[getRandomIndex(array)];
  };

  window.util = {
    getRandomNumber: getRandomNumber,
    getRandomIndex: getRandomIndex,
    shuffleArray: shuffleArray,
    getRandomElementFromArray: getRandomElementFromArray,
  };
}());
