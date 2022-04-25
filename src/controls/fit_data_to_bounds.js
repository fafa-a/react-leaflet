import ReactDOM from "react-dom"
import { Button } from "antd"
import { BorderInnerOutlined, BorderOuterOutlined } from "@ant-design/icons"

import { createControlComponent } from "@react-leaflet/core"
import { Control, DomUtil } from "leaflet"

const node = DomUtil.create("div")

Control.FitBoundToDataControl = Control.extend({
  options: {
    position: "topleft",
  },
  onAdd: function (map) {
    const doFitDataToBounds = () => {
      const latLngs = []
      map.eachLayer(layer => {
        const latLng = layer.options.doFitToBounds && layer.getLatLng()
        if (latLng) {
          latLngs.push(latLng)
        }
      })
      map.fitBounds(latLngs)
    }
    ReactDOM.render(
      <>
        <Button
          className="leaflet-control-layers"
          style={{
            width: "33px",
            height: "33px",
          }}
          title="Fit bounds to data"
          icon={<BorderInnerOutlined />}
          onClick={() => doFitDataToBounds()}
        ></Button>
        <Button
          className="leaflet-control-layers"
          style={{
            width: "33px",
            height: "33px",
          }}
          title="Fit bounds to world"
          icon={<BorderOuterOutlined />}
          onClick={() => map.fitWorld()}
        ></Button>
      </>,
      node
    )
    return node
  },
  onRemove: function (map) {},
})

export const FitBoundToDataControl = createControlComponent(
  props => new Control.FitBoundToDataControl(props)
)
