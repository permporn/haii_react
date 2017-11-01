import React from 'react';
import ReactDOM from 'react-dom';
import L from 'leaflet';
import { MapControl } from 'react-leaflet';
import { MuiThemeProvider, getMuiTheme } from 'material-ui/styles';


export default class LegendControl extends MapControl {

    componentWillMount() {
        const legend = L.control({ position: this.props.position });
        const jsx = (
            <MuiThemeProvider muiTheme={getMuiTheme() }>
                <div {...this.props}>
                    {this.props.children}
                </div>
            </MuiThemeProvider>
        );

        legend.onAdd = function (map) {
            let div = L.DomUtil.create('div', '');
            ReactDOM.render(jsx, div);
            return div;
        };

        this.leafletElement = legend;
    }
}