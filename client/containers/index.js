import Main from '../components/Main';
import * as actions from '../actions';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
    return state;
};

const mapDispatchToProps = (dispatch) => ({

});

const Container = connect(
    mapStateToProps,
    mapDispatchToProps
)(Main);

export default Container;