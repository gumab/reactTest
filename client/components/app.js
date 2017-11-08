import React from 'react';
import Address from './Address';
import Map from './Map';
import classNames from 'classnames';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reducers from '../reducers';
import ReduxThunk from 'redux-thunk';
import Container from '../containers';


const store = createStore(
    reducers,
    applyMiddleware(ReduxThunk)
);

class App extends React.Component {

    constructor() {
        super();
    }

    render() {
        return (
            <Provider store={store}>
                <div id="container">
                    <Container />
                </div>
            </Provider>
        );
    }
}

export default App;