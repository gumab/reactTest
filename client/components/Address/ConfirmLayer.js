import React, { Component } from 'react';
import classNames from 'classnames';

class ConfirmLayer extends Component {
    render() {
        return (

            <div className="ly_search_wrap ly_delivery_wrap">
                <a href="javascript:" className="tx_search tx_search_result" onClick={this.props.onClickListButton}><span className="sp_addr ico_back"></span> 검색결과로 돌아가기</a>
                <a href="javascript:" className="btn_lst" onClick={this.props.onClickListButton}>목록</a>
                <div className={classNames({
                    'result_area': true,
                    'result_area_v2': this.props.addressInfo.type === 'sbox'
                })}>
                    {this.props.addressInfo.type === 'sbox' &&
                        (<p className="tx_name">{this.props.addressInfo.title}
                            <button type="button" className="btn_info">이용안내 <span className="sp_addr ico">?</span>
                            </button>
                        </p>)
                    }
                    <p className="tx_addr">{this.props.addressInfo.address}</p>
                    {
                        this.props.addressInfo.type === 'sbox' ?
                            (<p className="tx_num">
                                {this.props.addressInfo.guideText}
                            </p>) :
                            (<p className="tx_num">
                                <span className="bx_num">지번</span>{this.props.addressInfo.shortLotAddress}
                                <span className="bar">l</span>{this.props.addressInfo.zipcode}
                            </p>)
                    }

                    <a href="javascript:" onClick={this.props.onClickConfirmButton} className={
                        classNames({
                            'btn_set': true,
                            'btn_delivery': this.props.addressInfo.type === 'sbox',
                            'disabled': this.props.addressInfo.type === 'sbox' && this.props.sboxType !== 'enable'
                        })}>{(<span className="sp_addr ico"></span>)}{
                            this.props.addressInfo.type !== 'sbox' ?
                                '이 위치로 배송지 설정' : (this.props.sboxType === 'enable' ? '스마일박스로 받기' : '스마일박스로 배송 받을 수 없습니다')
                        }</a>
                </div>
            </div>
        );
    }
}
export default ConfirmLayer;