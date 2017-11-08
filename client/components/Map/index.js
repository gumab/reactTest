import React, { Component } from 'react';
import Inner from './Inner';
import Promotion from './Promotion';

class Address extends Component {
    render() {
        return (
            <div className="map_area">
                <Inner />
                {this.props.sboxType !== 'hide' ? (<Promotion />) : null}
            </div>
        );
    }
}
export default Address;