'use strict';

import consts from '../consts';

const getSmileboxLevel = () => {
    let result = 0;
    let mapLevel = this.daumMap.getLevel();

    if (mapLevel < consts.MAP_LEVEL.SHOW_ALL) {
        result = consts.SBOX_LEVEL.SHOW_ALL; // 전부 표시
    } else if (mapLevel < consts.MAP_LEVEL.SHOW_DONG) {
        result = consts.SBOX_LEVEL.SHOW_DONG; // 동 표시
    } else if (mapLevel < consts.MAP_LEVEL.SHOW_GU) {
        result = consts.SBOX_LEVEL.SHOW_GU; // 구 표시
    } else {
        result = consts.SBOX_LEVEL.SHOW_NONE;
    }
    return result;
};

const getMarkerImage = (type) => {

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

const setMarkerStatusPrivate = (info, status, daumMap) => {
    if (!(info && info.longitude && info.latitude && info.longitude > 0 && info.latitude > 0)) {
        return;
    }

    if (info.marker) {
        info.marker.setMap(null);
    }

    let markerImageType;

    if (info.type === consts.PLACE_TYPE.SBOX) {
        markerImageType = consts.MARKER_IMG_TYPE.SBOX[status.key];
    } else {
        markerImageType = consts.MARKER_IMG_TYPE[status.key];
    }

    /** 일반 마커는 VIEW 상태 없음 */
    if (!markerImageType) {
        return;
    }

    let latlng = new daum.maps.LatLng(info.latitude, info.longitude);

    info.checked = (status !== consts.MARKER_STATUS.VIEW);
    info.marker = new daum.maps.Marker({
        image: getMarkerImage(markerImageType),
        position: latlng
    });
    info.marker.setZIndex(status.zidx);
    info.marker.status = status;
    info.marker.setMap(daumMap);

    if (info.type !== consts.PLACE_TYPE.SBOX) {
        this.currAddrMarker = info.marker;
    }

    /*
    daum.maps.event.addListener(info.marker, 'click', () => {
        //new EventTrigger().clickMarker(info);
    });*/
};

const getOptimizedCoords = (coords, orgHeight) => {
    let contHeight = this.daumMapDiv.height();
    if (orgHeight) {
        contHeight = orgHeight;
    }
    let projection = this.daumMap.getProjection();
    let point = projection.containerPointFromCoords(coords);
    point.y += (contHeight - this.virtualMapHeight) / 2;
    return projection.coordsFromContainerPoint(point);
};

const setCenterPrivate = (latlng, orgHeight) => {
    if (!latlng) {
        return;
    }

    if (typeof latlng.toCoords != 'function') {
        if (latlng.lat && latlng.lng && latlng.lat > 0 && latlng.lng > 0) {
            latlng = new daum.maps.LatLng(latlng.lat, latlng.lng);
        } else if (latlng.latitude && latlng.longitude && latlng.latitude > 0 && latlng.longitude > 0) {
            latlng = new daum.maps.LatLng(latlng.latitude, latlng.longitude);
        } else {
            return;
        }
    }

    this.daumMap.setCenter(getOptimizedCoords(latlng, orgHeight));
};

class DaumMapController {
    initMap(sboxList) {
        let mapOption = {
            center: new daum.maps.LatLng(37.50011937730949, 127.03653931419586), // 지도의 중심좌표
            level: consts.MAP_LEVEL.SEARCH_RESULT || 4 // 지도의 확대 레벨
        };

        this.daumMapDiv = document.getElementById('daum_map');

        this.daumMap = new daum.maps.Map(this.daumMapDiv, mapOption); // 지도를 생성합니다
        this.virtualMapHeight = parseInt(this.daumMapDiv.style.height);

        let markerImage = getMarkerImage(consts.MARKER_IMG_TYPE.GPS);
        this.currentGpsMarker = new daum.maps.Marker({
            image: markerImage
        });
        this.currentGpsCircle = new daum.maps.Circle({
            strokeWeight: 1, // 선의 두께입니다 
            strokeOpacity: 0.3,
            strokeColor: '#2e8de5',
            fillColor: '#2e8de5', // 채우기 색깔입니다
            fillOpacity: 0.2  // 채우기 불투명도 입니다   
        });
        this.sbox = this.initSboxMarker(sboxList);
        daum.maps.event.addListener(this.daumMap, 'idle', ()=>{
            this.setSmilebox(window.daumMapController.daumMap);
        });
    }

    setEvent(target, type, handler) {
        daum.maps.event.addListener(target, type, handler);
    }

    setMapHeight(newHeight) {
        let orgHeight = this.virtualMapHeight;
        if (newHeight !== orgHeight) {
            this.virtualMapHeight = newHeight;
            setCenterPrivate(this.daumMap.getCenter(), orgHeight);
        }
    }

    relayout() {
        this.daumMap.relayout();
    }

    setGpsMarker(location) {
        let latlng = new daum.maps.LatLng(location.coords.latitude, location.coords.longitude);
        this.currentGpsMarker.setPosition(latlng);
        this.currentGpsMarker.setMap(this.daumMap);
        this.currentGpsCircle.setRadius(location.coords.accuracy);
        this.currentGpsCircle.setPosition(latlng);
        this.currentGpsCircle.setMap(this.daumMap);
        setCenterPrivate(latlng);
    }

    setCenter(latlng) {
        setCenterPrivate(latlng);
    }

    getCenter() {
        return this.daumMap.getCenter();
    }

    resetMarkers() {
        this.sbox.filter((x) => {
            return x.checked;
        }).forEach((x) => {
            setMarkerStatusPrivate(x, consts.MARKER_STATUS.VIEW, this.daumMap);
        });

        let marker = this.currAddrMarker;
        if (marker) {
            marker.setMap(null);
            marker = null;
        }
    }

    setMarkerStatus(info, markerStatus) {
        setMarkerStatusPrivate(info, markerStatus, this.daumMap);
    }

    initSboxMarker(sboxList) {
        sboxList.forEach(x => {
            setMarkerStatusPrivate(x, consts.MARKER_STATUS.VIEW, this.daumMap);
        });

        return sboxList;
    }

    setSmilebox() {
        const bounds = this.daumMap.getBounds();
        const ne = bounds.getNorthEast();
        const sw = bounds.getSouthWest();
        const maxLat = ne.getLat();
        const maxLng = ne.getLng();
        const minLat = sw.getLat();
        const minLng = sw.getLng();

        const smileboxLevel = getSmileboxLevel();

        this.sbox.forEach((x) => {
            const lat = parseFloat(x.latitude);
            const lng = parseFloat(x.longitude);
            if (x.checked) {
                x.marker.setMap(this.daumMap);
            } else if (smileboxLevel !== consts.SBOX_LEVEL.SHOW_NONE &&
                (smileboxLevel === consts.SBOX_LEVEL.SHOW_ALL ||
                    (smileboxLevel === consts.SBOX_LEVEL.SHOW_DONG && x.dongrep) ||
                    (smileboxLevel === consts.SBOX_LEVEL.SHOW_GU && x.gurep)) &&
                (minLat < lat && lat < maxLat && minLng < lng && lng < maxLng)) {
                x.marker.setMap(this.daumMap);
            } else {
                x.marker.setMap(null);
            }
        });


        if (this.infowindow && (this.infowindow.getMap() || this.infowindow.tempClose)) {
            let sboxWithWindow = this.sbox.find(x => x.id === this.infowindow.target);
            if (sboxWithWindow) {
                if (smileboxLevel < 2) {
                    sboxWithWindow.marker.setMap(this.daumMap);
                    if (this.infowindow.tempClose) {
                        this.infowindow.open(this.daumMap, sboxWithWindow.marker);
                        this.infowindow.tempClose = false;
                    }
                } else {
                    this.infowindow.close();
                    this.infowindow.tempClose = true;
                }
            }
        }
    }

    setSboxPromoInfoWindow(closestBranch) {
        if (this.infowindow) {
            this.infowindow.close();
        } else {
            this.infowindow = new daum.maps.InfoWindow({
                disableAutoPan: true
            });
        }

        if (closestBranch) {
            let iwContent = `<div style="padding:10px;padding-right:30px; font-size:13px">
                        <div style="position:absolute; top:10px; right:10px" onclick="this.infowindow.close()">X</div>
                        근처에 스마일박스가 있어요!<br>
                        <span style="color:#2e8de5">약 ${parseInt(closestBranch.distance)}m</span>
                    </div>`; // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다

            this.infowindow.setContent(iwContent);


            // 마커 위에 인포윈도우를 표시합니다. 두번째 파라미터인 marker를 넣어주지 않으면 지도 위에 표시됩니다
            this.infowindow.open(this.daumMap, closestBranch.branch.marker);
            this.infowindow.setZIndex(20);
            this.infowindow.target = closestBranch.branch.id;
        }
    }

    setMapLevel(level) {
        this.daumMap.setLevel(level);
    }

    addMapLevel(diff) {
        this.daumMap.setLevel(this.daumMap.getLevel() + diff);
    }
}

export default DaumMapController;