import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import GsSSTSeries from './gs-sst-series/gs-sst-series';
import RainfallSeries from './rainfall-series/rainfall-series';
import ForeCastSeries from './forecast-series/forecast-series';
import LegendControl from 'widgets/map/legend-map';
class DateTimeSeries extends Component {

    // render method of Class
    render() {
        const { mapLayer, mapType } = this.props;
        return (
            <div>
                {
                    ((mapLayer.findIndex((layer) => layer == "GSMAP") > -1 |
                        mapLayer.findIndex((layer) => layer == "SST") > -1) &&
                        mapType == "MONITORING") ? <LegendControl position='bottomleft'> <GsSSTSeries updateMapImage={this.props.updateImage} />  </LegendControl>
                        : null}
                {mapType == "FORECAST" ? <LegendControl position='bottomleft'> <ForeCastSeries /> </LegendControl> : null
                }
            </div>

            //  <RainfallSeries />
        );
    }
}


export default DateTimeSeries;
