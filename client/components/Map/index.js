import React, { Component } from 'react';
import Promotion from './Promotion';
import * as daumMapHelper from '../../helper/daumMapHelper';
import consts from '../../consts';
import classNames from 'classnames';
import { clearTimeout } from 'timers';

class MapComponent extends Component {
    constructor() {
        super();
        this.onChangeMap = this.onChangeMap.bind(this);
        this.onClickZoomButton = this.onClickZoomButton.bind(this);
        this.onClickGpsButton = this.onClickGpsButton.bind(this);
        this.getAccuracyText = this.getAccuracyText.bind(this);
        this.onMapAreaChanged = this.onMapAreaChanged.bind(this);
        this.getVirtualCoords = this.getVirtualCoords.bind(this);
        this.onClickRootDiv = this.onClickRootDiv.bind(this);
        this.setMarker = this.setMarker.bind(this);
        this.onClickMarker = this.onClickMarker.bind(this);
        this.setVirtualMapCenter = this.setVirtualMapCenter.bind(this);
        this.setGpsMarker = this.setGpsMarker.bind(this);
        this.showAccuracyToast = this.showAccuracyToast.bind(this);
    }

    componentDidMount() {
        const daumAPI = daumMapHelper.getDaumMapAPI();
        let mapOption = {
            center: daumMapHelper.toDaumCoords(this.props.mapCenter), // 지도의 중심좌표
            level: consts.MAP_LEVEL.SEARCH_RESULT || 4 // 지도의 확대 레벨
        };

        const daumMap = new daumAPI.Map(this.mapDiv, mapOption);
        daumAPI.event.addListener(daumMap, 'idle', this.onChangeMap);
        this.daumMap = daumMap;


        $(document).on('mapAreaChanged', this.onMapAreaChanged);

        //for debug
        window.myMap = daumMap;
        this.props.setVirtualMapHeight(this.mapDiv.offsetHeight);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.mapCenter !== this.props.mapCenter ||
            prevProps.mapLevel !== this.props.mapLevel ||
            prevProps.virtualMapHeight !== this.props.virtualMapHeight
        ) {
            this.daumMap.setLevel(this.props.mapLevel);
            this.daumMap.setCenter(daumMapHelper.toDaumCoords(this.props.mapCenter));
        }

        if (prevProps.selectedAddress !== this.props.selectedAddress) {
            let prevAddress = prevProps.selectedAddress;
            let thisAddress = this.props.selectedAddress;

            if (prevAddress.level1 !== thisAddress.level1) {
                this.setMarker(prevAddress.level1, 0);
            }
            if (prevAddress.level2 !== thisAddress.level2) {
                this.setMarker(prevAddress.level2, 0);
            }

            if (prevAddress.level1 !== thisAddress.level1) {
                if (thisAddress.level1 && thisAddress.level1.id) {
                    this.setMarker(thisAddress.level1, 1);
                    this.setVirtualMapCenter(thisAddress.level1);
                }
            }

            if (prevAddress.level2 !== thisAddress.level2) {
                if (thisAddress.level2 && thisAddress.level2.id) {
                    window.mapSet('min');
                    this.setMarker(thisAddress.level2, 2);
                    setTimeout(() => {
                        this.setVirtualMapCenter(thisAddress.level2);
                    }, 0);
                } else {
                    window.mapSet('half');
                }
            }
        }

        if (prevProps.gpsLocation !== this.props.gpsLocation) {
            this.setGpsMarker(this.props.gpsLocation);
            this.setVirtualMapCenter(this.props.gpsLocation);
        } else if (prevProps.gpsStatus !== this.props.gpsStatus
            && this.props.gpsStatus == consts.GPS_BTN_STATUS.ENABLE
            && this.props.gpsLocation
        ) {
            let coords = daumMapHelper.toCoords(prevProps.gpsLocation);
            if (!(coords.lat && coords.lng)) {
                return;
            }
            this.setGpsMarker(this.props.gpsLocation);
            this.setVirtualMapCenter(this.props.gpsLocation);
        }

        if (prevProps.sboxList !== this.props.sboxList) {
            this.props.sboxList.forEach((x) => {
                this.setMarker(x, 0);
            });
        }

        if (prevProps.showingSboxList !== this.props.showingSboxList) {
            this.props.sboxList.forEach((x) => {
                if (this.props.showingSboxList.indexOf(x.id) < 0) {
                    this.setMarker(x, -1);
                } else {
                    if (this.props.selectedAddress.level2.id === x.id) {
                        this.setMarker(x, 2);
                    } else if (this.props.selectedAddress.level1.id === x.id) {
                        this.setMarker(x, 1);
                    } else {
                        this.setMarker(x, 0);
                    }
                }
            });
        }
    }

    showAccuracyToast() {
        this.props.setAccuracyToast(true);
        if (window.toastTimeout) {
            window.clearTimeout(window.toastTimeout);
        }
        window.toastTimeout = window.setTimeout(() => {
            this.props.setAccuracyToast(false);
        }, 3000);
    }

    onClickRootDiv(ev) {
        this.props.setFocus(false);
    }

    setVirtualMapCenter(location) {
        let daumCoords = daumMapHelper.toDaumCoords(location);
        daumCoords = this.getVirtualCoords(daumCoords, this.props.virtualMapHeight);
        this.props.setMapArea(daumMapHelper.toCoords(daumCoords));
    }

    onMapAreaChanged(ev, data) {
        if (data && data.newHeight && data.newHeight > 0
            && data.newHeight !== this.props.virtualMapHeight) {
            let center = this.daumMap.getCenter();
            center = this.getVirtualCoords(center, data.newHeight, this.props.virtualMapHeight);
            this.props.setVirtualMapHeight(data.newHeight);
            this.props.setMapArea(daumMapHelper.toCoords(center));
        }
    }

    getVirtualCoords(coords, vHeight, orgHeight) {
        window.mapDiv = this.mapDiv;
        let contHeight = parseFloat(this.mapDiv.offsetHeight);
        if (orgHeight) {
            contHeight = orgHeight;
        }
        let projection = this.daumMap.getProjection();
        let point = projection.containerPointFromCoords(coords);
        point.y += (contHeight - vHeight) / 2;
        return projection.coordsFromContainerPoint(point);
    }

    setMarker(location, markerLevel) {
        if (!location) {
            return;
        }
        if (!this.globalMarkers) {
            this.globalMarkers = {};
        }
        if (this.globalMarkers[location.id]) {
            this.globalMarkers[location.id].setMap(null);
            this.globalMarkers[location.id] = undefined;
        }
        if (markerLevel < 0) {
            return;
        }
        let imgType = consts.MARKER_IMG_TYPE.CHECK;
        if (location.type === consts.PLACE_TYPE.SBOX) {
            if (markerLevel === 2) {
                imgType = consts.MARKER_IMG_TYPE.SBOX.CONFIRM;
            } else if (markerLevel === 1) {
                imgType = consts.MARKER_IMG_TYPE.SBOX.CHECK;
            } else {
                imgType = consts.MARKER_IMG_TYPE.SBOX.VIEW;
            }
        } else {
            if (markerLevel === 2) {
                imgType = consts.MARKER_IMG_TYPE.CONFIRM;
            } else if (markerLevel === 1) {
                imgType = consts.MARKER_IMG_TYPE.CHECK;
            } else {
                return;
            }
        }

        const daumAPI = daumMapHelper.getDaumMapAPI();
        this.globalMarkers[location.id] = new daumAPI.Marker({
            image: daumMapHelper.getMarkerImage(imgType)
        });
        daumAPI.event.addListener(this.globalMarkers[location.id], 'click', () => {
            this.onClickMarker(location);
        });
        let position = daumMapHelper.toDaumCoords(location);
        this.globalMarkers[location.id].setPosition(position);
        this.globalMarkers[location.id].setMap(this.daumMap);
    }

    onClickMarker(location) {
        if (this.props.selectedAddress.level1.type === location.type ||
            this.props.selectedAddress.level2.type === location.type) {
            this.props.setSelectedAddress({
                level1: {},
                level2: location
            });
        } else if (this.props.searchResult.filter(x => x.id === this.props.selectedAddress.level2.id).length > 0) {
            this.props.setSelectedAddress({
                level1: this.props.selectedAddress.level2,
                level2: location
            });
        } else {
            this.props.setSelectedAddress({
                level2: location
            });
        }
        this.props.setViewType('confirm');
    }

    setGpsMarker(location) {
        const daumAPI = daumMapHelper.getDaumMapAPI();
        if (!this.gpsMarker) {
            this.gpsMarker = new daumAPI.Marker({
                image: daumMapHelper.getMarkerImage(consts.MARKER_IMG_TYPE.GPS)
            });
        }
        if (!this.gpsAccuracyCircle) {
            this.gpsAccuracyCircle = new daumAPI.Circle({
                strokeWeight: 1, // 선의 두께입니다 
                strokeOpacity: 0.3,
                strokeColor: '#2e8de5',
                fillColor: '#2e8de5', // 채우기 색깔입니다
                fillOpacity: 0.2  // 채우기 불투명도 입니다   
            });
        }
        let position = daumMapHelper.toDaumCoords(location);
        this.gpsMarker.setPosition(position);
        this.gpsMarker.setMap(this.daumMap);
        this.gpsAccuracyCircle.setRadius(location.accuracy);
        this.gpsAccuracyCircle.setPosition(position);
        this.gpsAccuracyCircle.setMap(this.daumMap);
    }

    onChangeMap() {
        this.props.setGpsStatus(consts.GPS_BTN_STATUS.NORMAL);
        this.props.setMapArea(daumMapHelper.toCoords(this.daumMap.getCenter()), this.daumMap.getLevel());

        const bounds = this.daumMap.getBounds();
        const ne = bounds.getNorthEast();
        const sw = bounds.getSouthWest();
        const maxLat = ne.getLat();
        const maxLng = ne.getLng();
        const minLat = sw.getLat();
        const minLng = sw.getLng();

        const smileboxLevel = this.getSmileboxLevel(this.daumMap.getLevel());
        let showingList = [];
        this.props.sboxList.forEach((x) => {
            const lat = parseFloat(x.latitude);
            const lng = parseFloat(x.longitude);
            if (this.props.selectedAddress.level1.id === x.id || this.props.selectedAddress.level2.id === x.id) {
                showingList = showingList.concat(x.id);
            } else if (smileboxLevel !== consts.SBOX_LEVEL.SHOW_NONE &&
                (smileboxLevel === consts.SBOX_LEVEL.SHOW_ALL ||
                    (smileboxLevel === consts.SBOX_LEVEL.SHOW_DONG && x.dongrep) ||
                    (smileboxLevel === consts.SBOX_LEVEL.SHOW_GU && x.gurep)) &&
                (minLat < lat && lat < maxLat && minLng < lng && lng < maxLng)) {
                showingList = showingList.concat(x.id);
            }
        });
        this.props.setShowingSboxList(showingList);
    }

    getSmileboxLevel(mapLevel) {
        let result = 0;

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
    }

    onClickZoomButton(isZoomIn) {
        this.daumMap.setLevel(this.daumMap.getLevel() + (isZoomIn ? -1 : 1));
    }

    onClickGpsButton() {
        if (!('geolocation' in navigator)) {
            alert('위치정보를 사용할 수 없습니다.');
            return;
        }

        let geoOptions = {
            /** 정확도 높은 정보 사용 */
            enableHighAccuracy: true,

            /** 캐시된 위치 값을 반환 받아도 되는 최대한의 시간 (ms) */
            maximumAge: 10000,

            /** 최대 대기시간 (ms) */
            timeout: 10000
        };

        this.props.setGpsStatus(consts.GPS_BTN_STATUS.FINDING);

        navigator.geolocation.getCurrentPosition(
            (position) => {
                if ('coords' in position) {
                    console.log(position.coords);
                    this.props.setGpsLocation(position.coords);
                    this.props.setGpsStatus(consts.GPS_BTN_STATUS.ENABLE);
                    this.showAccuracyToast();
                }
            },
            () => {
                alert('위치조회에 실패하였습니다.');
                this.props.setGpsStatus(consts.GPS_BTN_STATUS.NORMAL);
            },
            geoOptions
        );
    }

    getAccuracyText() {
        let result = '1k';
        let intAccuracy = parseInt(this.props.gpsLocation.accuracy);
        if (intAccuracy && intAccuracy > 0) {
            let length = intAccuracy.toString().length;
            let roundValue = Math.max(Math.round(intAccuracy / Math.pow(10, length - 1)) * Math.pow(10, length - 1), 10);
            result = roundValue.toString().replace(/000$/, 'k');
        }
        return result;
    }

    render() {
        return (
            <div onClick={this.onClickRootDiv} className="map_area">
                <div ref={ref => this.mapDiv = ref} className="inner">
                    <a href="javascript:" className="sp_addr btn_map btn_zoomin" onClick={() => { this.onClickZoomButton(true); }}>지도 확대</a>
                    <a href="javascript:" className="sp_addr btn_map btn_zoomout" onClick={() => { this.onClickZoomButton(false); }}>지도 축소</a>
                    <a href="javascript:" className={classNames({
                        'sp_addr': true,
                        'btn_map': true,
                        'btn_position': true,
                        'on': this.props.gpsStatus === consts.GPS_BTN_STATUS.ENABLE,
                        'loading': this.props.gpsStatus === consts.GPS_BTN_STATUS.FINDING
                    })} onClick={this.onClickGpsButton}>현재위치</a>
                    {/*
                    <a href="#" className="sp_addr btn_map btn_position2">현재위치</a>
                    */}
                    <p ref={ref => this.accuracyToast = ref} className="position_dsc" style={{ opacity: this.props.showAccuracyToast ? 1 : 0 }}>내 위치와 {this.getAccuracyText()}m 정도 차이 날 수 있습니다</p>
                </div>
                {this.props.sboxType !== 'hide' ? (<Promotion />) : null}
            </div>
        );
    }
}
export default MapComponent;