import { createControlComponent } from "@react-leaflet/core"
import { Control, DomUtil } from "leaflet"

const node = DomUtil.create("div")

Control.FitBoundToDataControl = Control.extend({
  options: {
    position: "topleft",
  },
  onAdd: function (map) {
    console.log("added to map", map)
    return node
  },
  onRemove: function (map) {},
})

export const FitBoundToDataControl = createControlComponent(
  props => new Control.FitBoundToDataControl(props)
)
