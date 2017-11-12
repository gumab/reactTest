import React, { Component } from 'react';
import SboxItem from './RecentListSboxItem';
import Item from './RecentListItem';

class RecentList extends Component {

    render() {
        return (
            <div className="ly_addr">
                <ul className="lst_smilebox lst_smilebox_v2">
                    {
                        this.props.sboxType !== 'hide' &&
                        this.props.sboxList.map((x, idx) => {
                            return (
                                <SboxItem
                                    key={'recent_sbox_' + idx}
                                    index={idx}
                                    keyword={x}
                                    length={this.props.sboxList.length}
                                    onClickRecentItem={this.props.onClickRecentItem}
                                />
                            );
                        })
                    }
                    {
                        this.props.recentList.filter((x) => {
                            return this.props.sboxList.indexOf(x) < 0;
                        }).map((x, idx) => {
                            return (
                                <Item
                                    key={'recent_' + idx}
                                    index={idx}
                                    keyword={x}
                                    onClickRecentItem={this.props.onClickRecentItem}
                                    onClickDeleteRecentItem={this.props.onClickDeleteRecentItem}
                                />
                            );
                        })
                    }
                </ul>
            </div>
        );
    }
}
export default RecentList;