import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';
import { bindActionCreators } from 'redux';
import './home.scss';
import './marker-cluster.scss';
import './marker-clusterdefault.scss';
import classNames from 'classnames';
import { Map, Marker, TileLayer, ImageOverlay, GeoJSON, LayersControl, LayerGroup, FeatureGroup } from 'react-leaflet';

//leaflet full screen.
import './leaflet/leaflet-fullscreen/Fullscreen.js';
import './leaflet/leaflet-fullscreen/Fullscreen.scss';
import { WMSTileLayer } from 'react-leaflet';
import {
    getTeleStationData, getDamData, getHbaseData, getThaiBoundary, getRainfall
    , getDailyDamByType, getClipMask, updateDate, updateTime, getLatestWaterLevel,
    getSSTMatch, getGsMapMatch, getRainfallForecast, getBaisins, updateMapLayer

} from 'actions/map.action';
import { getChart24Rainfall , getChartWaterLevel } from 'actions/charts.action';
import { getAlerts } from 'actions/alerts.action';
import { pushMainMenu } from 'actions/siteLayout.action';
import L from 'leaflet';
import HbaseMapLayer from './hbase/hbase-dam';
//import DatePicker from 'material-ui/DatePicker';
import DateRangePicker from 'widgets/date-range-picker/date-range-picker';

import LeafletGeoTiff from './leaflet/leafletGeoTiff';
import { formatDate } from 'widgets/util/format-date';
import { BASE_URL_GSMAP, BASE_URL_SST } from 'widgets/map/url/map-image-url';
import Legend from 'widgets/map/legend/legend';
import CustomLayer from 'widgets/map/custom-layer/custom-layer';
import ClusterGroup from 'widgets/map/cluster/cluster-group';
import MyGeocoderPlugin from 'leaflet-geocoder-mapzen';
import DateTimeSeries from 'widgets/map/date-time-series/date-time-series';

const { Overlay, BaseLayer } = LayersControl;

class Home extends Component {

    constructor(props) {
        super(props);

        this.state = {
            url: 'http://138.68.67.171:8085//haii/gsmap/2017/08/01',
            baseUrl: 'http://138.68.67.171:8085/haii/gsmap',
            showMainNav: true,
            sstBaseUrl: 'http://138.68.67.171:8085/haii/sst',
            sstUrl: 'http://138.68.67.171:8085/haii/sst/2017/08/01',
            tiffError: '',
            markers: [],
            myLayer: null,
            forecastSSTUrl: '',
            forecastGSUrl: ''
        }
    }
    updateImage = (date) => {
        const { mapLayer } = this.props;
        const { baseUrl, selectedIndex, sstBaseUrl } = this.state;
        let imageUrl = `${baseUrl}/${date}`;
        let sstUrl = `${sstBaseUrl}/${date}`;
        this.setState({
            url: imageUrl,
            sstUrl: sstUrl,
            tiffError: ''
        })

    }
    handleTiffError = (layer) => {
        this.setState({
            tiffError: layer
        })
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
        const { date, time } = this.props;
        //this.props.getTeleStationData();
        this.props.getClipMask();
        this.props.getAlerts();
        //this.props.getGsMapMatch('2017/01/06');
        //this.props.getSSTMatch('2016/08/02');
        //this.props.getDamData();
        this.props.getLatestWaterLevel();
        //this.props.getBaisins();
        this.props.getRainfall(formatDate(date, time));
        this.props.getChart24Rainfall();
        this.props.getChartWaterLevel();
        this.props.getRainfallForecast('2017-09-04');
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
        //this.props.getThaiBoundary();

        L.Icon.Default.mergeOptions({
            iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
            iconUrl: require('leaflet/dist/images/marker-icon.png'),
            shadowUrl: require('leaflet/dist/images/marker-shadow.png')
        });
        if (this.refs.map) {
            window.map = this.refs.map.leafletElement;
            window.map.on('overlayadd', this.onOverlayAdd);
            window.map.addControl(new L.Control.Fullscreen());
        }
        var geocoder = new MyGeocoderPlugin('mapzen-5nwfpbh');
        window.map.addControl(geocoder);

    }
    render() {
        const { url, sstUrl, tiffError , forecastSSTUrl , forecastGSUrl } = this.state;
        const { teleStationData, damData, hBaseDamData, thaiBoundaryData,
            rainFall, dailyDam, clipMask, mapLayer, date, time, latestWaterLevel, baisins
            , mapType  } = this.props;
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
                                <LayersControl position="topleft">
                                    <BaseLayer name="Map nik">
                                        <TileLayer
                                            attribution=""
                                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                        />
                                    </BaseLayer>
                                    <BaseLayer name="DE">
                                        <TileLayer
                                            attribution=""
                                            url="https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png"
                                        />
                                    </BaseLayer>
                                    <BaseLayer checked name="HOT">
                                        <TileLayer
                                            attribution=""
                                            url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
                                        />
                                    </BaseLayer>
                                    <BaseLayer name="Roads">
                                        <TileLayer
                                            attribution=""
                                            url="https://korona.geog.uni-heidelberg.de/tiles/roads/x={x}&y={y}&z={z}"
                                        />
                                    </BaseLayer>
                                    <BaseLayer name="DeLorme">
                                        <TileLayer
                                            attribution=""
                                            url=" https://server.arcgisonline.com/ArcGIS/rest/services/Specialty/DeLorme_World_Base_Map/MapServer/tile/{z}/{y}/{x}"
                                        />
                                    </BaseLayer>
                                    <Overlay name="Boundary">
                                        <WMSTileLayer
                                            layers="thailand_boundary"
                                            TRANSPARENT={true}
                                            format="image/png"
                                            url="http://igis.thaiwater.net:80/geoserver/wms?"
                                        />
                                    </Overlay>
                                    <Overlay name="Basin">
                                        <WMSTileLayer
                                            layers="thailand_basin"
                                            TRANSPARENT={true}
                                            format="image/png"
                                            url="http://igis.thaiwater.net:80/geoserver/wms?"
                                        />
                                    </Overlay>
                                    <Overlay name="Small Water storage">
                                        <WMSTileLayer
                                            layers="small_water_storage"
                                            TRANSPARENT={true}
                                            format="image/png"
                                            url="http://igis.thaiwater.net:80/geoserver/wms?"
                                        />
                                    </Overlay>
                                </LayersControl>
                                {clipMask.size != 0 && mapType == "MONITORING" && mapLayer.findIndex((layer) => layer == "GSMAP") > -1 && url != '' && tiffError != "GSMAP" ? <LeafletGeoTiff mapLayer="GSMAP" handleTiffError={this.handleTiffError} clipMask={clipMask} url={url} /> : null}
                                {mapType == "MONITORING" && mapLayer.findIndex((layer) => layer == "SST") > -1 && sstUrl != '' && tiffError != "SST" ? <LeafletGeoTiff mapLayer="SST" handleTiffError={this.handleTiffError}  url={sstUrl} /> : null}
                                {clipMask.size != 0 && mapType == "FORECAST" && mapLayer.findIndex((layer) => layer == "FORECAST_GSMAP") > -1 && forecastGSUrl != '' && tiffError != "FORECAST_GS" ? <LeafletGeoTiff mapLayer="FORECAST_GS" clipMask={clipMask} url={forecastGSUrl} /> : null}
                                {clipMask.size != 0 && mapType == "FORECAST" && mapLayer.findIndex((layer) => layer == "FORECAST_SST") > -1 && forecastSSTUrl != '' && tiffError != "FORECAST_SST" ? <LeafletGeoTiff mapLayer="FORECAST_SST" clipMask={clipMask} url={forecastSSTUrl} /> : null}
                                {rainFall.size != 0 && mapType == "MONITORING" && mapLayer.findIndex((layer) => layer == "RAINFALL") > -1 ? <ClusterGroup layer="rainfall" data={rainFall} >  </ClusterGroup> : null}
                                {latestWaterLevel.size != 0  && mapType == "MONITORING" && mapLayer.findIndex((layer) => layer == "WATERLEVEL") > -1 ?
                                    <ClusterGroup data={latestWaterLevel} layer="waterlevel" >  </ClusterGroup> : null}
                                <DateTimeSeries mapType={mapType} updateImage={this.updateImage} mapLayer={mapLayer} />

                                <Legend  mapType={mapType} mapLayer={mapLayer} />
                                <CustomLayer mapLayer={mapLayer} showRightNav={this.props.showRightNav} updateMapLayer={this.props.updateMapLayer} mapType={mapType} />
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

const mapStateToProps = ({ mapData, siteLayout  , auth }) => ({
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
    latestWaterLevel: mapData.get('latestWaterLevel'),
    baisins: mapData.get('baisins'),
    mapType: mapData.get('mapType'),
    showRightNav: siteLayout.get('showRightNav'),
    auth
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
        getGsMapMatch: bindActionCreators(getGsMapMatch, dispatch),
        getRainfallForecast: bindActionCreators(getRainfallForecast, dispatch),
        getBaisins: bindActionCreators(getBaisins, dispatch),
        updateMapLayer: bindActionCreators(updateMapLayer, dispatch),
        getChart24Rainfall: bindActionCreators(getChart24Rainfall,dispatch),
        getAlerts: bindActionCreators(getAlerts,dispatch),
        getChartWaterLevel: bindActionCreators(getChartWaterLevel,dispatch)
    }
}
Home = connect(mapStateToProps, mapDispatchToProps)(Home);
export default Home;
