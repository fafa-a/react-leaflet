import { useEffect, useState } from "react"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"
import { Line } from "react-chartjs-2"
import { randNumber, randBetweenDate } from "@ngneat/falso"
import { RadioInput } from "./radio_input"
import { csvToJson } from "../utils/csvToJson"

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

export const InfoPanel = ({ dataCharts }) => {
  const [loading, setLoading] = useState(true)
  // const [fillingRateValues, setFillingRateValues] = useState([])
  //const [fillingRateDates, setFillingRateDates] = useState([])
  const [dataFiltered, setDataFiltered] = useState([])
  const { observation, id, name } = dataCharts

  useEffect(() => {
    if (observation?.length) {
      console.log("hey", observation.length)
      const fillingRateData = observation.filter(
        val => val.value !== "nan" && val.date !== ""
      )
      setDataFiltered(fillingRateData)
      // setFillingRateValues(fillingRateData.map(el => el.value))
      // setFillingRateDates(fillingRateData.map(el => new Date(el.date)))
      setLoading(false)
    }
  }, [dataCharts])

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          font: {
            size: 14,
          },
        },
      },
      title: {
        display: true,
        text: `${name} Data Visualization`,
        font: {
          size: 16,
        },
      },
    },
    title: {
      display: true,
      text: `${name} Data Visualization`,
      font: {
        size: 16,
      },
    },
  }

  const labels = []
  for (let i = 0; i < 152; i++) {
    labels.push(
      randBetweenDate({
        from: new Date("18/05/2019"),
        to: new Date(),
      })
    )
  }

  const data = {
    labels: dataFiltered.map(el => new Date(el.date)),
    datasets: [
      {
        label: "Filling rate",
        data: dataFiltered.map(el => el.value),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  }

  const style = {
    bottom: 0,
    display: "flex",
    height: "45vh",
    position: "absolute",
    maxWidth: "100%",
  }

  return (
    <div style={{ ...style }}>
      {loading ? (
        <h2>Loading data...</h2>
      ) : (
        <>
          <Line options={options} data={data} />
          <RadioInput />
        </>
      )}
    </div>
  )
}
