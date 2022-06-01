import { useEffect, useState, useContext } from "react"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  TimeScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js"
import { Line } from "react-chartjs-2"
import { randNumber, randBetweenDate } from "@ngneat/falso"
import { RadioInput } from "./radio_input"
import { DataContext } from "../context/dataContext"

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  TimeScale,
  Title,
  Tooltip,
  Legend
)

export const InfoPanel = () => {
  const { dataChart } = useContext(DataContext)
  const { observation, id, name } = dataChart
  console.log("data info panel", { name }, { dataChart })
  const [loading, setLoading] = useState(true)
  const [dataFiltered, setDataFiltered] = useState([])

  useEffect(() => {
    if (typeof observation === "object") {
      console.log("hey", observation)

      const fillingRateData = dataChart.observation.filter(
        val => val.value !== "nan" && val.date !== "" && val.value !== "0"
      )

      setDataFiltered(fillingRateData)
      console.log("datafilterd", dataFiltered)
      setLoading(false)
    }
  }, [observation])

  const options = {
    responsive: true,
    maintainAspectRatio: false,
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
    labels: dataFiltered.map(el => {
      return new Date(el.date)
      const date = new Date(el.date)
      const options = {
        month: "long",
        year: "numeric",
      }
      return new Intl.DateTimeFormat("en-US", options).format(date)
    }),
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
