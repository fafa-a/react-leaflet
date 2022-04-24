import React from "react"
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import { defaultIcon } from "../icons/defaultIcon"
import { cities } from "../data/cities"

const MarkerLayer = ({ data }) => {
  return data.features.map(feature => {
    const { coordinates } = feature.geometry
    return (
      <Marker
        key={String(coordinates)}
        position={[coordinates[1], coordinates[0]]}
        icon={defaultIcon}
      >
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    )
  })
}

export const Map = () => {
  const position = [51.505, -0.09]

  return (
    <MapContainer center={position} zoom={13} scrollWheelZoom={true}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MarkerLayer data={cities} />
    </MapContainer>
  )
}
