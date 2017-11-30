import PropTypes from 'prop-types'

import { MapLayer, MapLayerProps } from 'react-leaflet';

type Props = {
  url: string
} & MapLayerProps


export default class LeafletGeoTiff extends MapLayer<L.LeafletGeotiff, Props> {


createLeafletElement(props: Props): LeafletElement {

   window.geoLayer = new L.leafletGeotiff(
      props.url,
      {
        band: 0,
        displayMin: 0,
        displayMax: 150,
        name: 'GeoTiff',
        colorScale: 'mycolorscale',
        clampLow: false,
        clampHigh: true,
        //vector:true,
        arrowSize: 20,
      }
    )
    window.geoLayer && props.clipMask && window.geoLayer.setClip(props.clipMask);
    //window.map.addLayer(window.geoLayer);
    return window.geoLayer;
  }

  updateLeafletElement(fromProps: Props, toProps: Props) {
    if (!this.leafletElement.options.clip && fromProps.clipMask )
      this.leafletElement.setClip(fromProps.clipMask);
    if (toProps.url !== fromProps.url) {
      this.leafletElement.setURL(toProps.url,()=> this.props.handleTiffError(this.props.mapLayer));
    }
    return this.leafletElement;

  }
}
