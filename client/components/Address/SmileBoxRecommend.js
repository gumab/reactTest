import React, { Component } from 'react';

class SmileBoxRecommend extends Component {
    render() {
        return (
            <div style={{ display: this.props.show ? '' : 'none' }} className="smilebox_wrap">
                <h2 className="tit_smilebox">24시간 무인택배함 스마일박스 <span className="bg_line"></span></h2>
                <p className="tx_smilebox">원하는 지역의 스마일박스를 검색해 보세요.</p>
                <ul className="lst_smilebox">
                    <li>
                        <a href="javascript:">
                            <span className="sp_addr ico_smilebox"></span>스마일박스<span className="sp_addr ico_arr"></span>
                        </a>
                    </li>
                    <li>
                        <a href="javascript:">
                            <span className="sp_addr ico_smilebox"></span>{this.props.recent} 스마일박스<span className="sp_addr ico_arr"></span>
                        </a>
                    </li>
                </ul>
            </div>
        );
    }
}
export default SmileBoxRecommend;