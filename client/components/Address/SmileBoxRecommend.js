import React, { Component } from 'react';
import SboxItem from './RecentListSboxItem';

class SmileBoxRecommend extends Component {
    render() {
        return (
            <div style={{ display: this.props.show ? '' : 'none' }} className="smilebox_wrap">
                <h2 className="tit_smilebox">24시간 무인택배함 스마일박스 <span className="bg_line"></span></h2>
                <p className="tx_smilebox">원하는 지역의 스마일박스를 검색해 보세요.</p>
                <ul className="lst_smilebox">

                    {this.props.sboxList.map((x, idx) => {
                        return (
                            <SboxItem
                                key={'recommend_sbox_' + idx}
                                index={idx}
                                keyword={x}
                                length={this.props.sboxList.length}
                                onClickRecentItem={this.props.onClickRecentItem}
                            />
                        );
                    })}
                </ul>
            </div>
        );
    }
}
export default SmileBoxRecommend;