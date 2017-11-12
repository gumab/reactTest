import MapComponent from '../components/Map';
import * as actions from '../actions';
import { connect } from 'react-redux';

const mapStateToProps = (state) => ({
    sboxList: state.sboxList,
    sboxType: state.sboxType,
    partnerKey: state.partnerKey,
    mapCenter: state.mapCenter,
    mapBounds: state.mapBounds,
    viewType: state.viewType,
    selectedAddress: state.selectedAddress,
    gpsLocation: state.gpsLocation,
    gpsStatus: state.gpsStatus,
    virtualMapHeight: state.virtualMapHeight,
    showingSboxList: state.showingSboxList,
    searchResult: state.searchResult
});

const mapDispatchToProps = (dispatch) => ({
    setViewType: (viewType) => dispatch(actions.setViewType(viewType)),
    setMapArea: (center, level) => dispatch(actions.setMapArea(center, level)),
    setGpsLocation: (location) => dispatch(actions.setGpsLocation(location)),
    setGpsStatus: (status) => dispatch(actions.setGpsStatus(status)),
    setVirtualMapHeight: (height) => dispatch(actions.setVirtualMapHeight(height)),
    setFocus: (isFocus) => dispatch(actions.setFocus(isFocus)),
    setSboxList: (sboxList) => dispatch(actions.setSboxList(sboxList)),
    setShowingSboxList: (sboxList) => dispatch(actions.setShowingSboxList(sboxList)),
    setSelectedAddress: (address) => dispatch(actions.setSelectedAddress(address))
});

const MapContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(MapComponent);

export default MapContainer;