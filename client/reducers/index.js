import * as types from '../actions/ActionTypes';

const defaultState = {
    value: '',
    viewType: 'confirm',
    sboxType: 'enable',
    recent: '강남구',
    focusIn: false,
    confirmAddress: {
        type: 'sbox',
        title: '테스트지점'
    },
    selectedAddressId: ''
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
        default:
            return state;
    }
};

export default reducer;