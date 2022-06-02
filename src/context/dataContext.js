import { useState, createContext } from "react"
import { CSVToJSONPromise } from "../utils/csvToJson"

export const DataContext = createContext()

export const DataContextProvider = ({ children }) => {
  const [dataChart, setDataChart] = useState({
    fillingRate: [],
    surface: [],
    volume: [],
  })

  const changeData = async (...json) => {
    // setDataChart({
    //     fillingRate: await CSVToJSONPromise(csv[0]),
    //     surface: await CSVToJSONPromise(csv[1]),
    //     volume: await CSVToJSONPromise(csv[2]),
    //   })

    setDataChart({
      fillingRate: json[0],
      surface: json[1],
     volume: json[2],
    })
  }

  return (
    <DataContext.Provider value={{ dataChart, changeData }}>
      {children}
    </DataContext.Provider>
  )
}
