'use strict';

(function () {
  const MAX_NUMBER_OF_ANNOUNCEMENT = 5;
  const mapPins = document.querySelector(`.map__pins`);
  const similarAdvertisementTemplate = document.querySelector(`#pin`).content;
  const similarAdvertisementItem = similarAdvertisementTemplate.querySelector(`.map__pin`);

  /**
   * отрисовывает карточки объявлений
   * @param {Object} evt - объект-события
   * @param {Object} data - массив объектов с данными
   */
  const renderCards = function (evt, data) {
    let mapCard = mapPins.querySelector(`.map__card`);
    const cardContainer = document.createDocumentFragment();

    if (evt.target.classList.value === similarAdvertisementItem.classList.value) {
      if (mapCard) {
        mapPins.removeChild(mapCard);
      }
      let index = data.findIndex(function (item) {
        return item.offer.title === evt.target.firstChild.alt;
      });
      cardContainer.appendChild(window.markup.makeHtmlPopup(data[index]));
    } else if (!evt.target.classList.value && (evt.target.alt !== `Метка объявления`)) {
      if (mapCard) {
        mapPins.removeChild(mapCard);
      }
      let index = data.findIndex(function (item) {
        return item.offer.title === evt.target.alt;
      });
      cardContainer.appendChild(window.markup.makeHtmlPopup(data[index]));
    }
    mapPins.appendChild(cardContainer);

    const cardCloseButton = mapPins.querySelector(`.popup__close`);

    if (cardCloseButton) {
      cardCloseButton.addEventListener(`click`, function () {
        mapCard = mapPins.querySelector(`.map__card`);
        if (mapCard) {
          mapPins.removeChild(mapCard);
        }
      });
      document.addEventListener(`keydown`, function (event) {
        mapCard = mapPins.querySelector(`.map__card`);
        if (event.key === `Escape` && mapCard) {
          mapPins.removeChild(mapCard);
        }
      });
    }
  };

  /**
   * отрисовывает метки объявлений
   * @param {Object} data - массив объектов с данными
   */
  const renderPins = function (data) {
    const shuffleData = window.util.shuffleArray(data);
    const takeNumber = data.length > MAX_NUMBER_OF_ANNOUNCEMENT
      ? MAX_NUMBER_OF_ANNOUNCEMENT
      : data.length;

    const pinsContainer = document.createDocumentFragment();
    for (let i = 0; i < takeNumber; i++) {
      pinsContainer.appendChild(window.markup.makeHtmlAnnouncement(shuffleData[i]));
    }
    const pinMain = mapPins.querySelector(`.map__pin--main`);

    mapPins.textContent = ``;
    mapPins.appendChild(pinMain);
    mapPins.appendChild(pinsContainer);
  };

  window.render = {
    renderCards: renderCards,
    renderPins: renderPins
  };
}());
