import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';
import { bindActionCreators } from 'redux';
import './home.scss';
import classNames from 'classnames';
import { Map, Marker, TileLayer, ImageOverlay, GeoJSON, LayersControl, LayerGroup, FeatureGroup } from 'react-leaflet';
//leaflet full screen.
import './leaflet/leaflet-fullscreen/Fullscreen.js';
import './leaflet/leaflet-fullscreen/Fullscreen.scss';
import LegendControl from 'widgets/map/legend-map';
import TimeScroll from 'widgets/time-scroll/time-scroll';
import {
    getTeleStationData, getDamData, getHbaseData, getThaiBoundary, getRainfall
    , getDailyDamByType, getClipMask, updateDate, updateTime, getLatestWaterLevel,
    getSSTMatch, getGsMapMatch

} from 'actions/map.action';
import { pushMainMenu } from 'actions/siteLayout.action';
import L from 'leaflet';
import HbaseMapLayer from './hbase/hbase-dam';
//import DatePicker from 'material-ui/DatePicker';
import DateRangePicker from 'widgets/date-range-picker/date-range-picker';
import { loadGeoTiff } from 'widgets/leaflet/leaflet-geotiff';
import LeafletGeoTiff from './leaflet/leafletGeoTiff';
import { formatDate } from 'widgets/util/format-date';

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
    let iconRain = L.icon({
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
        layer.setIcon(iconRain);
    }

}

const { Overlay, BaseLayer } = LayersControl;

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            url: 'http://27.254.159.141:8085/haii/gsmap/2017/08/01',
            baseUrl: 'http://27.254.159.141:8085/haii/gsmap',
            showMainNav: true,
            sstBaseUrl: 'http://27.254.159.141:8085/haii/sst',
            sstUrl: 'http://27.254.159.141:8085/haii/sst/2017/08/01'
        }
    }
    updateImage = (date) => {
        const { mapLayer } = this.props;
        const { baseUrl, selectedIndex, sstBaseUrl } = this.state;
        switch (mapLayer) {
            case 'GSMAP':
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
    onDateChange = (e, date) => {
        const month = ("0" + (date.getMonth() + 1)).slice(-2),
            dat = ("0" + date.getDate()).slice(-2);
        this.updateImage(`${date.getFullYear()}/${month}/${dat}`);
    }
    updateDataByDate = (date) => {
        const { time } = this.props;
        this.props.updateDate(date);
        const layerDate = new Date(date);
        const mon = ("0" + (layerDate.getMonth() + 1)).slice(-2);
        const dat = ("0" + layerDate.getDate()).slice(-2);
        this.props.getGsMapMatch(`${layerDate.getFullYear()}/${mon}/${dat}`);
        this.props.getSSTMatch(`${layerDate.getFullYear()}/${mon}/${dat}`);
        //this.props.getDamData();
        this.props.getRainfall(formatDate(date, time));
    }
    updateDataByTime = (time) => {
        const { date } = this.props;
        this.props.updateTime(time);
        const layerDate = new Date(date);
        const mon = ("0" + (layerDate.getMonth() + 1)).slice(-2);
        const dat = ("0" + layerDate.getDate()).slice(-2);
        this.props.getGsMapMatch(`${layerDate.getFullYear()}/${mon}/${dat}`);
        this.props.getSSTMatch(`${layerDate.getFullYear()}/${mon}/${dat}`);
        //this.props.getDamData();
        this.props.getRainfall(formatDate(date, time));
    }

    componentDidMount() {
        loadGeoTiff();
        const { date, time } = this.props;
        //this.props.getTeleStationData();
        this.props.getClipMask();
        this.props.getGsMapMatch('2016/08/02');
        this.props.getSSTMatch('2016/08/02');
        //this.props.getDamData();
        this.props.getLatestWaterLevel();
        this.props.getRainfall(formatDate(date, time));
        //this.props.getDailyDamByType('large');
        const data = {
            query: "select * from ca_views2.ca_views2.view_dam_daily  AS tbl1  JOIN hive.dam as tbl2 ON tbl1.dam_id=tbl2.dam_id where tbl1.dam_date = '2017-01-01' limit 1000",
            queryType: 'SQL'
        }
        const compData = {
            query: "select * from ca_views2.ca_views2.view_dam_daily  AS tbl1  JOIN hive.dam as tbl2 ON tbl1.dam_id=tbl2.dam_id  where tbl1.dam_id='mdamrid0376 ' and dam_date between '2013-01-01' and '2013-12-30' limit 1000",
            queryType: 'SQL'
        }

        //this.props.getHbaseData(data, 'MAP');
        //this.props.getHbaseData(compData, 'CHART');
        this.props.getThaiBoundary();

        L.Icon.Default.mergeOptions({
            iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
            iconUrl: require('leaflet/dist/images/marker-icon.png'),
            shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
        });
        if (this.refs.map) {
            window.map = this.refs.map.leafletElement;
            window.map.on('overlayadd', this.onOverlayAdd);
            window.map.addControl(new L.Control.Fullscreen());
        }
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
        const { teleStationData, damData, hBaseDamData, thaiBoundaryData,
            rainFall, dailyDam, clipMask, mapLayer, date, time, latestWaterLevel } = this.props;
        const center = [51.505, -0.09];
        const rectangle = [[51.49, -0.08], [51.5, -0.06]];
        return (
            <div className="row">
                <section className="col-lg-12" >
                    <div className="">
                        <div className="" >
                            <Map id="map" className="map-wrapper" ref="map" center={[13.736717, 100.523186]} zoom={6}>
                                <TileLayer
                                    attribution=''
                                    url='http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                                />
                                {clipMask.size != 0 && mapLayer == "GSMAP" && url != '' ? <LeafletGeoTiff clipMask={clipMask} url={url} /> : null}
                                {clipMask.size != 0 && mapLayer == "SST" && sstUrl != '' ? <LeafletGeoTiff clipMask={clipMask} url={sstUrl} /> : null}
                                {rainFall.size != 0 && (mapLayer == "RAINFALL" || mapLayer == "BOUNDARY" ) ? <GeoJSON style={teleStationStyle} data={rainFall} onEachFeature={onEachTeleFeature.bind(null, this)} /> : null}
                                {dailyDam.size != 0 && mapLayer == "DAILYDAM" ? <GeoJSON style={teleStationStyle} data={dailyDam} onEachFeature={onEachTeleFeature.bind(null, this)} /> : null}
                                {latestWaterLevel.size != 0 && ( mapLayer == "WATERLEVEL" || mapLayer == "BOUNDARY" ) ? <GeoJSON style={teleStationStyle} data={latestWaterLevel} onEachFeature={onEachTeleFeature.bind(null, this)} /> : null}
                                {teleStationData.size != 0 && mapLayer == "TELESTATION" ? <GeoJSON data={teleStationData} style={teleStationStyle} onEachFeature={onEachTeleFeature.bind(null, this)} /> : null}
                                {thaiBoundaryData.size != 0 && mapLayer == "BOUNDARY" ? <GeoJSON data={thaiBoundaryData} style={style} onEachFeature={onEachFeature.bind(null, this)} /> : null}
                                {hBaseDamData.size != 0 && mapLayer == "HBASEDAM" ? <HbaseMapLayer data={hBaseDamData} /> : null}
                                {damData.size != 0 && mapLayer == "DAM" ? <GeoJSON data={damData} style={damStyle} onEachFeature={onEachTeleFeature.bind(null, this)} /> : null}
                                <LegendControl position='bottomleft'>
                                    <div className="scrollmenu">
                                        <TimeScroll updateMapImage={this.updateImage} />
                                    </div>
                                </LegendControl>
                                {/* <LegendControl position='topleft'>
                                    <DateRangePicker date={date} time={time} updateDate={(date) => this.updateDataByDate(date)} updateTime={(time) => this.updateDataByTime(time)} onChange={this.onDateChange} hintText="DD/MM/YY" />

                                </LegendControl> */}
                            </Map>

                        </div>
                    </div>
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
    clipMask: mapData.get('clipMask'),
    mapLayer: mapData.get('mapLayer'),
    date: mapData.get('date'),
    time: mapData.get('time'),
    latestWaterLevel: mapData.get('latestWaterLevel')

});

function mapDispatchToProps(dispatch) {
    return {
        getTeleStationData: bindActionCreators(getTeleStationData, dispatch),
        getDamData: bindActionCreators(getDamData, dispatch),
        getHbaseData: bindActionCreators(getHbaseData, dispatch),
        getThaiBoundary: bindActionCreators(getThaiBoundary, dispatch),
        getRainfall: bindActionCreators(getRainfall, dispatch),
        getDailyDamByType: bindActionCreators(getDailyDamByType, dispatch),
        getClipMask: bindActionCreators(getClipMask, dispatch),
        updateDate: bindActionCreators(updateDate, dispatch),
        updateTime: bindActionCreators(updateTime, dispatch),
        getLatestWaterLevel: bindActionCreators(getLatestWaterLevel, dispatch),
        getSSTMatch: bindActionCreators(getSSTMatch, dispatch),
        getGsMapMatch: bindActionCreators(getGsMapMatch, dispatch)
    }
}
Home = connect(mapStateToProps, mapDispatchToProps)(Home);
export default Home;
