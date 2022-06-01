import { useContext, useEffect, useState } from "react"
import { LayersControl, MapContainer, Polygon, TileLayer } from "react-leaflet"

import { MarkerLayer } from "../layers/marker_layer"
import { MarkerLayerWithTooltip } from "../layers/marker_layer_with_tooltip"
import { MarkerLayerWithTooltipCluster } from "../layers/marker_layer_with_tooltip_cluster"
import { InfoPanel } from "../components/info_panel"
import { PolygonLayer } from "../layers/polygon_layer"

import { Andalousie } from "../data/Andalousie"
import { BurkinaFaso } from "../data/BurkinaFaso"
import { India } from "../data/India"
import { Occitanie } from "../data/Occitanie"
import { Tunisia } from "../data/Tunisia"

import csv from "../series/Andalousie/2160004183_filling_rate_MO1.csv"
import { CSVToJSON } from "../utils/csvToJson"
import { DataContext } from "../context/dataContext"

export const Map = () => {
  const [geoFilter, setGeoFilter] = useState(null)
  const getGeoFilter = () => geoFilter
  const [radiusFilter, setRadiusFilter] = useState(null)
  const getRadiusFilter = () => radiusFilter
  const [asyncCities, setAsyncCities] = useState({ features: [] })
  const dataGeojson = [Andalousie, BurkinaFaso, India, Occitanie, Tunisia]

  const { dataChart, changeData } = useContext(DataContext)
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_110m_populated_places_simple.geojson"
      )
      const cities = await response.json()
      setAsyncCities(cities)
    }
    fetchData().catch(console.error)
  }, [])

  const getLakeData = id => {
    changeData(csv)
  }
  useEffect(() => {
    getLakeData()
  }, [])

  return (
    <>
      <MapContainer center={[36.91, -3.54]} zoom={11} scrollWheelZoom={true}>
        <LayersControl position="topright">
          <LayersControl.BaseLayer checked name="OSM Strets">
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          </LayersControl.BaseLayer>
          <LayersControl.BaseLayer name="ESRI World Imagery">
            <TileLayer
              url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
              attribution="Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"
            />
          </LayersControl.BaseLayer>
          {dataGeojson.map((data, index) => (
            <div key={index.toString()}>
              <MarkerLayer
                data={data}
                setRadiusFilter={setRadiusFilter}
                getRadiusFilter={getRadiusFilter}
                getGeoFilter={getGeoFilter}
              />
              <PolygonLayer data={data} getLakeData={getLakeData} />
              <MarkerLayerWithTooltipCluster data={data} />
            </div>
          ))}
          {/* <RadiusFilteR
            radiusFilter={radiusFilter}
            setRadiusFilter={setRadiusFilter}
          />
          <ContinentsPolygonLayer
            data={continents}
            setGeoFilter={setGeoFilter}
            getGeoFilter={getGeoFilter}
          />
        */}
          {/* <FitBoundToDataControl />
          <ShowActiveFiltersControl
            getFilters={() => ({ geoFilter, radiusFilter })}
          /> */}
        </LayersControl>
      </MapContainer>
      <InfoPanel />
    </>
  )
}
