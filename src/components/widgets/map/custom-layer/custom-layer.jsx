import React, { Component, PropTypes } from 'react';
import ForeCastLayer from './custom-forecastlayer';
import MonitoringLayer from './custom-monitoringlayer';
import './custom-layer.scss';

class CustomLayerControl extends Component {

    // render method of Class
    render() {
        const { mapType , mapLayer  } = this.props;
        return (
               mapType == "MONITORING" ? <MonitoringLayer mapLayer={mapLayer} showRightNav={this.props.showRightNav} updateMapLayer={this.props.updateMapLayer} /> : mapType == "FORECAST" ? <ForeCastLayer mapLayer={mapLayer} showRightNav={this.props.showRightNav} updateMapLayer={this.props.updateMapLayer} /> : <div> </div>

        );
    }
}
export default CustomLayerControl;
