import { usePapaParse } from "react-papaparse"

    const CSVToJSON = csvFile => {
      const { readString } = usePapaParse()
      if (csvFile !== undefined) {
        const obj = new Object()
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
            console.log("Parsing complete", obj)
          },
          error: (error, file) => {
            console.log("Error while parsing:", error, file)
          },
        }

        readString(csvFile, papaConfig)
        return obj
      }
    }

export { CSVToJSON }
