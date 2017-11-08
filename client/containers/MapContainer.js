import MapComponent from '../components/Map';
import * as actions from '../actions';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
    return state;
};

const mapDispatchToProps = (dispatch) => ({
});

const MapContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(MapComponent);

export default MapContainer;