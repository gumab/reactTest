import React, { Component } from 'react';
import NoData from './NoData';
import SmileBoxRecommend from './SmileBoxRecommend';
import RecentList from './RecentList';
import ConfirmLayer from './ConfirmLayer';

class Address extends Component {

    constructor() {
        super();
        this.state = {
            keyword: ''
        };
        this.onChangeText = this.onChangeText.bind(this);
        this.onKeyPress = this.onKeyPress.bind(this);
    }

    onChangeText(ev) {
        this.setState({
            keyword: ev.target.value
        });
    }

    onKeyPress(ev) {
        if (ev.which === 13) {
            console.log(this.state.keyword);
        }
    }

    onClickConfirmButton(ev) {
        console.log(this.props.confirmAddress);
    }

    render() {
        return (
            <div className="addr_area">
                <h1 className="tit_addr">주소찾기</h1>
                <div className="addr_search">
                    <div className="inner">
                        <a href="javascript:" className="btn_back"><span className="sp_addr">뒤로가기</span></a>
                        <span className="sp_addr ico_search"></span>
                        <input type="text"
                            placeholder="주소를 입력해 주세요"
                            className="input_search"
                            autoComplete="off"
                            value={this.state.keyword}
                            onChange={this.onChangeText}
                            onKeyPress={this.onKeyPress} />
                        <button type="button" className="sp_addr btn_dell" onClick={() => { this.setState({ keyword: '' }); }}>삭제</button>
                    </div>
                    <RecentList recent={this.props.recent} sboxType={this.props.sboxType} />
                </div>
                <div className="addr_search_dsc">
                    <p className="tx">도로명, 건물명 또는 지번 중 편한 방법으로  검색하세요.</p>
                    <p className="tx tx_v2">예) 건물명 : 방배동 우성아파트<br />도로명 : 테헤란로 152<br />지역번 : 역삼동 737</p>
                </div>
                {this.props.sboxType !== 'hide' ? (<SmileBoxRecommend recent={this.props.recent} />) : null}
                {this.props.viewType === 'confirm' ? (<ConfirmLayer
                    onClickConfirmButton={this.props.onClickConfirmButton}
                    addressInfo={this.props.confirmAddress}
                    sboxType={this.props.sboxType} />) : null}
                {this.props.viewType === 'nodata' ? (<NoData />) : null}
            </div>
        );
    }
}

Address.defaultProps = {
    sboxType: 'enable',
    viewType: 'initial',
    recent: '강남구'
};
export default Address;