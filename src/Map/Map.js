import { useEffect, useState } from "react"
import { LayersControl, MapContainer, Polygon, TileLayer } from "react-leaflet"

import { MarkerLayer } from "../layers/marker_layer"
import { MarkerLayerWithTooltip } from "../layers/marker_layer_with_tooltip"
import { RadiusFilteR } from "../layers/radius_filter"
import { ContinentsPolygonLayer } from "../layers/continents_polygon_layer"
import { FitBoundToDataControl } from "../controls/fit_data_to_bounds"
import { ShowActiveFiltersControl } from "../controls/show_active_filters"
import { MarkerLayerWithTooltipCluster } from "../layers/marker_layer_with_tooltip_cluster"
import { InfoPanel } from "../components/info_panel"
import { continents } from "../data/continents"

import { Andalousie } from "../data/Andalousie"
import { BurkinaFaso } from "../data/BurkinaFaso"
import { India } from "../data/India"
import { Occitanie } from "../data/Occitanie"
import { Tunisia } from "../data/Tunisia"

import { PolygonLayer } from "../layers/polygon_layer"

export const Map = () => {
  const [geoFilter, setGeoFilter] = useState(null)
  const getGeoFilter = () => geoFilter

  const [radiusFilter, setRadiusFilter] = useState(null)
  const getRadiusFilter = () => radiusFilter
  const [asyncCities, setAsyncCities] = useState({ features: [] })

  const dataGeojson = [Andalousie, BurkinaFaso, India, Occitanie, Tunisia]

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

  const getLakeId = id => {
    console.log({ id })
  }

  return (
    <>
      <MapContainer center={[10, 0]} zoom={2} scrollWheelZoom={true}>
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
              <PolygonLayer data={data} getLakeId={getLakeId} />
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
