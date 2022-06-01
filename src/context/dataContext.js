import { useState, createContext } from "react"
import { CSVToJSON, CSVToJSONPromise } from "../utils/csvToJson"

export const DataContext = createContext()

export const DataContextProvider = ({ children }) => {
  const [dataChart, setDataChart] = useState([])

  const changeData = async (...csv) => {
    const data = await CSVToJSONPromise(csv[1])
    setDataChart(data)
  }

  return (
    <DataContext.Provider value={{ dataChart, changeData }}>
      {children}
    </DataContext.Provider>
  )
}
