import React, { Component, PropTypes } from 'react';
import Checkbox from 'material-ui/Checkbox';
import './custom-layer.scss';
import Paper from 'material-ui/Paper';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import LayerIcon from 'material-ui/svg-icons/maps/layers';

const styles = {
    block: {
        maxWidth: 250,
    },
    paper: {
        background: 'rgba(255, 255, 255, 0.5)',
        paddingLeft: 20
    },
    popover: {
        background: 'rgba(255, 255, 255, 0.5)',
        boxShadow: 'none'
    },
    label: {
        color: '#555'
    },
    iconWhite: {
        fill: 'white',
    },
};

class CustomMonitoringLayer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false,
            anchorEl: ''
        };
    }

    updateLayer = (isChecked, layer) => {
        this.props.updateMapLayer(layer, isChecked);
    }
    handleTouchTap = (event) => {
        event.preventDefault();
        window.map.doubleClickZoom.disable();
        this.setState({
            open: !this.state.open,
            anchorEl: event.currentTarget,
        });
        setTimeout(() => window.map.doubleClickZoom.enable(), 100);
    };

    // render method of Class
    render() {
        const layers = [{ key: 'SST', value: 'SST' }, { key: 'GSMAP', value: 'GsMap' }, { key: 'RAINFALL', value: 'Rainfall' }, { key: 'WATERLEVEL', value: 'Waterlevel' }];
        const { showRightNav, mapLayer } = this.props;
        return (
            <div id="custom-layer">
                <div className="pop-over-container">
                    <FloatingActionButton onClick={this.handleTouchTap} mini={true}>
                        <LayerIcon />
                    </FloatingActionButton>
                    <Popover
                        style={styles.popover}
                        className={'trans ' + (showRightNav ? " right-side-menu" : "pop-over")}
                        useLayerForClickAway={false}
                        open={this.state.open}
                        canAutoPosition={false}
                        anchorEl={this.state.anchorEl}
                        anchorOrigin={{ horizontal: 'middle', vertical: 'bottom' }}
                        targetOrigin={{ horizontal: 'right', vertical: 'top' }}>
                        <Paper style={styles.paper}>
                            <Menu desktop={true} width={115}>
                                {
                                    layers.map((layer, index) => {
                                        return <Checkbox
                                            label={layer.value}
                                            key={index}
                                            checked={mapLayer.findIndex((lye) => lye == layer.key) > -1}
                                            labelStyle={styles.label}
                                            onCheck={(e, isChecked) => this.updateLayer(isChecked, layer.key)}
                                        />
                                    })
                                }
                            </Menu>
                        </Paper>
                    </Popover>
                </div>
            </div>);
    }
}

export default CustomMonitoringLayer;
