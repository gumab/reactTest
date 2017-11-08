import React from 'react';
import Address from './Address';
import Map from './Map';
import WrapContainer from '../containers/WrapContainer';
import classNames from 'classnames';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reducers from '../reducers';
import ReduxThunk from 'redux-thunk';

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
                    <WrapContainer />
                </div>
            </Provider>
        );
    }
}

export default App;