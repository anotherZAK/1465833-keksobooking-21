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

  window.util = {
    shuffleArray: shuffleArray,
  };
}());
