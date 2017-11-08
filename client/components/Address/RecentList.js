import React, { Component } from 'react';
import classNames from 'classnames';

class RecentList extends Component {

    constructor(){
        super();
        this.state={
            sboxList:[],
            recentList:['가','나','다']
        };
    }

    componentDidMount(){
        this.setState({
            sboxList:[
                '스마일박스',
                this.props.recent + ' 스마일박스'
            ]
        });
    }

    render() {
        return (
            <div className="ly_addr">
                <ul className="lst_smilebox lst_smilebox_v2">
                    {
                        this.props.sboxType!=='hide' &&
                            this.state.sboxList.map((x, idx)=>{
                                return(
                                    <li key={'recent_sbox_'+idx} className={idx === (this.state.sboxList.length-1)&&'last'}>
                                        <a href="javascript:" onClick={()=>{this.props.onClickRecentItem(x);}}>
                                            <span className="sp_addr ico_smilebox"></span>{x}<span className="sp_addr ico_arr"></span>
                                        </a>
                                    </li>
                                );
                            })
                    }
                    {
                        this.state.recentList.map((x, idx)=>{
                            return(
                                <li key={'recent_'+idx} className="type">
                                    <a href="javascript:" onClick={()=>{this.props.onClickRecentItem(x);}}>
                                        <span className="sp_addr ico_search"></span>
                                        {x}
                                    </a>
                                    <button type="button" className="sp_addr btn_dell">삭제</button>
                                </li>
                            );
                        })
                    }
                </ul>
            </div>
        );
    }
}
export default RecentList;