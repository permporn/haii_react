import React from 'react';
import ReactDOM from 'react-dom';
import L from 'leaflet';
import { MapControl } from 'react-leaflet';
import { MuiThemeProvider, getMuiTheme } from 'material-ui/styles';


export default class LegendControl extends MapControl {

    componentWillMount() {
        let legend = this.props.position ? L.control({ position: this.props.position }) : L.control();
        let className = this.props.customClass;
        const jsx = (
            <MuiThemeProvider muiTheme={getMuiTheme() }>
                <div {...this.props}>
                    {this.props.children}
                </div>
            </MuiThemeProvider>
        );
        legend.onAdd = function (map) {
            let div = className ? L.DomUtil.create('div', className) :  L.DomUtil.create('div', '');
            ReactDOM.render(jsx, div);
            return div;
        };
        this.leafletElement = legend;
    }
}