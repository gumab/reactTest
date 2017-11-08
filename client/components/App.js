import React from 'react';
import WrapContainer from '../containers/WrapContainer';
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