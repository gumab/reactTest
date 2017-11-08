import React from 'react';
import AddressContainer from '../containers/AddressContainer';
import MapContainer from '../containers/MapContainer';
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
                    'ly_smilebox_list': this.props.viewType === 'sboxresult',
                    'focus_in': this.props.focusIn
                })
            }>
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