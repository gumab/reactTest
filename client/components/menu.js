import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class Menu extends Component {
    render() {
        return (
            <div>
                <Link to="/">홈</Link>
                <Link to="/posts">포스트</Link>
                <Link to="/about">어바웃</Link>

            </div>
        );
    }
}

export default Menu;