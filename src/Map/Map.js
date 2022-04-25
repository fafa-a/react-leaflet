import { useState } from "react"
import { LayersControl, MapContainer, TileLayer } from "react-leaflet"

import { MarkerLayer } from "../layers/marker_layer"
import { MarkerLayerWithTooltip } from "../layers/marker_layer_with_tooltip"
import { RadiusFilteR } from "../layers/radius_filter"
import { ContinentsPolygonLayer } from "../layers/continents_polygon_layer"

import { continents } from "../data/continents"
import { cities } from "../data/cities"
import { mountains } from "../data/highest-points"

export const Map = () => {
  const [geoFilter, setGeoFilter] = useState(null)
  const getGeoFilter = () => geoFilter

  const [radiusFilter, setRadiusFilter] = useState(null)
  const getRadiusFilter = () => radiusFilter

  return (
    <MapContainer center={[0, 0]} zoom={1} scrollWheelZoom={true}>
      <LayersControl position="topright">
        <LayersControl.BaseLayer checked name="OSM Strets">
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        </LayersControl.BaseLayer>
        <MarkerLayer
          data={cities}
          setRadiusFilter={setRadiusFilter}
          getRadiusFilter={getRadiusFilter}
          getGeoFilter={getGeoFilter}
        />
        <MarkerLayerWithTooltip data={mountains} />
        <RadiusFilteR
          radiusFilter={radiusFilter}
          setRadiusFilter={setRadiusFilter}
        />
        <ContinentsPolygonLayer
          data={continents}
          setGeoFilter={setGeoFilter}
          getGeoFilter={getGeoFilter}
        />
      </LayersControl>
    </MapContainer>
  )
}
