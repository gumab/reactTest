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
            <Header
            changeValue={this.changeValue}
             title="Header 이름" />
            <Content value={this.state.value} />
            <Footer />
            <h1>Hello React!</h1>
            </div>
        );
    }
}
 
export default App;