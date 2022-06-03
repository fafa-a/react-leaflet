import React from "react"
import { Map } from "./Map/Map"
import "leaflet/dist/leaflet.css"
import "./App.css"
import "antd/dist/antd.variable.min.css"
import "leaflet.markercluster/dist/MarkerCluster.css"
import "leaflet.markercluster/dist/MarkerCluster.Default.css"
import { DataContextProvider } from "./context/DataContext"

const App = () => {
  return (
    <DataContextProvider>
      <Map />
    </DataContextProvider>
  )
}

export default App
