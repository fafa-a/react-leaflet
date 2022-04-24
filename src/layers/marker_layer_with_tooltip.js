import React from "react"
import { Marker, Tooltip } from "react-leaflet"
import { defaultIcon } from "../icons/defaultIcon"
import { mountainIcon } from "../icons/mountainIcon"

export const MarkerLayerWithTooltip = ({ data }) => {
  return data.features.map(feature => {
    const { coordinates } = feature.geometry
    const { name, elevation, continent } = feature.properties
    return (
      <Marker
        key={String(coordinates)}
        position={[coordinates[1], coordinates[0]]}
        icon={mountainIcon}
      >
        <Tooltip>
          <h3>Mt.{name}</h3>
          <p>
            Continent: <b>{continent}</b>
          </p>
          <p>
            Elevation: <b>{elevation} m</b>
          </p>
        </Tooltip>
      </Marker>
    )
  })
}
