'use strict';

import docCookies from '../libs/docCookies';
import consts from '../consts';

export const addHistory = (keyword) => {
    let orgItem = docCookies.getItem(consts.COOKIE_KEYS.SEARCH_HISTORY);
    if (orgItem) {
        orgItem = JSON.parse(orgItem);
    } else {
        orgItem = [];
    }

    orgItem = orgItem.filter((x) => {
        if (x !== keyword) {
            return x;
        }
    });

    orgItem = [keyword].concat(orgItem);

    while (orgItem.length > consts.RECENT_KEYWORD_MAX + 2) {
        orgItem.pop();
    }

    docCookies.setItem(consts.COOKIE_KEYS.SEARCH_HISTORY, JSON.stringify(orgItem));
    return orgItem;
};

export const getHistory = () => {
    let orgItem = docCookies.getItem(consts.COOKIE_KEYS.SEARCH_HISTORY);
    if (orgItem) {
        orgItem = JSON.parse(orgItem);
    } else {
        orgItem = [];
    }
    return orgItem;
};

export const removeHistory = (keyword) => {
    let orgItem = docCookies.getItem(consts.COOKIE_KEYS.SEARCH_HISTORY);
    if (!orgItem) {
        return;
    }
    orgItem = JSON.parse(orgItem);

    orgItem = orgItem.filter((x) => {
        if (x !== keyword) {
            return x;
        }
    });

    docCookies.setItem(consts.COOKIE_KEYS.SEARCH_HISTORY, JSON.stringify(orgItem));
    return orgItem;
};

export const removeAllHistory = () => {
    docCookies.removeItem(consts.COOKIE_KEYS.SEARCH_HISTORY);
};