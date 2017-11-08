import React, { Component } from 'react';
import NoData from './NoData';
import SmileBoxRecommend from './SmileBoxRecommend';
import RecentList from './RecentList';
import ConfirmLayer from './ConfirmLayer';
import SearchResultList from './SearchResultList';
import axios from 'axios';

class Address extends Component {

    constructor() {
        super();
        this.state = {
            keyword: ''
        };
        this.onChangeText = this.onChangeText.bind(this);
        this.onKeyPress = this.onKeyPress.bind(this);
        this.onClickConfirmButton = this.onClickConfirmButton.bind(this);
        this.onFocusSearchInput = this.onFocusSearchInput.bind(this);
        this.onClickAddress = this.onClickAddress.bind(this);
        this.onClickListButton = this.onClickListButton.bind(this);
        this.onClickRecentItem = this.onClickRecentItem.bind(this);
    }

    search(keyword, page) {
        axios.get('/api/address/search', {
            params: {
                key: keyword,
                page: page
            }
        }).then((res) => {
            this.props.setSearchResult(keyword, res.data);
            if (res.data && res.data.list && res.data.list.length > 0) {
                this.props.setViewType('result');
            } else {
                this.props.setViewType('nodata');
            }

        }).catch(() => {
            this.props.setSearchResult(keyword);
            this.props.setViewType('nodata');
        });
        this.props.setFocus(false);
    }

    onChangeText(ev) {
        this.setState({
            keyword: ev.target.value
        });
    }

    onKeyPress(ev) {
        if (ev.which === 13) {
            this.search(this.state.keyword, 0);
        }
    }

    onClickConfirmButton(ev) {
    }

    onClickAddress(addressInfo, isPin) {
        if (!isPin) {
            this.props.setConfirmAddress(addressInfo);
            this.props.setViewType('confirm');
        }
    }

    onFocusSearchInput() {
        this.props.setFocus(true);
    }

    onClickListButton() {
        if (this.props.paging) {
            this.props.setViewType('result');
        }
    }

    onClickRecentItem(keyword) {
        this.search(keyword, 0);
    }

    render() {
        return (
            <div className="addr_area">
                {this.props.viewType === 'initial' && (<h1 className="tit_addr">주소찾기</h1>)}
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
                            onKeyPress={this.onKeyPress}
                            onFocus={this.onFocusSearchInput} />
                        <button type="button" className="sp_addr btn_dell" onClick={() => { this.setState({ keyword: '' }); }}>삭제</button>
                    </div>
                    <RecentList
                        recent={this.props.recent}
                        sboxType={this.props.sboxType}
                        onClickRecentItem={this.onClickRecentItem} />
                </div>
                {this.props.viewType === 'initial' && (<div className="addr_search_dsc">
                    <p className="tx">도로명, 건물명 또는 지번 중 편한 방법으로  검색하세요.</p>
                    <p className="tx tx_v2">예) 건물명 : 방배동 우성아파트<br />도로명 : 테헤란로 152<br />지역번 : 역삼동 737</p>
                </div>)}
                {this.props.sboxType !== 'hide' && this.props.viewType === 'initial' && (<SmileBoxRecommend recent={this.props.recent} />)}
                {this.props.viewType === 'confirm' && (<ConfirmLayer
                    onClickConfirmButton={this.onClickConfirmButton}
                    onClickListButton={this.onClickListButton}
                    addressInfo={this.props.confirmAddress}
                    sboxType={this.props.sboxType} />)}
                {this.props.viewType === 'nodata' && (<NoData searchedKeyword={this.props.searchedKeyword} />)}
                {(this.props.viewType === 'result' || this.props.viewType === 'sboxresult') &&
                    (<SearchResultList
                        onClickAddress={this.onClickAddress}
                        searchResult={this.props.searchResult}
                        selectedAddressId={this.props.selectedAddressId} />)}
            </div>
        );
    }
}
export default Address;