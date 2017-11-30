import React, { Component, PropTypes } from 'react';
import LegendGsMap from './legend-gsmap';
import LegendWaterLevel from './legend-waterlevel';
class Legend extends Component {

    // render method of Class
    render() {
        const { mapLayer , mapType } = this.props;
        return (
            <div >
                {mapLayer.findIndex((layer) => layer == "GSMAP") > -1
                    | mapLayer.findIndex((layer) => layer == "SST") > -1 |
                    mapLayer.findIndex((layer) => layer == "FORECAST_LAYER") > -1 | mapLayer.findIndex((layer) => layer == "RAINFALL") > -1 ? <LegendGsMap mapLayer={mapLayer} /> : null}
                {
                    mapLayer.findIndex((layer) => layer == "WATERLEVEL") > -1 && mapType == "MONITORING" ? <LegendWaterLevel mapLayer={mapLayer} /> : null}
                }
            </div>
        );
    }
}


export default Legend;
