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
        displayMax: 30,
        name: 'GeoTiff',
        colorScale: 'rainbow',
        clampLow: false,
        clampHigh: true,
        //vector:true,
        arrowSize: 20,
      }
    )
    window.geoLayer && window.geoLayer.setClip(props.clipMask);
    window.map.addLayer(window.geoLayer);
    return window.geoLayer;
  }

  updateLeafletElement(fromProps: Props, toProps: Props) {
    if (!this.leafletElement.options.clip)
      this.leafletElement.setClip(fromProps.clipMask);
    if (toProps.url !== fromProps.url) {
      window.map.addLayer(window.geoLayer);
      this.leafletElement.setURL(toProps.url);
    }

  }
}