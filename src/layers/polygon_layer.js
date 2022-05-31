import { useRef } from "react"
import { LayerGroup, LayersControl, Polygon, Tooltip } from "react-leaflet"

export const PolygonLayer = ({ data, getLakeData }) => {
  const { COUNTRY } = data.features[0].properties

  const layer = data.features.map(feature => {
    const { ID_SWOT, DAM_NAME } = feature.properties
    const { coordinates } = feature.geometry
    const reversedMultiPolygons = coordinates[0].map(polygon =>
      polygon.map(p => [p[1], p[0]])
    )

    return (
      <Polygon
        key={ID_SWOT}
        positions={reversedMultiPolygons}
        data-id={ID_SWOT}
        eventHandlers={{
          click: el => {
            getLakeData(el.target.options["data-id"])
          },
        }}
      >
        <Tooltip>
          <h3>{DAM_NAME}</h3>
        </Tooltip>
      </Polygon>
    )
  })
  return (
    <LayersControl.Overlay checked={true} name={`${COUNTRY} lakes polygons`}>
      <LayerGroup>{layer}</LayerGroup>
    </LayersControl.Overlay>
  )
}
