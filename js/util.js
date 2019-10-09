'use strict';
(function () {
  var getRandomValue = function (minValue, maxValue) {
    var rand = Math.floor(minValue + Math.random() * (maxValue + 1 - minValue));
    return rand;
  };

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

  var getArrayRandomElement = function (array) {
    return array[Math.floor(Math.random() * array.length)];
  };

  /**
   * Синхронизирует значение свойства value у двух элементов формы
   * @param {HTMLElement} donorElement - элемент у которого берётся значение свойства value
   * @param {HTMLElement} acceptorElement - элемент которому присваивается значение свойства value donorElement
   */
  var synchronizeElementsValues = function (donorElement, acceptorElement) {
    var donorValue = donorElement.value;
    acceptorElement.value = donorValue;
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

  window.util = {
    getRandomValue: getRandomValue,
    getRandomLengthArray: getRandomLengthArray,
    getArrayRandomElement: getArrayRandomElement,
    synchronizeElementsValues: synchronizeElementsValues,
    createFragment: createFragment,
  };
})();
