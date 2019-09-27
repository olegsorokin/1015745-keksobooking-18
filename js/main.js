'use strict';
var AD_TITLES = ['Небольшое жильё', 'Моё пространство', 'Просторное жильё', 'Комфортное место', 'Жильё возле метро', 'Ночлег для пушественников', 'Тихое место', 'Жилье в романском стиле'];
var AD_TYPES = ['palace', 'flat', 'house', 'bungalo'];
var AD_CHEKINS = ['12:00', '13:00', '14:00'];
var AD_CHEKOUTS = ['12:00', '13:00', '14:00'];
var AD_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var AD_DESCRIPTIONS = ['Прекрасное место для семейного отдыха', 'Много места, чтобы устроить вечеринку!', 'Нет соседей поблизости', 'Хороший вариант для деловых поездок', 'Рядом есть супермаркет', 'Одиночное размещение не допускается', 'Есть персональный гараж', 'Допускается размещение с животными'];
var AD_PHOTOES = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

var AD_OFFER_TRANSLATION = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalo: 'Бунгало'
};

var AD_COUNT = 8;
var AD_PHOTO_WIDTH = 45;
var AD_PHOTO_HEIGHT = 40;
var PRICE_MIN_VALUE = 1000;
var PRICE_MAX_VALUE = 50000;
var ROOM_MAX_VALUE = 5;
var GUEST_MAX_VALUE = 8;

var MAIN_PIN_WIDTH = 65;
var MAIN_PIN_HEIGHT = 65;
var MAIN_PIN_SPKIKE_HEIGHT = 22;
var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;

var MAP_WIDTH = 1200;
var MAP_MIN_HEIGHT = 130;
var MAP_MAX_HEIGHT = 630;

var map = document.querySelector('.map');
var mapFilter = document.querySelector('.map__filters-container');
var mapFilterGroups = mapFilter.querySelectorAll('.map__filter');
var mapFilterFeaturesGroup = mapFilter.querySelector('.map__features');

var mapMainPin = document.querySelector('.map__pin--main');
var mapPins = document.querySelector('.map__pins');
var mapPinTemplate = document.querySelector('#pin')
  .content
  .querySelector('.map__pin');

var mapCardTemplate = document.querySelector('#card')
  .content
  .querySelector('.map__card');

var noticeForm = document.querySelector('.ad-form');
var noticeFormGroups = noticeForm.querySelectorAll('fieldset');
var noticeFormRoomNumbers = noticeForm.querySelector('#room_number');
var noticeFormCapacities = noticeForm.querySelector('#capacity');

var setMainPinCoordinates = function () {
  var noticeFormAdress = noticeForm.querySelector('input[name=address]');
  var MainPinX = Math.floor(mapMainPin.offsetLeft + MAIN_PIN_WIDTH / 2);
  var MainPinY = Math.floor(mapMainPin.offsetTop + MAIN_PIN_HEIGHT + MAIN_PIN_SPKIKE_HEIGHT);
  if (noticeForm.classList.contains('ad-form--disabled')) {
    MainPinY = Math.floor(mapMainPin.offsetTop + MAIN_PIN_HEIGHT / 2);
  }
  noticeFormAdress.value = MainPinX + ', ' + MainPinY;
};

var activateMap = function () {
  map.classList.remove('map--faded');
  for (var i = 0; i < mapFilterGroups.length; i++) {
    mapFilterGroups[i].removeAttribute('disabled');
  }
};

var activateNoticeForm = function () {
  noticeForm.classList.remove('ad-form--disabled');
  mapFilterFeaturesGroup.removeAttribute('disabled');
  for (var i = 0; i < noticeFormGroups.length; i++) {
    noticeFormGroups[i].removeAttribute('disabled');
  }
};

/**
 * Возвращает случайное целое число в диапазоне
 * @param {number} minValue - минимальное значение
 * @param {number} maxValue - максимальное значение
 * @return {number} rand - случайное целое число из диапазона
 */
var getRandomValue = function (minValue, maxValue) {
  var rand = Math.floor(minValue + Math.random() * (maxValue + 1 - minValue));
  return rand;
};

/**
 * Создаёт и возвращает массив элементов случайной длины из заданного массива
 * @param {*[]} baseArray - заданный массив
 * @return {*[]} randomArray - массив случайной длины из заданного массива
 */
var getRandomLengthArray = function (baseArray) {
  var randomArray = [];
  var randomCount = getRandomValue(1, baseArray.length);
  var baseArrayCopy = baseArray.slice();
  for (var i = 0; i < randomCount; i++) {
    var randomElement = baseArrayCopy[getRandomValue(0, baseArrayCopy.length - 1)];
    baseArrayCopy.splice(baseArrayCopy.indexOf(randomElement), 1);
    randomArray.push(randomElement);
  }
  return randomArray;
};

/**
 * @typedef {{author: {
 *              avatar: string
 *            },
 *            location: {
 *              x: number,
 *              y: number
 *            },
 *            offer: {
 *              title: number,
 *              address: string,
 *              price: number,
 *              type: string,
 *              rooms: number,
 *              guests: number,
 *              checkin: string,
 *              checkout: string,
 *              features: object[],
 *              description: string,
 *              photos: object[]
 *            }}} Ad
 */

/**
 * Создаёт и возращает объект (мага)
 * @param {number} adArrayIndex - номер элемента в создаваемом массиве функции createAds
 * @return {Ad} ad - объект (маг)
 */
var createAd = function (adArrayIndex) {
  var ad = {
    author: {
      avatar: 'img/avatars/user0' + (adArrayIndex + 1) + '.png'
    },
    location: {
      x: getRandomValue(PIN_WIDTH, MAP_WIDTH) - PIN_WIDTH / 2,
      y: getRandomValue(MAP_MIN_HEIGHT + PIN_HEIGHT, MAP_MAX_HEIGHT) - PIN_HEIGHT
    },
  };
  ad.offer = {
    title: AD_TITLES[adArrayIndex],
    address: String(ad.location.x) + ', ' + String(ad.location.y),
    price: getRandomValue(PRICE_MIN_VALUE, PRICE_MAX_VALUE),
    type: AD_TYPES[getRandomValue(0, AD_TYPES.length - 1)],
    rooms: getRandomValue(1, ROOM_MAX_VALUE),
    guests: getRandomValue(1, GUEST_MAX_VALUE),
    checkin: AD_CHEKINS[getRandomValue(0, AD_CHEKINS.length - 1)],
    checkout: AD_CHEKOUTS[getRandomValue(0, AD_CHEKOUTS.length - 1)],
    features: getRandomLengthArray(AD_FEATURES),
    description: AD_DESCRIPTIONS[getRandomValue(0, AD_DESCRIPTIONS.length - 1)],
    photos: getRandomLengthArray(AD_PHOTOES)
  };
  return ad;
};

/**
 * Создаёт и возвращает массив элементов (мест) указанной длины
 * @param {number} adCount - кол-во элементов в массиве
 * @return {object[]} ads - массив элементов (мест)
 */
var createAds = function (adCount) {
  var ads = [];
  for (var i = 0; i < adCount; i++) {
    ads.push(createAd(i));
  }
  return ads;
};

var createAdHTML = function (ad) {
  var adElement = mapPinTemplate.cloneNode(true);

  adElement.style = 'left: ' + ad.location.x + 'px; top: ' + ad.location.y + 'px';
  adElement.querySelector('IMG').src = ad.author.avatar;
  adElement.querySelector('IMG').alt = ad.offer.title;

  return adElement;
};

var createAdFeatureHTML = function (adFeature) {
  var adFeatureElement = document.createElement('li');
  adFeatureElement.className = 'popup__feature popup__feature--' + adFeature;
  return adFeatureElement;
};

var createAdPhotoHTML = function (adPhoto) {
  var adPhotoElement = document.createElement('img');
  adPhotoElement.src = adPhoto;
  adPhotoElement.className = 'popup__photo';
  adPhotoElement.width = AD_PHOTO_WIDTH;
  adPhotoElement.height = AD_PHOTO_HEIGHT;
  adPhotoElement.alt = 'Фотография жилья';
  return adPhotoElement;
};

/**
 * Создаёт и возвращает DocumentFragment из массива элементов
 * @param {*[]} baseArray - исходный массив элементов
 * @param {callback} htmlCreateFunction - функция, ответственная за создание HTML-элемента
 * @return {HTMLDivElement} baseFragment - DocumentFragment на основе массива
 */
var createFragment = function (baseArray, htmlCreateFunction) {
  var baseFragment = document.createDocumentFragment();
  for (var i = 0; i < baseArray.length; i++) {
    baseFragment.appendChild(htmlCreateFunction(baseArray[i]));
  }
  return baseFragment;
};

/**
 * Создаёт карточку с подробными параметрами предалагаемого жилья
 * @param {Ad} ad - элемент с заданным набором параметров
 * @return {HTMLElement} - элемент с заданным набором параметров
 */
var createCardHTML = function (ad) {
  var adFeaturesFragment = createFragment(ad.offer.features, createAdFeatureHTML);
  var adPhotoesFragment = createFragment(ad.offer.photos, createAdPhotoHTML);

  mapCardTemplate.querySelector('.popup__avatar').src = ad.author.avatar;
  mapCardTemplate.querySelector('.popup__title').textContent = ad.offer.title;
  mapCardTemplate.querySelector('.popup__text--address').textContent = ad.offer.address;
  mapCardTemplate.querySelector('.popup__text--price').innerHTML = ad.offer.price + '&#x20bd;<span>/ночь</span>';
  mapCardTemplate.querySelector('.popup__type').textContent = AD_OFFER_TRANSLATION[ad.offer.type];
  mapCardTemplate.querySelector('.popup__text--capacity').textContent = ad.offer.rooms + ' комнаты для ' + ad.offer.guests + ' гостей';
  mapCardTemplate.querySelector('.popup__text--time').textContent = 'Заезд после ' + ad.offer.checkin + ', выезд до ' + ad.offer.checkout;
  mapCardTemplate.querySelector('.popup__features').innerHTML = '';
  mapCardTemplate.querySelector('.popup__features').appendChild(adFeaturesFragment);
  mapCardTemplate.querySelector('.popup__description').textContent = ad.offer.description;
  mapCardTemplate.querySelector('.popup__photos').innerHTML = '';
  mapCardTemplate.querySelector('.popup__photos').appendChild(adPhotoesFragment);

  return mapCardTemplate;
};

var validateRoomNumberNoGuests = function () {
  if (Number(noticeFormRoomNumbers.value) === 100 && Number(noticeFormCapacities.value) !== 0) {
    noticeFormRoomNumbers.setCustomValidity('Данное кол-во комнат предназначего не для гостей!');
  } else {
    noticeFormRoomNumbers.setCustomValidity('');
  }
};

var validateCapacityNoGuests = function () {

  if (Number(noticeFormCapacities.value) === 0 && Number(noticeFormRoomNumbers.value) !== 100) {
    noticeFormCapacities.setCustomValidity('Данный параметр доступен только для 100 комнат');
  } else {
    noticeFormCapacities.setCustomValidity('');
  }
};

var validateCapacityLimit = function () {
  if (Number(noticeFormRoomNumbers.value) < Number(noticeFormCapacities.value)) {
    noticeFormCapacities.setCustomValidity('Кол-во мест должно быть не больше кол-ва комнат!');
  } else {
    noticeFormCapacities.setCustomValidity('');
  }
};

var validateNoticeForm = function () {

  if (Number(noticeFormRoomNumbers.value) === 100 || Number(noticeFormCapacities.value) === 0) {
    validateCapacityNoGuests();
    validateRoomNumberNoGuests();
  } else {
    validateCapacityLimit();
  }
};

noticeFormRoomNumbers.addEventListener('change', function () {
  validateNoticeForm();
});

noticeFormCapacities.addEventListener('change', function () {
  validateNoticeForm();
});

window.addEventListener('load', function () {
  setMainPinCoordinates();
  validateNoticeForm();
});

mapMainPin.addEventListener('mousedown', function () {
  activateMap();
  activateNoticeForm();
});

mapMainPin.addEventListener('mousedown', function () {
  setMainPinCoordinates();
});

var ads = createAds(AD_COUNT);

var fragment = createFragment(ads, createAdHTML);

mapPins.appendChild(fragment);

createCardHTML(ads[0]);

mapFilter.before(mapCardTemplate);
