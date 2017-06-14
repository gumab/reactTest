import React, {Component} from 'react';

class Header extends Component{

    render(){
        return(
                <div>
                    입력 : 
                    <input onChange={this.props.changeValue} type="text" name="" className="form-control" />
                </div>
        )
    }
}

export default Header;