import PropTypes from 'prop-types'

import { MapLayer, MapLayerProps } from 'react-leaflet';

type Props = {
  url: string
} & MapLayerProps


export default class LeafletGeoTiff extends MapLayer<L.LeafletGeotiff, Props> {

createLeafletElement(props: Props): LeafletElement {
    return new L.leafletGeotiff(
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
  }

  updateLeafletElement(fromProps: Props, toProps: Props) {
    if (!this.leafletElement.options.clip)
      this.leafletElement.setClip(fromProps.clipMask);
    if (toProps.url !== fromProps.url) {
      this.leafletElement.setURL(toProps.url);
    }

  }
}