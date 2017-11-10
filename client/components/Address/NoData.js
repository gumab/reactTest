import React, { Component } from 'react';

class NoData extends Component {
    render() {
        return (
            <div style={{ display: this.props.show ? '' : 'none' }} className="ly_search_wrap ly_search_nodata">
                <span className="sp_addr ico_nodata"></span>
                <p className="tx_nodata"><span className="tx_nodata_keyword">{this.props.searchedKeyword}</span>에 대한 검색결과가 없습니다.</p>
                <div className="addr_search_dsc">
                    <h2 className="tit_nodata">정확한 검색결과를 위한 팁!</h2>
                    <p className="tx">도로명, 건물명 또는 지번 중 편한 방법으로  검색하세요.</p>
                    <p className="tx tx_v2">
                        예) 건물명 : 방배동 우성아파트
                        <br />
                        도로명 : 테헤란로 152
                        <br />
                        지역번 : 역삼동 737
                    </p>
                </div>
            </div>
        );
    }
}
export default NoData;