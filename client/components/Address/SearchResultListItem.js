import React, { Component } from 'react';
import classNames from 'classnames';
import consts from '../../consts';

class SearchResultList extends Component {

    constructor() {
        super();
        this.onClickAddress = this.onClickAddress.bind(this);
        this.onClickAddressPin = this.onClickAddressPin.bind(this);
    }

    onClickAddress() {
        this.props.onClickAddress(this.props.info);
    }

    onClickAddressPin() {
        this.props.onClickAddress(this.props.info, true);
    }

    render() {
        return (
            <li id={this.props.info.id} className={classNames({
                'list_item': true,
                'selected': this.props.info.id === this.props.selectedAddress.level1.id || this.props.info.id === this.props.selectedAddress.level2.id
            })}>
                <a onClick={this.onClickAddressPin} href="javascript:" className="sp_addr btn_pin">주소</a>
                <a onClick={this.onClickAddress} href="javascript:" className="btn_addr">
                    {this.props.info.type === consts.PLACE_TYPE.SBOX && (<p className="tx_name">{this.props.info.title}</p>)}
                    <p className="tx_addr">{this.props.info.address}</p>
                    <p className="tx_num">
                        <span className="bx_num">지번</span>{this.props.info.shortLotAddress}<span className="bar">l</span>{this.props.info.zipcode}
                    </p>
                </a>
            </li>
        );
    }
}
export default SearchResultList;