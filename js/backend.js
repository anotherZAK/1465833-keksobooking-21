'use strict';

(function () {

  const mapPins = document.querySelector(`.map__pins`);
  const mapFormElements = document.querySelectorAll(`.map__filter, .map__features`);
  const mapFilters = document.querySelector(`.map__filters`);

  /**
   * Загружает данные от сервера
   * @param {Object} onSuccess - функция, выполняемая в случае успешной загрузки
   * @param {Object} onError - функция, выполняемая в случае неуспешной загрузки
   */
  const load = function (onSuccess, onError) {
    const URL = `https://21.javascript.pages.academy/keksobooking/data`;
    const TIMEOUT = 1500;
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

  /**
   * отображает данные (похожие объявления) при успешной загрузке
   * @param {Array} announcements - массив объектов с данными
   */
  const successHandlerLoad = function (announcements) {
    const limitAnnouncements = window.filter.filterData(announcements);
    window.render.pins(limitAnnouncements);

    const onFilterFormChange = window.util.debounce(function () {
      const filteresAnnouncements = window.filter.filterData(announcements);
      window.render.pins(filteresAnnouncements);
    });

    mapFilters.addEventListener(`change`, onFilterFormChange);

    mapPins.addEventListener(`click`, function (evt) {
      window.render.cards(evt, announcements);
    });
    mapPins.addEventListener(`keydown`, function (evt) {
      if (evt.key === `Enter`) {
        window.render.cards(evt, announcements);
      }
    });
  };

  /**
   * отображает сообщение при неуспешной загрузке данных
   * @param {String} errorMessage - сообщение
   */
  const errorHandlerLoad = function (errorMessage) {
    mapFormElements.forEach(function (formElement) {
      formElement.setAttribute(`disabled`, `disabled`);
    });

    const popupNode = document.createElement(`div`);
    popupNode.style = `z-index: 1; margin: 0 auto; text-align: center; background-color: tomato; border-width: 3px; border-style: solid; border-color: red;`;
    popupNode.style.fontSize = `22px`;
    popupNode.style.position = `fixed`;
    popupNode.style.left = 0;
    popupNode.style.right = 0;
    popupNode.style.fontWeight = `bold`;
    popupNode.textContent = errorMessage;

    mapPins.appendChild(popupNode);
  };

  window.backend = {
    load: load,
    successHandlerLoad: successHandlerLoad,
    errorHandlerLoad: errorHandlerLoad
  };
}());
