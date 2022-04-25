import { GeoJSON } from "react-leaflet"

export const ContinentsPolygonLayer = ({ data, setGeoFilter }) => {
  return (
    <GeoJSON
      key="geo-json-layer"
      data={data}
      eventHandlers={{
        click: e =>
          setGeoFilter(prevState => {
            const same = prevState === e.propagatedFrom.feature
            return same ? null : e.propagatedFrom.feature
          }),
      }}
    ></GeoJSON>
  )
}
