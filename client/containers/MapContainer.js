import MapComponent from '../components/Map';
import * as actions from '../actions';
import { connect } from 'react-redux';

const mapStateToProps = (state) => ({
    sboxList: state.sboxList,
    sboxType: state.sboxType,
    partnerKey: state.partnerKey,
    mapCenter: state.mapCenter,
    mapBounds: state.mapBounds
});

const mapDispatchToProps = (dispatch) => ({
    setSboxList: (sboxList) => dispatch(actions.setSboxList(sboxList)),
    setMapArea: (center, bounds) => dispatch(actions.setMapArea(center, bounds))
});

const MapContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(MapComponent);

export default MapContainer;