import { useState, createContext } from "react"
import { CSVToJSONPromise } from "../utils/csvToJson"

export const DataContext = createContext()

export const DataContextProvider = ({ children }) => {
  const [dataChart, setDataChart] = useState({
    date: [],
    fillingRate: [],
    level: [],
    surface: [],
    volume: [],
  })

  const changeData = async (id, ...json) => {
    if (!id) return
    // setDataChart({
    //     fillingRate: await CSVToJSONPromise(csv[0]),
    //     surface: await CSVToJSONPromise(csv[1]),
    //     volume: await CSVToJSONPromise(csv[2]),
    //   })
    if (json.length === 1) {
      setDataChart({
        date: json[0][id].map(el => el.date),
        level: json[0][id].map(el => el.level),
        surface: json[0][id].map(el => el.area),
        volume: json[0][id].map(el => el.volume),
      })
    } else if (json.length === 3) {
      setDataChart({
        fillingRate: json[0],
        surface: json[1],
        volume: json[2],
      })
    }
  }
  return (
    <DataContext.Provider value={{ dataChart, changeData }}>
      {children}
    </DataContext.Provider>
  )
}
