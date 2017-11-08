import React from 'react';
import Address from './Address';
import Map from './Map';
import classNames from 'classnames';

class Main extends React.Component {

    constructor() {
        super();
    }

    render() {
        return (
            <div className={
                classNames({
                    'ly_addr_wrap': true,
                    'ly_addr_list': this.props.viewType !== 'initial',
                    'ly_smilebox_list': this.props.viewType === 'sbox',
                    'focus_in': this.props.focusIn
                })
            }>
                <div className="ly_addr_area">
                    <Address
                        viewType={this.props.viewType}
                        sboxType={this.props.sboxType}
                        confirmAddress={this.props.confirmAddress} />
                    <Map
                        sboxType={this.props.sboxType} />

                    <button type="button" className="sp_addr btn_ly_close">통합주소록 레이어 닫기</button>
                </div>
            </div>
        );
    }
}

export default Main;