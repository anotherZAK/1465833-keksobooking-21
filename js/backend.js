'use strict';

(function () {

  const TIMEOUT = 1500;
  const StatusCode = {
    OK: 200
  };

  /**
   * Загружает данные от сервера
   * @param {Object} onSuccess - функция, выполняемая в случае успешной загрузки
   * @param {Object} onError - функция, выполняемая в случае неуспешной загрузки
   */
  const load = function (onSuccess, onError) {
    const URL = `https://21.javascript.pages.academy/keksobooking/data`;

    let xhr = new XMLHttpRequest();
    xhr.responseType = `json`;
    xhr.timeout = TIMEOUT;

    xhr.open(`GET`, URL);

    xhr.addEventListener(`load`, function () {
      if (xhr.status === StatusCode.OK) {
        onSuccess(xhr.response);
      } else {
        onError(`Данные не загружены. Статус ответа: ${xhr.status} ${xhr.statusText}`);
      }
    });

    xhr.addEventListener(`error`, function () {
      onError(`Данные не загружены. Произошла ошибка соединения.`);
    });

    xhr.addEventListener(`timeout`, function () {
      onError(`Данные не загружены. Запрос не успел выполниться за ${xhr.timeout} мс.`);
    });

    xhr.send();
  };

  const save = function (data, onLoad, onError) {
    const URL = `https://21.javascript.pages.academy/keksobooking`;

    let xhr = new XMLHttpRequest();
    xhr.timeout = TIMEOUT;
    xhr.responseType = `json`;

    xhr.addEventListener(`load`, function () {
      if (xhr.status === StatusCode.OK) {
        onLoad();
      } else {
        onError();
      }
    });

    xhr.addEventListener(`timeout`, function () {
      onError();
    });

    xhr.open(`POST`, URL);
    xhr.send(data);
  };

  window.backend = {
    load: load,
    save: save,
  };
}());
