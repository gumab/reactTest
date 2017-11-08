import * as types from './ActionTypes';

export function setConfirmAddress(address) {
    return {
        type: types.SET_CONFIRM_ADDRESS,
        address:address
    };
}