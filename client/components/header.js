import React, {Component} from 'react';
import styles from '../stylesheets/header.css';

class Header extends Component{

    constructor(){
        super();
        //this를 사용하려면 super로 부모컴포넌트를 불러와야됨
        this.state = {
            title : "타이틀입니다.",
            content : "내용입니다."
        };
    }

    render(){
        return(
            <div>
                <div className={styles.header}>{this.state.title}</div>
                <div className={styles.content}>{this.state.content}</div>
            </div>
        )
    }
}

export default Header;