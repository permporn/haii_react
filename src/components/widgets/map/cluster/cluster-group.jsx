import React, { Component, PropTypes } from 'react';
import LegendControl from '../legend-map';
import './cluster.scss';

class ClusterGroup extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showClusterInfo: false,
            layer: '',
            max: 0,
            name: '',
            childrenCount: 0
        }
    }

    componentWillUnmount() {
        if (this.markers)
            window.map.removeLayer(this.markers);
    }
    componentDidMount() {
        let layer = this.props.layer;
        this.markers = L.markerClusterGroup({
            maxClusterRadius: 35,
            showCoverageOnHover: false,
            iconCreateFunction: function (cluster) {
                var children = cluster.getAllChildMarkers();
                var max = 0;
                for (var i = 0; i < children.length; i++) {
                    if (layer == "waterlevel") {
                        if (children[i].feature.properties.percent_capacity > max) {
                            max = children[i].feature.properties.percent_capacity;
                        }
                    }
                    else if (layer == "rainfall") {
                        if (children[i].feature.properties.rainfall24h > max) {
                            max = children[i].feature.properties.rainfall24h;
                        }
                    }
                }
                let color;
                if (layer == "waterlevel") {
                    if (max <= 10) {
                        color = "orange";
                    } else if (max > 10 && max <= 30) {
                        color = "yellow";
                    } else if (max > 30 && max <= 70) {
                        color = "green";
                    } else if (max > 70 && max <= 100) {
                        color = "blue";
                    } else if (max > 100) {
                        color = "red";
                    } else {
                        color = "darkred";
                    }
                }
                else if (layer == "rainfall") {
                    if (max > 0 && max <= 10) {
                        color = "blue";
                    } else if (max > 10 && max <= 20) {
                        color = "lightgreen";
                    } else if (max > 20 && max <= 35) {
                        color = "darkgreen";
                    } else if (max > 35 && max <= 50) {
                        color = "yellow";
                    } else if (max > 50 && max <= 70) {
                        color = "orange";
                    } else if (max > 70 && max <= 90) {
                        color = "brown";
                    } else if (max > 90) {
                        color = "red";
                    } else {
                        color = "gray";
                    }
                }
                return L.icon({
                    iconUrl: `public/img/icons/scale/${color}_${layer}.png`,
                    //shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
                    iconAnchor: [16, 37], // point of the icon which will correspond to marker's location
                    //shadowAnchor: [17, 42],  // the same for the shadow
                    popupAnchor: [0, -28], // point from which the popup should open relative to the iconAnchor
                    iconSize: [32, 37]
                });
            }
        });
        //window.markers = L.markerClusterGroup();
        this.geojson = L.geoJson(this.props.data, {

            style: function (feature) {
                return {
                    "color": "#ff7800",
                    "weight": 10,
                    "opacity": 1
                };
            },
            onEachFeature: function (feature, layer) {
                let markerIcon = L.icon({
                    iconUrl: `public/${feature.style.iconUrl}`,
                    //shadowUrl: require('leaflet/dist/images/marker-shadow.png'),

                    iconSize: feature.style.iconSize, // size of the icon
                    //shadowSize:   [5, 24], // size of the shadow
                    iconAnchor: feature.style.iconAnchor, // point of the icon which will correspond to marker's location
                    //shadowAnchor: [17, 42],  // the same for the shadow
                    popupAnchor: feature.style.popupAnchor // point from which the popup should open relative to the iconAnchor
                });
                if (feature.properties) {
                    var popupString = '<div class="popup">';
                    for (var k in feature.properties) {
                        var v = feature.properties[k];
                        popupString += k + ': ' + v + '<br />';
                    }
                    popupString += '</div>';
                    layer.bindPopup(popupString);
                    layer.setIcon(markerIcon);
                }
            }
        });
        this.markers.on('clustermouseover', (cluster) => {
            let children = cluster.layer.getAllChildMarkers();
            let childrenCount = cluster.layer.getChildCount();
            var max = 0;
            let displayLayer = '';
            let name = '';
            for (var i = 0; i < children.length; i++) {
                if (layer == "waterlevel") {
                    if (children[i].feature.properties.percent_capacity > max) {
                        max = children[i].feature.properties.percent_capacity;
                        name = children[i].feature.properties.name;
                    }
                }
                else if (layer == "rainfall") {
                    if (children[i].feature.properties.rainfall24h > max) {
                        max = children[i].feature.properties.rainfall24h;
                        name = children[i].feature.properties.name;
                    }
                }
            }
            if (layer == "waterlevel") {
                displayLayer = "Water level";

            }
            else if (layer == "rainfall") {
                displayLayer = "Rainfall";
            }

            this.setState({
                showClusterInfo: true,
                childrenCount,
                layer: displayLayer,
                max,
                name
            })
        });
        this.markers.on('clustermouseout', (cluster) => {
            this.setState({
                showClusterInfo: false
            })
        });
        this.markers.addLayer(this.geojson);
        window.map.addLayer(this.markers);
    }

    // render method of Class
    render() {
        const { showClusterInfo, childrenCount, layer, max, name } = this.state;
        return (
            <div>
                {showClusterInfo == true ?
                    <LegendControl customClass="cluster-info">
                        <div> 
                            <h4>  {name}  -  {childrenCount} </h4> 
                            <p> {`${layer} - ${max}`}</p> 
                        </div>
                    </LegendControl> : null}
            </div>

        );
    }
}


export default ClusterGroup;
