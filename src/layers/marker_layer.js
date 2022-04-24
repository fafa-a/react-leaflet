import React from "react"
import { Marker, Popup } from "react-leaflet"
import { defaultIcon } from "../icons/defaultIcon"
import { Button, Card, InputNumber, Space } from "antd"
import { FilterOutlined } from "@ant-design/icons"
const PopupStatistics = ({ feature }) => {
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
            defaultValue={3000}
            min={0}
            onChange={e => console.log(e)}
          ></InputNumber>
          <Button type="primary" shape="round" icon={<FilterOutlined />}>
            Filter by km
          </Button>
        </Space>
      </Card>
    </>
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
          <PopupStatistics feature={feature} />
        </Popup>
      </Marker>
    )
  })
}
