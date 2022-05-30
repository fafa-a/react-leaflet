import { usePapaParse } from "react-papaparse"

const { readString } = usePapaParse()

let obj = {}
obj.observation = []

const papaConfig = {
  download: true,
  step: row => {
    if (row.data[0] === "id") {
      obj.id = row.data[1]
    } else if (row.data[0] === "name") {
      obj.name = row.data[1]
    } else {
      const date = row.data[0]
      const value = row.data[1]
      obj.observation.push({ date, value })
    }
  },
  complete: results => {
    obj = {}
  },
  error: (error, file) => {
    console.log("Error while parsing:", error, file)
  },
}

//const csvToJson = csvFile => {
//  try {
//    return readString(csvFile, papaConfig)
//  } catch (error) {
//    console.error(error)
//  }
//}

const csvToJson = csvFile => {
  readString(csvFile, papaConfig)
  return obj
}

//const csvToJson = csvFile => {
//  return new Promise(resolve => {
//    resolve(readString(csvFile, papaConfig))
//  })
//}
export { csvToJson }
