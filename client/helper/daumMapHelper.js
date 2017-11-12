'use strict';

import consts from '../consts';

export const getDaumMapAPI = () => {
    if (!window.daum.maps) {
        throw new Error('Daum Map not loaded yet!');
    }
    return window.daum.maps;
};

export const toDaumCoords = (coords) => {
    let result = new daum.maps.LatLng(0, 0);
    if (coords.lat && coords.lng && coords.lat > 0 && coords.lng > 0) {
        result = new daum.maps.LatLng(coords.lat, coords.lng);
    } else if (coords.latitude && coords.longitude && coords.latitude > 0 && coords.longitude > 0) {
        result = new daum.maps.LatLng(coords.latitude, coords.longitude);
    } else if (coords.getLat && coords.getLng) {
        result = coords;
    }
    return result;
};

export const toCoords = (coords) => {
    let result = {
        lat: 0,
        lng: 0
    };
    if (coords && coords.getLat && coords.getLng) {
        result = {
            lat: coords.getLat(),
            lng: coords.getLng()
        };
    } else if (coords.latitude && coords.longitude && coords.latitude > 0 && coords.longitude > 0) {
        result = {
            lat: coords.latitude,
            lng: coords.longitude
        };
    } else if (coords.lat && coords.lng && coords.lat > 0 && coords.lng > 0) {
        result = coords;
    }

    return result;
};


export const getMarkerImage = (type) => {

    let imgSrc, imgSize, imgOption;
    if (type === consts.MARKER_IMG_TYPE.SBOX.VIEW) {
        imgSrc = '//mockupdev.ebay.co.kr/images/address/img_pin.png';
        imgSize = new daum.maps.Size(28, 28);
        imgOption = {
            offset: new daum.maps.Point(14, 28)
        };
    } else if (type === consts.MARKER_IMG_TYPE.SBOX.CHECK) {
        imgSrc = '//mockupdev.ebay.co.kr/images/address/img_pin_smile.png';
        imgSize = new daum.maps.Size(44, 44);
        imgOption = {
            offset: new daum.maps.Point(22, 44)
        };
    } else if (type === consts.MARKER_IMG_TYPE.SBOX.CONFIRM) {
        imgSrc = '//mockupdev.ebay.co.kr/images/address/img_pin_smile2.png';
        imgSize = new daum.maps.Size(50, 50);
        imgOption = {
            offset: new daum.maps.Point(25, 50)
        };
    } else if (type === consts.MARKER_IMG_TYPE.GPS) {
        imgSrc = '//mockupdev.ebay.co.kr/images/address/img_pin_location.png';
        imgSize = new daum.maps.Size(15, 15);
        imgOption = {
            offset: new daum.maps.Point(7.5, 7.5)
        };
    } else if (type === consts.MARKER_IMG_TYPE.CONFIRM) {
        imgSrc = '//mockupdev.ebay.co.kr/images/address/img_pin_blue2.png';
        imgSize = new daum.maps.Size(50, 50);
        imgOption = {
            offset: new daum.maps.Point(25, 50)
        };
    } else if (type === consts.MARKER_IMG_TYPE.CHECK) {
        imgSrc = '//mockupdev.ebay.co.kr/images/address/img_pin_blue.png';
        imgSize = new daum.maps.Size(44, 44);
        imgOption = {
            offset: new daum.maps.Point(22, 44)
        };
    } else {
        return null;
    }
    let img = new daum.maps.MarkerImage(imgSrc, imgSize, imgOption);
    return img;
};