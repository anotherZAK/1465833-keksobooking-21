'use strict';

(function () {

  const TIMEOUT = 1500;
  const StatusCode = {
    OK: 200
  };

  /**
   * Выполняет запрос на сервер
   * @param {String} method - тип запроса
   * @param {String} address - адрес запроса
   * @param {Object} data - данные запроса
   * @return {Object} - объект промис
   */
  const sendRequest = function (method, address, data) {
    return new Promise(function (resolve, reject) {
      let xhr = new XMLHttpRequest();
      xhr.responseType = `json`;
      xhr.timeout = TIMEOUT;
      xhr.open(method, address);

      xhr.addEventListener(`load`, function () {
        if (xhr.status === StatusCode.OK) {
          resolve(xhr.response);
        } else {
          reject(`Статус ответа: ${xhr.status} ${xhr.statusText}`);
        }
      });

      xhr.addEventListener(`error`, function () {
        reject(`Произошла ошибка соединения.`);
      });

      xhr.addEventListener(`timeout`, function () {
        reject(`Запрос не успел выполниться за ${xhr.timeout} мс.`);
      });

      xhr.send(data);
    });
  };

  window.backend = {
    sendRequest: sendRequest
  };
}());
