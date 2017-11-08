import React, { Component } from 'react';

class SearchResultList extends Component {
    render() {
        return (
            <div className="ly_search_wrap ly_search_list">
                <p className="tx_search search_result_cnt">주소 검색결과 <em>15</em>건</p>
                <div className="sc_area">
                    <ul className="lst_search">
                    </ul>
                </div>
            </div>
        );
    }
}
export default SearchResultList;