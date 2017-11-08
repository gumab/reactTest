import React, { Component } from 'react';

class Inner extends Component {
    render() {
        return (
            <div className="inner">
                <a href="javascript:" className="sp_addr btn_map btn_zoomin">지도 확대</a>
                <a href="javascript:" className="sp_addr btn_map btn_zoomout">지도 축소</a>
                <a href="javascript:" className="sp_addr btn_map btn_position">현재위치</a>

                <a href="#" className="sp_addr btn_map btn_position2">현재위치</a>
                <p className="position_dsc" style={{opacity:0}}>내 위치와 1km 이상 정도 차이 날 수 있습니다</p>
            </div>
        );
    }
}
export default Inner;