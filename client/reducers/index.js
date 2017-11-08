import * as types from '../actions/ActionTypes';

const defaultState = {
    value: '',
    viewType: 'initial',
    sboxType: 'enable',
    focusIn: false,
    confirmAddress: {
        type: 'sbox',
        title: '테스트지점'
    }
};

const mDefault = (state = defaultState, action) => {
    switch(action.type) {
        case types.SET_CONFIRM_ADDRESS:
            return Object.assign({}, state, {
                confirmAddress: action.address
            });
        default:
            return state;
    }
};

export default mDefault;