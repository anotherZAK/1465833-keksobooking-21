'use strict';

(function () {
  const load = function (onSuccess, onError) {
    const URL = `https://21.javascript.pages.academy/keksobooking/data`;
    const TIMEOUT = 1000;
    const StatusCode = {
      OK: 200
    };

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

  window.backend = {
    load: load
  };
}());
