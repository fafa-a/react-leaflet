import { List } from "antd"
export const ShowActiveFiltersControl = () => {
  const RenderActiveFilters = () => {
    return (
      <List
        size="large"
        header={
          <div>
            <b>Active Filters</b>
          </div>
        }
        bordered
        dataSource={[]}
        renderItem={item => <List.Item>{item}</List.Item>}
      />
    )
  }

  return (
    <div className="leaflet-bottom leaflet-left">
      <div className="leaflet-control leaflet-bar leaflet-control-layers">
        <RenderActiveFilters />
      </div>
    </div>
  )
}
