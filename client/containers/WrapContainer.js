import Wrap from '../components/Wrap';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
    return state;
};

const mapDispatchToProps = (dispatch) => ({
});

const Container = connect(
    mapStateToProps,
    mapDispatchToProps
)(Wrap);

export default Container;