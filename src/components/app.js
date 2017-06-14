import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './home';
import Posts from './posts';
import About from './about';
import NotMatch from './notMatch';
import Menu from './menu';

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <div>
                    <Menu />
                    <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route path="/posts" component={Posts}/>
                    <Route path="/about" component={About}/>
                    <Route component={NotMatch} />
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}
export default App;