'use strict';

(function () {
  const housingTypeElement = document.querySelector(`#housing-type`);

  /**
   * осуществляет фильтрацию объявлений в зависимости от типа жилья
   * @param {Object} evt - объект-событие
   * @param {Object} data - данные объявлений
   */
  const filterByHousingType = function (evt, data) {

    const announcementsFilterByType = data.filter(function (item) {
      if (evt.target.value !== `any`) {
        return item.offer.type === evt.target.value;
      }
      return data;
    });
    window.render.pins(announcementsFilterByType);
  };

  window.filter = {
    housingTypeElement: housingTypeElement,
    byHousingType: filterByHousingType
  };
}());
