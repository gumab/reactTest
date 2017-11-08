import Address from '../components/Address';
import * as actions from '../actions';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
    return state;
};

const mapDispatchToProps = (dispatch) => ({
    setConfirmAddress:(address) => dispatch(actions.setConfirmAddress(address)),
    setSelectedAddressId:(id)=> dispatch(actions.setSelectedAddressId(id)),
    setViewType:(viewType)=> dispatch(actions.setViewType(viewType)),
    setFocus:(isFocus)=> dispatch(actions.setFocus(isFocus))
});

const AddressContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Address);

export default AddressContainer;