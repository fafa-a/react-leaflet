import React from "react"
import { Marker, Popup } from "react-leaflet"
import { defaultIcon } from "../icons/defaultIcon"
import { Card } from "antd"

const PopupStatics = () => {
  return (
    <Card type="inner" title="Name">
      Inner Card content
    </Card>
  )
}
export const MarkerLayer = ({ data }) => {
  return data.features.map(feature => {
    const { coordinates } = feature.geometry
    return (
      <Marker
        key={String(coordinates)}
        position={[coordinates[1], coordinates[0]]}
        icon={defaultIcon}
      >
        <Popup>
          <PopupStatics />
        </Popup>
      </Marker>
    )
  })
}
