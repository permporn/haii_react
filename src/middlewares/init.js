import { pushPath } from 'redux-simple-router';
import { loadGeoTiff } from 'widgets/leaflet/leaflet-geotiff';
import { loadLeafletMarkerClusterLib } from 'widgets/leaflet/leaflet-markercluster';


export default store => next => action => {
   
    // Init action of redux-simple-router library
    if (action.type === '@@router/INIT_PATH') {
        loadGeoTiff();
        loadLeafletMarkerClusterLib();
       
    }
    return next(action);
};
