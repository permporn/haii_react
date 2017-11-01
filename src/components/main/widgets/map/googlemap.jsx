import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import GoogleMap from "react-google-map"
import GoogleMapLoader from "react-google-maps-loader"

const position = [51.505, -0.09];

const MY_API_KEY = "AIzaSyDwsdjfskhdbfjsdjbfksiTgnoriOAoUOgsUqOs10J0" // fake

const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
  },
};

class Googlemap extends Component {
    
// render method of Class
    render() {
        return (
            <div>
                <GoogleMap
                googleMaps={googleMaps}
                // You can add and remove coordinates on the fly.
                // The map will rerender new markers and remove the old ones.
                coordinates={[
                    {
                    title: "Toulouse",
                    icon: iconMarker,
                    position: {
                        lat: 43.604363,
                        lng: 1.443363,
                    },
                    onLoaded: (googleMaps, map, marker) => {
                        // Set Marker animation
                        marker.setAnimation(googleMaps.Animation.BOUNCE)

                        // Define Marker InfoWindow
                        const infoWindow = new googleMaps.InfoWindow({
                        content: `
                            <div>
                            <h3>Toulouse<h3>
                            <div>
                                Toulouse is the capital city of the southwestern
                                French department of Haute-Garonne,
                                as well as of the Occitanie region.
                            </div>
                            </div>
                        `,
                        })

                        // Open InfoWindow when Marker will be clicked
                        googleMaps.event.addListener(marker, "click", () => {
                        infoWindow.open(map, marker)
                        })

                        // Change icon when Marker will be hovered
                        googleMaps.event.addListener(marker, "mouseover", () => {
                        marker.setIcon(iconMarkerHover)
                        })

                        googleMaps.event.addListener(marker, "mouseout", () => {
                        marker.setIcon(iconMarker)
                        })

                        // Open InfoWindow directly
                        infoWindow.open(map, marker)
                    },
                    }
                ]}
                center={{lat: 43.604363, lng: 1.443363}}
                zoom={8}
                onLoaded={(googleMaps, map) => {
                    map.setMapTypeId(googleMaps.MapTypeId.SATELLITE)
                }}
                />
            </div>
        );
    }
}

Googlemap.propTypes = {
    
};

function mapDispatchToProps(dispatch) {
    return {
        
    };
}

Googlemap = connect(store => ({
   
}), mapDispatchToProps)(Googlemap);

export default Googlemap;
