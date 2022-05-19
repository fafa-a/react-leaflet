import React from "react"
import { LayersControl, Marker, Tooltip, useMap } from "react-leaflet"
import MarkerClusterGroup from "react-leaflet-markercluster"
import { defaultIcon } from "../icons/defaultIcon"


/**
 * Component to diplay a marker cluster layer for world cities
 *
 * @component
 * @param {Object} data
 * @returns {LayersControl.Overlay}
 */
export const MarkerLayerWithTooltipCluster = ({ data }) => {
  const leafletMap = useMap()
  const layer = data.features.map(feature => {
    const { DAM_NAME, ID_SWOT, LONG_DD, LAT_DD } = feature.properties
    return (
      <Marker
        key={ID_SWOT}
        position={[LAT_DD, LONG_DD]}
        icon={defaultIcon}
        eventHandlers={{
          click: e => leafletMap.panTo(e.latlng),
        }}
      >
        <Tooltip>
          <h3>{DAM_NAME}</h3>
        </Tooltip>
      </Marker>
    )
  })

  return (
    <LayersControl.Overlay name="Lakes clustered">
      <MarkerClusterGroup zoomToBoundsOnClick={false}>
        {layer}
      </MarkerClusterGroup>
    </LayersControl.Overlay>
  )
}
