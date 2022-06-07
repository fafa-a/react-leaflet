import { useContext, useEffect, useState, useRef } from "react"
import { LayersControl, MapContainer, Polygon, TileLayer } from "react-leaflet"

import { MarkerLayer } from "../layers/MarkerLayer"
import { MarkerLayerWithTooltipCluster } from "../layers/MarkerLayerWithTooltipCluster"
import { Chart } from "../components/Chart"
import { PolygonLayer } from "../layers/PolygonLayer"
import { Andalousie } from "../data/geojson/Andalousie"
import { BurkinaFaso } from "../data/geojson/BurkinaFaso"
import { India } from "../data/geojson/India"
import { Occitanie } from "../data/geojson/Occitanie"
import { Tunisia } from "../data/geojson/Tunisia"

import { config } from "../config"
import { dsv } from "d3"

export const Map = () => {
  const [geoFilter, setGeoFilter] = useState(null)
  const getGeoFilter = () => geoFilter
  const [radiusFilter, setRadiusFilter] = useState(null)
  const getRadiusFilter = () => radiusFilter
  const dataGeojson = [Andalousie, BurkinaFaso, India, Occitanie, Tunisia]
  const [polygonClicked, setPolygonCliked] = useState(Boolean)
  const [dataChart, setDataChart] = useState(null)

  const isPolygonClicked = bool => {
    setPolygonCliked(bool)
  }
  const getLakeData = id => {
    if (!id) return
    console.log(id)
    dsv(
      ";",
      `./src/data/series/${id}${config.delimitter}${config.filling_rate.pattern}${config.delimitter}MO1.csv`
    )
      .then(data => {
        setDataChart(data)
      })
      .catch(error => {
        console.log(error)
      })
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
      <Chart dataChart={dataChart} />
    </>
  )
}
