import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';
import { bindActionCreators } from 'redux';
import './home.scss';
import classNames from 'classnames';
import { Map, Marker, TileLayer, ImageOverlay, GeoJSON, LayersControl, LayerGroup, FeatureGroup } from 'react-leaflet';
//leaflet full screen.
import './leaflet/leaflet-fullscreen/fullscreen.js';
import './leaflet/leaflet-fullscreen/fullscreen.scss';
import LegendControl from 'widgets/map/legend-map';
import TimeScroll from 'widgets/time-scroll/time-scroll';
import { getTeleStationData, getDamData, getHbaseData, getThaiBoundary, getRainfall, getDailyDamByType , getClipMask } from 'actions/map.action';
import { pushMainMenu } from 'actions/siteLayout.action';
import L from 'leaflet';
import HbaseMapLayer from './hbase/hbase-dam';
//import DatePicker from 'material-ui/DatePicker';
import DateRangePicker from 'widgets/date-range-picker/date-range-picker';
import { loadGeoTiff } from 'widgets/leaflet/leaflet-geotiff';
import LeafletGeoTiff from './leaflet/leafletGeoTiff';

function style(feature) {
    return {
        fillColor: '#000000',
        weight: 2,
        opacity: 17,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.4,
        zIndex: 1
    };
}
// highlight on mouseOver
function highlightFeature(e) {
    var layer = e.target;

    layer.setStyle({
        weight: 5,
        color: '#666',
        dashArray: '',
        fillOpacity: 0.7
    });
}

// reset default style on mouseOut
function resetHighlight(component, e) {
    // geojsonresetStyle(e.target);
    // how to encapsulate GeoJson component/object?
}

function zoomToFeature(e) {
    // map.fitBounds(e.target.getBounds());
    // how to encapsulate Map component/object?
}

function onEachFeature(component, feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight.bind(null, component),
        click: zoomToFeature
    });
}

function onEachTeleFeature(component, feature, layer) {
    if (feature.properties) {
        var popupString = '<div class="popup">';
        for (var k in feature.properties) {
            var v = feature.properties[k];
            popupString += k + ': ' + v + '<br />';
        }
        popupString += '</div>';
        layer.bindPopup(popupString);
    }

}

const { Overlay, BaseLayer } = LayersControl;

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            url: 'http://27.254.159.141:8082/haii/gsmap/2017/08/01',
            baseUrl: 'http://27.254.159.141:8082/haii/gsmap',
            showMainNav: true,
            sstBaseUrl: 'http://27.254.159.141:8082/haii/sst',
            sstUrl: 'http://27.254.159.141:8082/haii/sst/2017/08/01',
            selectedLayer: 'GsMAP'
        }
    }
    updateImage = (date) => {
        this.props.getRainfall(date, '07:00');
        const { baseUrl, selectedIndex, selectedLayer, sstBaseUrl } = this.state;
        switch (selectedLayer) {
            case 'GsMAP':
                let imageUrl = `${baseUrl}/${date}`;
                this.setState({
                    url: imageUrl
                })
                break;
            case 'SST':
                let sstUrl = `${sstBaseUrl}/${date}`;
                this.setState({
                    sstUrl: sstUrl
                })
                break;


        }

    }
    getDatesForMapData = () => {
        let msec = Date.parse("Aug 1, 2017");
        let date = new Date(msec);
        var days = [];
        let i = 14;
        while (i >= 0) {
            days.push(new Date(date));
            date.setDate(date.getDate() + 1);
            i = i - 1;
        }
        return days;
    }
    onDateChange = (e, date) => {
        const month = ("0" + (date.getMonth() + 1)).slice(-2),
            dat = ("0" + date.getDate()).slice(-2);
        this.updateImage(`${date.getFullYear()}/${month}/${dat}`);
    }
    componentDidMount() {
        loadGeoTiff();
        this.props.getTeleStationData();
        this.props.getClipMask();
        this.props.getDamData();
        this.props.getRainfall('2017-08-02', '07:00');
        this.props.getDailyDamByType('large');
        const data = {
            query: "select * from ca_views2.ca_views2.view_dam_daily  AS tbl1  JOIN hive.dam as tbl2 ON tbl1.dam_id=tbl2.dam_id where tbl1.dam_date = '2017-01-01' limit 1000",
            queryType: 'SQL'
        }
        const compData = {
            query: "select * from ca_views2.ca_views2.view_dam_daily  AS tbl1  JOIN hive.dam as tbl2 ON tbl1.dam_id=tbl2.dam_id  where tbl1.dam_id='mdamrid0376 ' and dam_date between '2013-01-01' and '2013-12-30' limit 1000",
            queryType: 'SQL'
        }

        this.props.getHbaseData(data, 'MAP');
        this.props.getHbaseData(compData, 'CHART');
        this.props.getThaiBoundary();

        L.Icon.Default.mergeOptions({
            iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
            iconUrl: require('leaflet/dist/images/marker-icon.png'),
            shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
        });
        // Marker icon for the map. Can be customized and probably better to put it in own file and import here.
        var redIcon = L.icon({
        iconUrl: 'https://thumb.ibb.co/goPTbR/marker1.png',
        //shadowUrl: require('leaflet/dist/images/marker-shadow.png'),

        iconSize:     [45, 45], // size of the icon
        //shadowSize:   [5, 24], // size of the shadow
        iconAnchor:   [14, 24], // point of the icon which will correspond to marker's location
        //shadowAnchor: [50, 90],  // the same for the shadow
        popupAnchor:  [-2, -40] // point from which the popup should open relative to the iconAnchor
        });

        var greenIcon = L.icon({
        iconUrl: 'https://thumb.ibb.co/goPTbR/marker1.png',
        //shadowUrl: require('leaflet/dist/images/marker-shadow.png'),

        iconSize:     [30, 30], // size of the icon
        //shadowSize:   [5, 24], // size of the shadow
        iconAnchor:   [10, 30], // point of the icon which will correspond to marker's location
        //shadowAnchor: [17, 42],  // the same for the shadow
        popupAnchor:  [-2, -40] // point from which the popup should open relative to the iconAnchor
        });

        var blueIcon = L.icon({
        iconUrl: 'https://thumb.ibb.co/goPTbR/marker1.png',
        //shadowUrl: require('leaflet/dist/images/marker-shadow.png'),

        iconSize:     [55, 55], // size of the icon
        //shadowSize:   [50, 64], // size of the shadow
        iconAnchor:   [12, 60], // point of the icon which will correspond to marker's location
        //shadowAnchor: [4, 62],  // the same for the shadow
        popupAnchor:  [-4, -70] // point from which the popup should open relative to the iconAnchor
        });
 

        if (this.refs.map) {
            window.map = this.refs.map.leafletElement;
            window.map.on('overlayadd', this.onOverlayAdd);
            window.map.addControl(new L.Control.Fullscreen());
            // L.marker([13.736717, 100.523186], {icon: blueIcon}).addTo(map);
            // L.marker([12.916890, 99.630002], {icon: greenIcon}).addTo(map);
            // L.marker([14.836872, 99.664638], {icon: redIcon}).addTo(map);
        }
    }
    onOverlayAdd = (e) => {
        if (e.name != 'BOUNDARY')
            this.setState({
                selectedLayer: e.name
            });
    }
    render() {
        const teleStationStyle = {
            "color": "#ff7800",
            "weight": 10,
            "opacity": 1
        };
        const damStyle = {
            "color": "#008000",
            "weight": 10,
            "opacity": 1
        };

        const { url, sstUrl } = this.state;
        const { teleStationData, damData, hBaseDamData, thaiBoundaryData, rainFall, dailyDam , clipMask } = this.props;
        const center = [51.505, -0.09]
        const rectangle = [[51.49, -0.08], [51.5, -0.06]]
        let dates = [];
        dates = this.getDatesForMapData();


        return (
            <div className="row">
                <section className="col-lg-12 connectedSortable ui-sortable" >
                    
                            <Map id="map" className="map-wrapper" ref="map" center={[13.736717, 100.523186]} zoom={6}>
                                <TileLayer
                                    attribution=''
                                    url='http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                                />
                                <LayersControl position="topright">
                                    <Overlay name="Telestation">
                                        {teleStationData.size != 0 ? <GeoJSON data={teleStationData} style={teleStationStyle} onEachFeature={onEachTeleFeature.bind(null, this)} /> : null}
                                    </Overlay>
                                    <Overlay  name="GsMAP">
                                        {clipMask.size != 0 ? <LeafletGeoTiff clipMask={clipMask} url={url} /> : null}
                                    </Overlay>
                                    <Overlay addOverlay={this.addOverlay} name="SST">
                                        {clipMask.size != 0 ? <LeafletGeoTiff clipMask={clipMask} url={sstUrl} /> : null}
                                    </Overlay>
                                    <Overlay name="RAINFALL">
                                        {rainFall.size != 0 ? <GeoJSON style={teleStationStyle} data={rainFall} onEachFeature={onEachTeleFeature.bind(null, this)} /> : null}
                                    </Overlay>
                                    <Overlay name="DAILY DAM">
                                        {dailyDam.size != 0 ? <GeoJSON style={teleStationStyle} data={dailyDam} onEachFeature={onEachTeleFeature.bind(null, this)} /> : null}
                                    </Overlay>
                                    <Overlay checked name="BOUNDARY">
                                        {thaiBoundaryData.size != 0 ? <GeoJSON data={thaiBoundaryData} style={style} onEachFeature={onEachFeature.bind(null, this)} /> : null}
                                    </Overlay>
                                    <Overlay name="DAM">
                                        {damData.size != 0 ? <GeoJSON data={damData} style={damStyle} onEachFeature={onEachTeleFeature.bind(null, this)} /> : null}
                                    </Overlay>
                                    <Overlay name="Hbase Dam">
                                        {hBaseDamData.size != 0 ? <HbaseMapLayer data={hBaseDamData} /> : null}
                                    </Overlay>
                                </LayersControl>
                                {/*  naviget*/}
                                {/* <LegendControl position='bottomleft'>
                                    <div className="scrollmenu">
                                        <TimeScroll updateMapImage={this.updateImage} />
                                    </div>
                                </LegendControl> */}
                                {/* <LegendControl position='topleft'>
                                    <DateRangePicker onChange={this.onDateChange} hintText="DD/MM/YY" />
                                    {/* <DatePicker onChange={this.onDateChange} hintText="Select date" /> */}
                                {/* </LegendControl> */}
                            </Map>

                   
                </section>
            </div>


        );
    }
}

Home.propTypes = {
    wrapClassName: PropTypes.string
};

Home.contextTypes = {
    muiTheme: PropTypes.object,
    history: PropTypes.object
};

const mapStateToProps = ({ mapData }) => ({
    teleStationData: mapData.get('teleStationData'),
    damData: mapData.get('damData'),
    hBaseDamData: mapData.get('hBaseDamData'),
    thaiBoundaryData: mapData.get('thaiBoundaryData'),
    rainFall: mapData.get('rainFall'),
    dailyDam: mapData.get('dailyDam'),
    clipMask: mapData.get('clipMask')

});

function mapDispatchToProps(dispatch) {
    return {
        getTeleStationData: bindActionCreators(getTeleStationData, dispatch),
        getDamData: bindActionCreators(getDamData, dispatch),
        getHbaseData: bindActionCreators(getHbaseData, dispatch),
        getThaiBoundary: bindActionCreators(getThaiBoundary, dispatch),
        getRainfall: bindActionCreators(getRainfall, dispatch),
        getDailyDamByType: bindActionCreators(getDailyDamByType, dispatch),
        getClipMask: bindActionCreators(getClipMask, dispatch)
    }
}
Home = connect(mapStateToProps, mapDispatchToProps)(Home);
export default Home;
