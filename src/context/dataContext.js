import { useState, createContext } from "react"
import { CSVToJSON, CSVToJSONPromise } from "../utils/csvToJson"

export const DataContext = createContext()

export const DataContextProvider = ({ children }) => {
  const [dataChart, setDataChart] = useState({
    fillingRate: [],
    surface: [],
    volume: [],
  })

  const changeData = async (...csv) => {
    setDataChart({
      fillingRate: await CSVToJSONPromise(csv[0]),
      surface: await CSVToJSONPromise(csv[1]),
      volume: await CSVToJSONPromise(csv[2]),
    })
    // csv.forEach(async (csvFile,index) => {
    //   const data = await CSVToJSONPromise(csvFile)
    //   switch (index) {
    //     case 0:
    //       setDataChart({ ...dataChart, filingRate: data })
    //       break
    //     case 1:
    //       setDataChart({ ...dataChart, surface: data })
    //       break
    //     case 2:
    //       setDataChart({ ...dataChart, volume: data })
    //   }
    // })

    // const data = await CSVToJSONPromise(csv[1])
    // setDataChart(data)
  }

  return (
    <DataContext.Provider value={{ dataChart, changeData }}>
      {children}
    </DataContext.Provider>
  )
}
