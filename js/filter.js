'use strict';

(function () {
  const MAX_NUMBER_OF_ANNOUNCEMENT = 5;

  const housingType = document.querySelector(`#housing-type`);
  const housingPrice = document.querySelector(`#housing-price`);
  const housingRooms = document.querySelector(`#housing-rooms`);
  const housingGuests = document.querySelector(`#housing-guests`);
  const housingFeatures = document.querySelectorAll(`.map__checkbox`);

  const FiltrationConditions = {
    houseType: {
      element: housingType,
      isEqual(data) {
        return (this.element.value === `any`) ? true : this.element.value === data.offer.type;
      }
    },
    housePrice: {
      element: housingPrice,
      priceRange: {
        low: {
          min: 0,
          max: 10000
        },
        middle: {
          min: 10000,
          max: 50000
        },
        high: {
          min: 50000,
          max: Infinity
        }
      },
      isEqual(data) {
        return (this.element.value === `any`) ? true : data.offer.price >= this.priceRange[this.element.value].min && data.offer.price <= this.priceRange[this.element.value].max;
      }
    },
    roomsNumber: {
      element: housingRooms,
      isEqual(data) {
        return (this.element.value === `any`) ? true : Number(this.element.value) === data.offer.rooms;
      }
    },
    guestsNumber: {
      element: housingGuests,
      isEqual(data) {
        return (this.element.value === `any`) ? true : Number(this.element.value) === data.offer.guests;
      }
    },
    houseFeatures: {
      elements: housingFeatures,
      isEqual(data) {
        let equal = true;
        this.elements.forEach(function (feature) {
          if (equal) {
            equal = feature.checked === false ? true : data.offer.features.includes(feature.value);
          }
        });
        return equal;
      }
    }
  };

  /**
   * реализует фильтрацию данных
   * @param {Array} data - данные для фильтрации
   * @return {Array} - отфильтрованный массив данных, размером не более MAX_NUMBER_OF_ANNOUNCEMENT
   */
  const filterData = function (data) {
    let filteredData = data.filter(function (dataItem) {
      let flag = true;
      for (const condition in FiltrationConditions) {
        if (flag) {
          flag = FiltrationConditions[condition].isEqual(dataItem);
        }
      }
      return flag;
    });
    const shuffleData = window.util.shuffleArray(filteredData);
    return shuffleData.splice(0, MAX_NUMBER_OF_ANNOUNCEMENT);
  };

  window.filter = {
    filterData
  };
}());
