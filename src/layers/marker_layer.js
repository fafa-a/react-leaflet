import L from "leaflet"
import { useState } from "react"
import { Marker, Popup } from "react-leaflet"
import { defaultIcon } from "../icons/defaultIcon"
import { Button, Card, InputNumber, Space } from "antd"
import { FilterOutlined } from "@ant-design/icons"

const DEFAULT_RADIUS = 3000

const PopupStatistics = ({ feature, setRadiusFilter }) => {
  const [radius, setRadius] = useState(DEFAULT_RADIUS)
  const { NAME, ADM0NAME, POP_MAX } = feature.properties
  return (
    <>
      <Card type="inner" title="Name" style={{ marginTop: 16 }}>
        <b>{`${NAME}, ${ADM0NAME}`}</b>
      </Card>
      <Card type="inner" title="Population" style={{ marginTop: 16 }}>
        <b>{`${POP_MAX}`}</b>
      </Card>
      <Card type="inner" title="Radius Filter" style={{ marginTop: 16 }}>
        <Space>
          <InputNumber
            defaultValue={DEFAULT_RADIUS}
            min={0}
            onChange={e => setRadius(e)}
          ></InputNumber>
          <Button
            type="primary"
            shape="round"
            icon={<FilterOutlined />}
            onClick={() => setRadiusFilter({ feature, radius })}
          >
            Filter by km
          </Button>
        </Space>
      </Card>
    </>
  )
}
export const MarkerLayer = ({ data, setRadiusFilter, getRadiusFilter }) => {
  const radiusFilter = getRadiusFilter()

  let centerPoint
  if (radiusFilter) {
    const { coordinates } = radiusFilter.feature.geometry
    centerPoint = L.latLng(coordinates[1], coordinates[0])
  }

  return data.features
    .filter(currentFeature => {
      if (centerPoint) {
        const { coordinates } = currentFeature.geometry
        const currentPoint = L.latLng(coordinates[1], coordinates[0])
        return centerPoint.distanceTo(currentPoint) / 1000 < radiusFilter.radius
      } else {
        return true
      }
    })
    .map(feature => {
      const { coordinates } = feature.geometry
      return (
        <Marker
          key={String(coordinates)}
          position={[coordinates[1], coordinates[0]]}
          icon={defaultIcon}
        >
          <Popup>
            <PopupStatistics
              feature={feature}
              setRadiusFilter={setRadiusFilter}
            />
          </Popup>
        </Marker>
      )
    })
}
