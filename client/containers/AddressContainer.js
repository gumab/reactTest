import Address from '../components/Address';
import * as actions from '../actions';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
    return state;
};

const mapDispatchToProps = (dispatch) => ({
    setSelectedAddress: (address) => dispatch(actions.setSelectedAddress(address)),
    setViewType: (viewType) => dispatch(actions.setViewType(viewType)),
    setFocus: (isFocus) => dispatch(actions.setFocus(isFocus)),
    setSearchResult: (keyword, resultData) => dispatch(actions.setSearchResult(keyword, resultData)),
    setResultType: (keyword, resultData) => dispatch(actions.setResultType(keyword, resultData))
});

const AddressContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Address);

export default AddressContainer;