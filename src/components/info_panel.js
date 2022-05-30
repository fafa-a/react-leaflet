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
import csv from "../series/Andalousie/2160004183_filling_rate_MO1.csv"
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

export const InfoPanel = () => {
  const [dataJson, setDataJson] = useState({
    date: [],
    id: "",
    name: "",
  })

  useEffect(() => {
    const data = csvToJson(csv)
    setDataJson(data)
  }, [])
  console.log(dataJson)
  // const val = dataJson.date.map(val =>
  //   Object.entries(val)
  //     .filter(val => val[1] !== "nan")
  //     .map(val => val)
  // )

  // console.log(val)

  // objDate.forEach(date => console.log(date))

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
        text: "Data Visualization",
        font: {
          size: 16,
        },
      },
    },
  }
  const labels = []
  for (let i = 0; i < 152; i++) {
    labels.push(
      randBetweenDate({ from: new Date("18/05/2019"), to: new Date() })
    )
  }

  const data = {
    labels,
    datasets: [
      {
        label: "Volume m³",
        data: labels.map(() => randNumber({ min: 0, max: 1000 })),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Surface m²",
        data: labels.map(() => randNumber({ min: 0, max: 1000 })),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
      {
        label: "Filling rate %",
        data: labels.map(() => randNumber({ min: 0, max: 100 })),
        borderColor: "rgb(127, 255, 0)",
        backgroundColor: "rgba(127, 255, 0, 0.5)",
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
      <Line options={options} data={data} />
      <RadioInput />
    </div>
  )
}
