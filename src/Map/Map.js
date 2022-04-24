import React from "react"
import { MapContainer, TileLayer } from "react-leaflet"
import { MarkerLayer } from "../layers/marker_layer"
import { MarkerLayerWithTooltip } from "../layers/marker_layer_with_tooltip"

import { cities } from "../data/cities"
import { mountains } from "../data/highest-points"

export const Map = () => {
  return (
    <MapContainer center={[0, 0]} zoom={1} scrollWheelZoom={true}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MarkerLayer data={cities} />
      <MarkerLayerWithTooltip data={mountains} />
    </MapContainer>
  )
}
