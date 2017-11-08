function getDaumMapAPI() {
    if (!window.daum.maps) {
        throw new Error('Daum Map not loaded yet!');
    }
    return window.daum.maps;
}

function coordsToDaumCoords(coords) {
    let result = new daum.maps.LatLng(0, 0);
    if (coords.lat && coords.lng && coords.lat > 0 && coords.lng > 0) {
        result = new daum.maps.LatLng(coords.lat, coords.lng);
    } else if (coords.latitude && coords.longitude && coords.latitude > 0 && coords.longitude > 0) {
        result = new daum.maps.LatLng(coords.latitude, coords.longitude);
    }
    return result;
}

function daumCoordsToCoords(daumCoords) {

    let result = {
        lat: 0,
        lng: 0
    };
    if (daumCoords && daumCoords.getLat && daumCoords.getLng) {
        result = {
            lat: daumCoords.getLat(),
            lng: daumCoords.getLng()
        };
    }

    return result;
}

export default {
    getDaumMapAPI, daumCoordsToCoords, coordsToDaumCoords
};
