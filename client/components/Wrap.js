import React from 'react';
import AddressContainer from '../containers/AddressContainer';
import MapContainer from '../containers/MapContainer';
import classNames from 'classnames';
import axios from 'axios';
import getShortLotNumberAddress from '../helper/getShortLotNumberAddress';

class Main extends React.Component {

    constructor() {
        super();
    }

    componentDidMount() {
        let url = '//mockupdev.ebay.co.kr/style/address/js/address.js';
        if (!window.loaded || !window.loaded[url]) {
            let sc = document.createElement('script');
            sc.type = 'text/javascript';
            sc.src = url;
            document.head.appendChild(sc);
            if (!window.loaded) {
                window.loaded = {};
            }
            window.loaded[url] = true;
        }

        if (this.props.sboxType !== 'hide') {
            axios.get('/api/smilebox/branchlist', {
                params: {
                    partnerKey: this.props.partnerKey
                }
            }).then((res) => {
                if (res.data && res.data.resCode === '000') {
                    res.data.list.forEach((x) => {
                        x.shortLotAddress = getShortLotNumberAddress(x.lotAddress, x.address);
                    });
                    this.props.setSboxList(res.data.list);
                    this.props.setShowingSboxList(res.data.list.map(x => x.id));
                } else {
                    this.props.setSboxList([]);
                }
            }).catch(() => {
                this.props.setSboxList([]);
            });
        }
    }

    render() {
        return (
            <div
                className={
                    classNames({
                        'ly_addr_wrap': true,
                        'ly_addr_list': this.props.viewType !== 'initial',
                        'ly_smilebox_list': this.props.resultType === 'sbox',
                        'focus_in': this.props.focusIn
                    })}>
                <div className="ly_addr_area">
                    <AddressContainer />
                    <MapContainer />
                    <button type="button" className="sp_addr btn_ly_close">통합주소록 레이어 닫기</button>
                </div>
            </div>
        );
    }
}

export default Main;