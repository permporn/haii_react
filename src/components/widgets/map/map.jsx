import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';


class Map extends Component {
    
// render method of Class
    render() {
        return (
            <div className="courses">
                 Map layer
            </div>
        );
    }
}

Map.propTypes = {
    
};

function mapDispatchToProps(dispatch) {
    return {
        
    };
}

Map = connect(store => ({
   
}), mapDispatchToProps)(Map);

export default Map;
