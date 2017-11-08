import React, { Component } from 'react';
import classNames from 'classnames';

class SearchResultList extends Component {
    render() {
        return (
            <div className="ly_search_wrap ly_search_list">
                <p className="tx_search search_result_cnt">주소 검색결과 <em>15</em>건</p>
                <div className="sc_area">
                    <ul className="lst_search">
                        {
                            this.props.searchResult.map((x) => {
                                return (
                                    <li key={x.id} className={classNames({
                                        'list_item': true,
                                        'selected': x.id === this.props.selectedAddressId
                                    })}>
                                        <a onClick={() => { this.props.onClickAddress(x, true); }} href="javascript:" className="sp_addr btn_pin">주소</a>
                                        <a onClick={() => { this.props.onClickAddress(x); }} href="javascript:" className="btn_addr">
                                            {x.type === 'sbox' && (<p className="tx_name">{x.title}</p>)}
                                            <p className="tx_addr">{x.address}</p>
                                            <p className="tx_num">
                                                <span className="bx_num">지번</span>{x.shortLotAddress}<span className="bar">l</span>{x.zipcode}
                                            </p>
                                        </a>
                                    </li>);
                            })
                        }
                    </ul>

                    {/*
                    <div className="btn_area">
                        <button type="button" className="btn_more">더보기</button>
                    </div>
                    */}
                </div>
            </div>
        );
    }
}
export default SearchResultList;