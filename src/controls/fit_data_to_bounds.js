import ReactDOM from "react-dom"
import { Button } from "antd"
import { BorderOuterOutlined } from "@ant-design/icons"

import { createControlComponent } from "@react-leaflet/core"
import { Control, DomUtil } from "leaflet"

const node = DomUtil.create("div")

Control.FitBoundToDataControl = Control.extend({
  options: {
    position: "topleft",
  },
  onAdd: function (map) {
    ReactDOM.render(
      <Button
        title="Fit bounds to world"
        icon={<BorderOuterOutlined />}
        onClick={() => map.fitWorld()}
      ></Button>,
      node
    )
    return node
  },
  onRemove: function (map) {},
})

export const FitBoundToDataControl = createControlComponent(
  props => new Control.FitBoundToDataControl(props)
)
