import * as types from './ActionTypes';

export const setSelectedAddress = (address) => {
    return {
        type: types.SET_SELECTED_ADDRESS,
        address: address
    };
};

export const setViewType = (viewType) => {
    return {
        type: types.SET_VIEW_TYPE,
        viewType: viewType
    };
};

export const setMarker = (address) => {
    return {
        type: types.SET_MARKER,
        address: address
    };
};

export const setFocus = (isFocus) => {
    return {
        type: types.SET_FOCUS,
        isFocus: isFocus
    };
};

export const setSearchResult = (keyword, resultData) => {
    return {
        type: types.SET_SEARCH_RESULT,
        keyword: keyword,
        resultData: resultData
    };
};

export const setSboxList = (sboxList) => {
    return {
        type: types.SET_SBOX_LIST,
        sboxList: sboxList
    };
};

export const setShowingSboxList = (sboxList) => {
    return {
        type: types.SET_SHOWING_SBOX_LIST,
        sboxList: sboxList
    };
};

export const setMapArea = (center, level) => {
    return {
        type: types.SET_MAP_AREA,
        center: center,
        level: level
    };
};

export const setGpsLocation = (location) => {
    return {
        type: types.SET_GPS_LOCATION,
        location: location
    };
};

export const setGpsStatus = (status) => {
    return {
        type: types.SET_GPS_STATUS,
        status: status
    };
};

export const setVirtualMapHeight = (height) => {
    return {
        type: types.SET_VIRTUAL_MAP_HEIGHT,
        height: height
    };
};