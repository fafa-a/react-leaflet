import { useContext, useEffect, useState, useRef } from "react"
import { LayersControl, MapContainer, Polygon, TileLayer } from "react-leaflet"

import { MarkerLayer } from "../layers/MarkerLayer"
import { MarkerLayerWithTooltip } from "../layers/MarkerLayerWithTooltip"
import { MarkerLayerWithTooltipCluster } from "../layers/MarkerLayerWithTooltipCluster"
import { Chart } from "../components/Chart"
import { PolygonLayer } from "../layers/PolygonLayer"
import { FitBoundToDataControl } from "../controls/FitDataToBounds"
import { Andalousie } from "../data/geojson/Andalousie"
import { BurkinaFaso } from "../data/geojson/BurkinaFaso"
import { India } from "../data/geojson/India"
import { Occitanie } from "../data/geojson/Occitanie"
import { Tunisia } from "../data/geojson/Tunisia"

import fillingRate from "../data/series/Andalousie/filling_rate_M01.json"
import surface from "../data/series/Andalousie/surface_M01.json"
import volume from "../data/series/Andalousie/volume_M01.json"

import { DataContext } from "../context/DataContext"

export const Map = () => {
  const [geoFilter, setGeoFilter] = useState(null)
  const getGeoFilter = () => geoFilter
  const [radiusFilter, setRadiusFilter] = useState(null)
  const getRadiusFilter = () => radiusFilter
  const [asyncCities, setAsyncCities] = useState({ features: [] })
  const dataGeojson = [Andalousie, BurkinaFaso, India, Occitanie, Tunisia]
  const [polygonClicked, setPolygonCliked] = useState(Boolean)
  const { dataChart, changeData } = useContext(DataContext)

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const response = await fetch(
  //       "https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_110m_populated_places_simple.geojson"
  //     )
  //     const cities = await response.json()
  //     setAsyncCities(cities)
  //   }
  //   fetchData().catch(console.error)
  // }, [])

  const isPolygonClicked = bool => {
    setPolygonCliked(bool)
  }
  const getLakeData = id => {
    changeData(fillingRate, surface, volume)
  }
  useEffect(() => {
    getLakeData()
  }, [])

  return (
    <>
      {/* <div style={{ height: v`${polygonClicked ? "55vh" : "100vh"}` }}> */}
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
              <PolygonLayer
                data={data}
                getLakeData={getLakeData}
                isPolygonClicked={isPolygonClicked}
              />

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
          {/* <FitBoundToDataControl /> */}
          {/* <ShowActiveFiltersControl
              getFilters={() => ({ geoFilter, radiusFilter })}
            /> */}
        </LayersControl>
      </MapContainer>
      <Chart />
      {/* </div> */}
      {/* {polygonClicked && <InfoPanel />} */}
    </>
  )
}
