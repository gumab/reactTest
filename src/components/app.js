import React from 'react';
import Header from './header.js';
import Footer from './footer.js';
import Content from './content.js';

class App extends React.Component {

    constructor(){
        super();
        this.state = {
            value : ""
        };
        this.changeValue = this.changeValue.bind(this);
    }
 
    changeValue(event){
        //alert(event.target.value);
        this.setState({
            value : event.target.value
        });
    }

    render(){
        return (
            <div>
            <Header style={{paddingBottom:"10px"}}
            changeValue={this.changeValue}
             title="Header 이름" />
            <Content value={this.state.value} />
            <Footer />
            </div>
        );
    }
}
 
export default App;