'use strict';
(function () {
  var map = document.querySelector('.map');
  var mapMainPin = document.querySelector('.map__pin--main');
  var mapPins = document.querySelector('.map__pins');

  var noticeForm = document.querySelector('.ad-form');
  var noticeFormAdress = noticeForm.querySelector('#address');
  var noticeFormPlaceType = noticeForm.querySelector('#type');
  var noticeFormRoomNumbers = noticeForm.querySelector('#room_number');
  var noticeFormCapacities = noticeForm.querySelector('#capacity');
  var noticeFormTimeIn = noticeForm.querySelector('#timein');
  var noticeFormTimeOut = noticeForm.querySelector('#timeout');

  var deactivatePage = function () {
    window.map.deactivateMap();
    window.form.deactivateNoticeForm();
  };

  var activatePage = function () {
    window.map.activateMap();
    window.mainPin.setMainPinCoordinates();
    window.pin.renderPins();
    window.form.setMinPriceForPlaceType();
    window.form.activateNoticeForm();
  };

  var resetPage = function () {
    window.mainPin.setMainPinStartCoordinates();
    window.mainPin.setMainPinCoordinates();
    window.pin.clearPins();
    window.card.closeAdCard();
    window.form.setNoticeFormBaseValues();
  };

  window.addEventListener('load', function () {
    window.form.saveNoticeFormBaseValues();
    window.mainPin.saveMainPinStartCoordinates();
    window.mainPin.setMainPinCoordinates();
    deactivatePage();
  });

  mapMainPin.addEventListener('mousedown', function () {
    if (map.classList.contains('map--faded')) {
      activatePage();
    }
  });

  mapMainPin.addEventListener('mousedown', function (evt) {
    window.mainPin.dragDrobMainPin(evt);
  });

  mapMainPin.addEventListener('mousedown', window.mainPin.setMainPinCoordinates);

  mapPins.addEventListener('click', function (evt) {
    window.pin.onPinClick(evt);
  });

  noticeForm.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(noticeForm), function () {
      window.showSuccess();
      resetPage();
      deactivatePage();
    }, window.showError);
    evt.preventDefault();
  });

  noticeFormAdress.addEventListener('keydown', function () {
    noticeFormAdress.readOnly = true;
  });

  noticeFormAdress.addEventListener('blur', function () {
    noticeFormAdress.readOnly = false;
  });

  noticeFormPlaceType.addEventListener('change', window.form.setMinPriceForPlaceType);

  noticeFormRoomNumbers.addEventListener('change', window.form.validateNoticeForm);

  noticeFormCapacities.addEventListener('change', window.form.validateNoticeForm);

  noticeFormTimeIn.addEventListener('change', function () {
    window.util.synchronizeElementsValues(noticeFormTimeIn, noticeFormTimeOut);
  });

  noticeFormTimeOut.addEventListener('change', function () {
    window.util.synchronizeElementsValues(noticeFormTimeOut, noticeFormTimeIn);
  });
})();
