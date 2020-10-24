'use strict';

(function () {
  const NUMBER_OF_ADVERTISEMENT = 8;

  /**
 * формирует моки для тестирования
 * @param {number} indexNumber - порядковый индекс изображений
 * @return {Object} - объект с данными объявления
 */
  const generateMockData = function (indexNumber) {
    const AdevertisementData = {
      TITLES: [
        `Старинный дворец`,
        `Обычная квартира`,
        `Квартира в новостройке`,
        `Загородный дом`,
        `Старая дача`,
        `Домик в деревне`,
        `Хижина в лесу`,
        `Дом на пляже`
      ],
      TYPES: [
        `palace`,
        `flat`,
        `house`,
        `bungalow`
      ],
      ROOMS: [
        1,
        2,
        3,
        100
      ],
      GUESTS: [
        1,
        2,
        3
      ],
      CHECKINOUT: [
        `12:00`,
        `13:00`,
        `14:00`
      ],
      FEATURES: [
        `wifi`,
        `dishwasher`,
        `parking`,
        `washer`,
        `elevator`,
        `conditioner`
      ],
      DESCRIPTION: [
        `Для ценителей истории и роскоши`,
        `Уютная и небольшая жилплощадь`,
        `Двухкомнатная квартира с евроремонтом`,
        `Стильный дом по индивидуальному архитектурному проекту`,
        `Условия проживания неприхотливые. Протекает крыша`,
        `Как у бабушки в детстве`,
        `Острые ощущения обеспечены`,
        `Райский уголок с видом на закат`
      ],
      PHOTOS: [
        `http://o0.github.io/assets/images/tokyo/hotel1.jpg`,
        `http://o0.github.io/assets/images/tokyo/hotel2.jpg`,
        `http://o0.github.io/assets/images/tokyo/hotel3.jpg`
      ],
      PRICE_MAX: 1000000,
      X_MAX: 1200,
      Y_MIN: 130,
      Y_MAX: 630,
      X_SHIFT: 25,
      Y_SHIFT: 70,

      generateAdvertisementData() {
        let locationX = window.util.getRandomNumber(AdevertisementData.X_MAX - AdevertisementData.X_SHIFT);
        let locationY = window.util.getRandomNumber(AdevertisementData.Y_MAX, AdevertisementData.Y_MIN);
        return {
          author: {
            avatar: `img/avatars/user0${indexNumber}.png`,
          },
          location: {
            x: locationX,
            y: locationY
          },
          offer: {
            title: window.util.getRandomElementFromArray(AdevertisementData.TITLES),
            price: window.util.getRandomNumber(AdevertisementData.PRICE_MAX),
            type: window.util.getRandomElementFromArray(AdevertisementData.TYPES),
            rooms: window.util.getRandomElementFromArray(AdevertisementData.ROOMS),
            guests: window.util.getRandomElementFromArray(AdevertisementData.GUESTS),
            checkin: window.util.getRandomElementFromArray(AdevertisementData.CHECKINOUT),
            checkout: window.util.getRandomElementFromArray(AdevertisementData.CHECKINOUT),
            features: window.util.shuffleArray(AdevertisementData.FEATURES).slice(window.util.getRandomIndex(AdevertisementData.FEATURES)),
            description: window.util.getRandomElementFromArray(AdevertisementData.DESCRIPTION),
            photos: AdevertisementData.PHOTOS.slice(window.util.getRandomIndex(AdevertisementData.PHOTOS)),
            address: `${locationX} ${locationY}`
          }
        };
      }
    };
    return AdevertisementData.generateAdvertisementData();
  };

  window.data = {
    generateMockData: generateMockData,
    NUMBER_OF_ADVERTISEMENT: NUMBER_OF_ADVERTISEMENT
  };
}());


