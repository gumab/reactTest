import React, { Component } from 'react';
import NoData from './NoData';
import SmileBoxRecommend from './SmileBoxRecommend';
import RecentList from './RecentList';
import ConfirmLayer from './ConfirmLayer';
import SearchResultList from './SearchResultList';
import axios from 'axios';
import getShortLotNumberAddress from '../../helper/getShortLotNumberAddress';
import consts from '../../consts';
import * as cookieHelper from '../../helper/cookieHelper';

class Address extends Component {

    constructor() {
        super();
        this.state = {
            recommendSboxList: [],
            recentList: [],
            keyword: '',
            scrollTo: 0
        };
        this.onChangeText = this.onChangeText.bind(this);
        this.onKeyPress = this.onKeyPress.bind(this);
        this.onClickConfirmButton = this.onClickConfirmButton.bind(this);
        this.onFocusSearchInput = this.onFocusSearchInput.bind(this);
        this.onClickAddress = this.onClickAddress.bind(this);
        this.onClickListButton = this.onClickListButton.bind(this);
        this.onClickRecentItem = this.onClickRecentItem.bind(this);
        this.onClickDeleteRecentItem = this.onClickDeleteRecentItem.bind(this);
        this.onClickRootDiv = this.onClickRootDiv.bind(this);
        this.setSearchResult = this.setSearchResult.bind(this);
        this.onScrollResultList = this.onScrollResultList.bind(this);
    }

    componentDidMount() {
        this.setState({
            recommendSboxList: [
                '스마일박스',
                this.props.recent + ' 스마일박스'
            ],
            recentList: cookieHelper.getHistory()
        });
    }

    componentDidUpdate(prevProps) {
        if (prevProps.focusIn !== this.props.focusIn && !this.props.focusIn) {
            this.searchInput.blur();
        }

        if (prevProps.viewType !== this.props.viewType && this.props.viewType === 'result') {
            if (this.props.selectedAddress.level1 && this.props.selectedAddress.level1.id) {
                let elem = document.getElementById(this.props.selectedAddress.level1.id);
                this.setState({
                    scrollTo: elem.offsetTop
                });
            }
        }
    }

    onClickRootDiv(ev) {
        let isSearchInput = ev.target === this.searchInput;
        let isInAddressSearchView = this.addressSearch.contains(ev.target);
        let isBackButton = ev.target === this.backButton;
        let isLink = ['A', 'BUTTON'].indexOf(ev.target.nodeName) >= 0;
        if (!isSearchInput && !(isInAddressSearchView && isLink && !isBackButton)) {
            this.props.setFocus(false);
        }
    }


    search(keyword) {
        if (this.isSearching) {
            return;
        }

        let pageSeq = 1;
        let isFirst = true;

        if (!keyword) {
            isFirst = false;
            if (this.props.paging && this.props.paging.hasNext) {
                keyword = this.props.paging.key;
                pageSeq = this.props.paging.next;
            } else {
                return;
            }
        }

        this.isSearching = true;

        let isSbox = new RegExp(consts.SBOX_KEYWORD_REGEX).test(keyword);

        if (isSbox) {
            let key = keyword.replace(consts.SBOX_KEYWORD_REGEX, '').replace(/ /g, '');
            let gu = (key.match(/([가-힣]*[^구])구?$/) || [])[1];
            let dong = (key.match(/([가-힣]+동)$/) || [])[1];
            if (gu) {
                gu += '구';
            }
            let data = [];
            if (key) {
                data = this.props.sboxList.filter(x => (x.gu && x.gu === gu) || (x.dong && x.dong === dong));
            } else {
                data = this.props.sboxList;
            }

            let page = {
                hasNext: false,
                totalCount: data.length
            };

            this.setSearchResult(keyword, isFirst, data, page, true);

        } else {
            axios.get('/api/address/search', {
                params: {
                    key: keyword,
                    page: pageSeq
                }
            }).then((res) => {
                if (res.data && res.data.list) {
                    res.data.list.forEach((x) => {
                        x.shortLotAddress = getShortLotNumberAddress(x.lotAddress, x.address);
                    });
                    this.setSearchResult(keyword, isFirst, res.data.list, res.data.page, false);
                } else {
                    this.setSearchResult(keyword, isFirst);
                }
            }).catch((e) => {
                this.setSearchResult(keyword, isFirst);
            });
        }
        this.props.setFocus(false);
    }

    setSearchResult(keyword, isFirst, list, paging, isSbox) {

        const selectAddressLevel1 = (address) => {
            window.setTimeout(() => {
                this.props.setSelectedAddress({
                    level1: address || {},
                    level2: {}
                });
            }, 0);
        };
        if (isFirst) {
            if (list && list.length > 0) {
                window.mapSet('half');
                this.props.setViewType('result');
                this.props.setResultType(isSbox ? 'sbox' : '');
                this.props.setSearchResult(keyword, {
                    list: list,
                    page: paging
                });
                selectAddressLevel1(list[0]);
            } else {
                this.props.setSearchResult(keyword);
                this.props.setViewType('nodata');
                selectAddressLevel1();
            }
        } else {
            this.props.addSearchResult({
                list: list,
                page: paging
            });
        }

        this.setState({
            recentList: cookieHelper.addHistory(keyword)
        });

        this.isSearching = false;
    }

    onChangeText(ev) {
        this.setState({
            keyword: ev.target.value
        });
    }

    onKeyPress(ev) {
        if (ev.which === 13) {
            this.search(this.state.keyword);
        }
    }

    onClickConfirmButton(ev) {
    }

    onClickAddress(addressInfo, isPin) {
        if (!isPin) {
            this.props.setSelectedAddress({
                level1: {},
                level2: addressInfo
            });
            this.props.setViewType('confirm');
        } else {
            this.props.setSelectedAddress({
                level1: addressInfo,
                level2: {}
            });
        }
    }

    onScrollResultList(ev) {
        if (ev.target.scrollHeight - ev.target.scrollTop <= ev.target.offsetHeight) {
            this.search();
        }
    }

    onFocusSearchInput() {
        this.props.setFocus(true);
    }

    onClickListButton() {
        if (this.props.searchResult && this.props.searchResult.length > 0) {
            this.props.setViewType('result');
            if (this.props.searchResult.filter(x => x.id === this.props.selectedAddress.level2.id).length > 0) {
                this.props.setSelectedAddress({
                    level1: this.props.selectedAddress.level2,
                    level2: {}
                });
            } else {
                this.props.setSelectedAddress({
                    level2: {}
                });
            }
            window.mapSet('half');
        }
    }

    onClickRecentItem(keyword) {
        this.setState({
            keyword: keyword
        });
        this.search(keyword);
    }
    onClickDeleteRecentItem(keyword) {
        this.setState({
            recentList: cookieHelper.removeHistory(keyword)
        });
    }

    render() {
        return (
            <div onClick={this.onClickRootDiv} className="addr_area">
                {this.props.viewType === 'initial' && (<h1 className="tit_addr">주소찾기</h1>)}
                <div ref={ref => this.addressSearch = ref} className="addr_search">
                    <div className="inner">
                        <a ref={ref => this.backButton = ref} href="javascript:" className="btn_back"><span className="sp_addr">뒤로가기</span></a>
                        <span className="sp_addr ico_search"></span>
                        <input
                            ref={ref => this.searchInput = ref}
                            type="text"
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
                        recentList={this.state.recentList}
                        sboxList={this.state.recommendSboxList}
                        onClickRecentItem={this.onClickRecentItem}
                        onClickDeleteRecentItem={this.onClickDeleteRecentItem} />
                </div>
                {this.props.viewType === 'initial' && (<div className="addr_search_dsc">
                    <p className="tx">도로명, 건물명 또는 지번 중 편한 방법으로  검색하세요.</p>
                    <p className="tx tx_v2">예) 건물명 : 방배동 우성아파트<br />도로명 : 테헤란로 152<br />지역번 : 역삼동 737</p>
                </div>)}
                <SmileBoxRecommend
                    show={this.props.sboxType !== 'hide' && this.props.viewType === 'initial'}
                    sboxList={this.state.recommendSboxList}
                    onClickRecentItem={this.onClickRecentItem} />
                <ConfirmLayer
                    show={this.props.viewType === 'confirm'}
                    onClickConfirmButton={this.onClickConfirmButton}
                    onClickListButton={this.onClickListButton}
                    addressInfo={this.props.selectedAddress.level2}
                    sboxType={this.props.sboxType} />
                <NoData
                    show={this.props.viewType === 'nodata'}
                    searchedKeyword={this.props.searchedKeyword} />
                <SearchResultList
                    show={this.props.viewType === 'result'}
                    selectedAddress={this.props.selectedAddress}
                    onClickAddress={this.onClickAddress}
                    onScrollResultList={this.onScrollResultList}
                    paging={this.props.paging}
                    searchResult={this.props.searchResult}
                    scrollTo={this.state.scrollTo} />
            </div>
        );
    }
}
export default Address;