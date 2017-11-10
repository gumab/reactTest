import Wrap from '../components/Wrap';
import * as actions from '../actions';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
    return state;
};

const mapDispatchToProps = (dispatch) => ({
    setSboxList: (sboxList) => dispatch(actions.setSboxList(sboxList)),
    setShowingSboxList: (sboxList) => dispatch(actions.setShowingSboxList(sboxList))
});

const Container = connect(
    mapStateToProps,
    mapDispatchToProps
)(Wrap);

export default Container;