'use strict';

(function () {
  const similarAdvertisementTemplate = document.querySelector(`#pin`).content;
  const similarAdvertisementItem = similarAdvertisementTemplate.querySelector(`.map__pin`);

  /**
   * формирует разметку с данными объявления
   * @param {Object} announcement - исходный объект с данными объявления
   * @return {Object} - объект html-разметки с модифицированными данными объявления
   */

  const makeHtmlAnnouncement = function (announcement) {
    const announcementElement = similarAdvertisementItem.cloneNode(true);
    const announcementImg = announcementElement.querySelector(`img`);

    announcementImg.src = announcement.author.avatar;
    announcementImg.alt = announcement.offer.title;
    announcementElement.style = `left: ${announcement.location.x}px; top: ${announcement.location.y}px`;

    return announcementElement;
  };

  /**
   * создаёт массив объектов с данными объявлений
   * @param {number} numberOfAnnouncement - количество объявлений
   * @return {Array} - массив с объектами - объявлениями
   */

  const generateAnnouncement = function (numberOfAnnouncement) {
    let announcementData = [];
    for (let i = 0; i < numberOfAnnouncement; i++) {
      announcementData[i] = window.data.generateMockData(i + 1);
    }

    return announcementData;
  };

  /**
   * добавляет объявления в разметку документа
   * @param {Array} announcements - исходный массив с объектами - объявлениями
   * @return {Object} - объект с новой разметкой, содержащей разметку объектов - объявлений
   */

  const renderPins = function (announcements) {
    const mapPins = document.querySelector(`.map__pins`);
    const pinsContainer = document.createDocumentFragment();
    announcements.forEach(function (item) {
      pinsContainer.appendChild(makeHtmlAnnouncement(item));
    });

    return mapPins.appendChild(pinsContainer);
  };

  const advertisement = generateAnnouncement(window.data.NUMBER_OF_ADVERTISEMENT);
  renderPins(advertisement);
}());
