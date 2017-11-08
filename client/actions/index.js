import * as types from './ActionTypes';

export const setConfirmAddress = (address) => {
    return {
        type: types.SET_CONFIRM_ADDRESS,
        address: address
    };
};

export const setSelectedAddressId = (id) => {
    return {
        type: types.SET_SELECTED_ADDRESS_ID,
        id: id
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

export const setMapArea = (center, bounds) => {
    return {
        type: types.SET_MAP_AREA,
        center: center,
        bounds: bounds
    };
};
