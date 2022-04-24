import React from "react"
import { MapContainer, TileLayer } from "react-leaflet"
import { MarkerLayer } from "../layers/marker_layer"
import { cities } from "../data/cities"

export const Map = () => {
  return (
    <MapContainer center={[0, 0]} zoom={1} scrollWheelZoom={true}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MarkerLayer data={cities} />
    </MapContainer>
  )
}
