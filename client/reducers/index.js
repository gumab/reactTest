import * as types from '../actions/ActionTypes';

const defaultState = {
    value: '',
    viewType: 'initial',
    sboxType: 'enable',
    recent: '강남구',
    focusIn: false,
    confirmAddress: {
        type: 'sbox',
        title: '테스트지점'
    },
    selectedAddressId: '',
    searchResult: [],
    paging: undefined,
    searchedKeyword: '',
    partnerKey: 'G',
    sboxList: [],
    mapCenter: {
        lat: 37.50011937730949,
        lng: 127.03653931419586
    },
    mapBounds: {}
};

const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case types.SET_CONFIRM_ADDRESS:
            return Object.assign({}, state, {
                confirmAddress: action.address
            });
        case types.SET_SELECTED_ADDRESS_ID:
            return Object.assign({}, state, {
                selectedAddressId: action.id
            });
        case types.SET_VIEW_TYPE:
            return Object.assign({}, state, {
                viewType: action.viewType
            });
        case types.SET_FOCUS:
            return Object.assign({}, state, {
                focusIn: action.isFocus
            });
        case types.SET_SEARCH_RESULT:
            return Object.assign({}, state, {
                searchedKeyword: action.keyword,
                searchResult: action.resultData ? action.resultData.list : undefined,
                paging: action.resultData ? action.resultData.page : undefined
            });
        case types.SET_SBOX_LIST:
            return Object.assign({}, state, {
                sboxList: action.sboxList
            });
        case types.SET_MAP_AREA:
            return Object.assign({}, state, {
                mapCenter: action.center,
                mapBounds: action.bounds
            });
        default:
            return state;
    }
};

export default reducer;