import React, { Component, PropTypes } from 'react';
import { Circle, LayerGroup, FeatureGroup, Rectangle, Marker, Popup } from 'react-leaflet';
import Immutable from 'immutable';


class HBaseDamMapLayer extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const center = [13.736717, 100.523186]
        const { data } = this.props;
        return (
            <FeatureGroup color="purple">
                {
                    data.get('rows').map((dam, index) => {
                        return <Marker key={index} position={[dam.get('dam_lat'), dam.get('dam_long')]}>
                            <Popup>
                                <span>
                                    <b> Name </b> {dam.get('dam_tname') } - {dam.get('dam_ename') ?  dam.get('dam_ename') : '' } <br/>
                                    <b> Max water level </b> {dam.get('max_water_level') } <br />
                                    <b> Water uses </b> {dam.get('uses_water') } <br />
                                    <b> Max inflow </b> {dam.get('max_inflow') } <br />
                                    <b> Power intake storage </b> {dam.get('power_intake_storage') } <br />
                                    <b> Maximum Storage </b> {dam.get('max_storage') } <br />
                                    <b> Normal Storage </b> {dam.get('normal_storage') } <br />
                                    <b> Dam losses </b> {dam.get('min_storage') } <br />
                                    <b> Normal water level </b> {dam.get('normal_water_level') } <br />
                                    <b> Minimum water level </b> {dam.get('min_water_level') } <br />
                                    <b> Dam storage </b> {dam.get('dam_storage') } <br />
                                    <b> Power intake level </b> {dam.get('power_intake_level') } <br />
                                </span>
                            </Popup>
                        </Marker>

                    })
                }
            </FeatureGroup>
        );
    }
}

HBaseDamMapLayer.contextTypes = {

};

HBaseDamMapLayer.propTypes = {
    wrapClassName: PropTypes.string
};

export default HBaseDamMapLayer;
