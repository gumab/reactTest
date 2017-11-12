import React, { Component } from 'react';
import classNames from 'classnames';

class RecentList extends Component {

    constructor() {
        super();
        this.onClickItem = this.onClickItem.bind(this);
        this.onClickDeleteItem = this.onClickDeleteItem.bind(this);
    }

    onClickItem() {
        this.props.onClickRecentItem(this.props.keyword);
    }

    onClickDeleteItem() {
        this.props.onClickDeleteRecentItem(this.props.keyword);
    }

    render() {
        return (
            <li key={'recent_' + this.props.index} className="type">
                <a href="javascript:" onClick={this.onClickItem}>
                    <span className="sp_addr ico_search"></span>
                    {this.props.keyword}
                </a>
                <button onClick={this.onClickDeleteItem} type="button" className="sp_addr btn_dell">삭제</button>
            </li>
        );
    }
}
export default RecentList;