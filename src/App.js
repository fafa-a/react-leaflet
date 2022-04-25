import React from "react"
import { Map } from "./Map/Map"
import "leaflet/dist/leaflet.css"
import "./app.css"
import "antd/dist/antd.variable.min.css"
import "leaflet.markercluster/dist/MarkerCluster.css"
import "leaflet.markercluster/dist/MarkerCluster.Default.css"

export const App = () => {
  return <Map />
}
