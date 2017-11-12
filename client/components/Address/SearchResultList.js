import React, { Component } from 'react';
import Item from './SearchResultListItem';

class SearchResultList extends Component {
    render() {
        return (
            <div style={{ display: this.props.show ? '' : 'none' }} className="ly_search_wrap ly_search_list">
                <p className="tx_search search_result_cnt">주소 검색결과 <em>{this.props.paging && this.props.paging.totalCount}</em>건</p>
                <div className="sc_area">
                    <ul className="lst_search">
                        {
                            this.props.searchResult.map((x) => {
                                return (
                                    <Item
                                        key={x.id}
                                        info={x}
                                        selectedAddress={this.props.selectedAddress}
                                        onClickAddress={this.props.onClickAddress} />);
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