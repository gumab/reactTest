import React, { Component } from 'react';

class RecentList extends Component {

    constructor() {
        super();
        this.onClickItem = this.onClickItem.bind(this);
    }

    onClickItem() {
        this.props.onClickRecentItem(this.props.keyword);
    }

    render() {
        return (
            <li key={'recent_sbox_' + this.props.index} className={this.props.index === (this.props.length - 1) && 'last'}>
                <a href="javascript:" onClick={this.onClickItem}>
                    <span className="sp_addr ico_smilebox"></span>{this.props.keyword}<span className="sp_addr ico_arr"></span>
                </a>
            </li>
        );
    }
}
export default RecentList;