import { Circle } from "react-leaflet"

export const RadiusFilteR = ({ radiusFilter }) => {
  if (radiusFilter) {
    const { coordinates } = radiusFilter.feature.geometry
    return (
      <Circle
        center={[coordinates[1], coordinates[0]]}
        radius={radiusFilter.radius * 1000}
      />
    )
  } else {
    return null
  }
}
