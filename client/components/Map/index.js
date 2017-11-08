import React, { Component } from 'react';
import Promotion from './Promotion';
import axios from 'axios';
import getShortLotNumberAddress from '../../helper/getShortLotNumberAddress';
import daumAPIWrapper from '../../helper/daumMapWrapper';
import consts from '../../consts';

class MapComponent extends Component {
    constructor() {
        super();
        this.onChangeMap = this.onChangeMap.bind(this);
    }

    componentDidMount() {
        const daumAPI = daumAPIWrapper.getDaumMapAPI();
        let mapOption = {
            center: daumAPIWrapper.coordsToDaumCoords(this.props.mapCenter), // 지도의 중심좌표
            level: consts.MAP_LEVEL.SEARCH_RESULT || 4 // 지도의 확대 레벨
        };

        const daumMap = new daumAPI.Map(this.mapDiv, mapOption);
        daumAPI.event.addListener(daumMap, 'idle', this.onChangeMap);
        this.daumMap = daumMap;

        //for debug
        window.myMap = daumMap;

        if (this.props.sboxType !== 'hide') {
            axios.get('/api/smilebox/branchlist', {
                params: {
                    partnerKey: this.props.partnerKey
                }
            }).then((res) => {
                if (res.data && res.data.resCode === '000') {
                    res.data.list.forEach((x) => {
                        x.shortLotAddress = getShortLotNumberAddress(x.lotAddress, x.address);
                    });
                    this.props.setSboxList(res.data.list);
                } else {
                    this.props.setSboxList([]);
                }
            }).catch(() => {

            });
        }
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps);
        if (this.props.mapCenter !== nextProps.mapCenter ||
            this.props.mapBounds !== nextProps.mapBounds) {
            console.log('map is changed');
        }
    }

    onChangeMap() {
        let center = daumAPIWrapper.daumCoordsToCoords(this.daumMap.getCenter());
        let bounds = this.daumMap.getBounds();
        this.props.setMapArea(center, bounds);
    }

    render() {
        return (
            <div className="map_area">
                <div ref={ref => this.mapDiv = ref} className="inner">
                    <a href="javascript:" className="sp_addr btn_map btn_zoomin">지도 확대</a>
                    <a href="javascript:" className="sp_addr btn_map btn_zoomout">지도 축소</a>
                    <a href="javascript:" className="sp_addr btn_map btn_position">현재위치</a>

                    <a href="#" className="sp_addr btn_map btn_position2">현재위치</a>
                    <p className="position_dsc" style={{ opacity: 0 }}>내 위치와 1km 정도 차이 날 수 있습니다</p>
                </div>
                {this.props.sboxType !== 'hide' ? (<Promotion />) : null}
            </div>
        );
    }
}
export default MapComponent;