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
  console.log(dataChart)
  // const { observation, id, name } = dataChart.fillingRate
  const [loading, setLoading] = useState(true)
  const [dataFiltered, setDataFiltered] = useState({
    fillingRate: [],
    surface: [],
    volume: [],
  })
  const [dateLabels, setDateLabels] = useState([])

  useEffect(() => {
    const fillingRateData = dataChart.fillingRate.filter(
      el => !isNaN(el.value) && el.date !== "" && el.value !== 0
    )
    const surfaceData = dataChart.surface.filter(
      el => !isNaN(el.value) && "nan" && el.date !== "" && el.value !== 0
    )
    const volumeData = dataChart.volume.filter(
      el => !isNaN(el.value) && el.date !== "" && el.value !== 0
    )
    setDataFiltered({
      ...dataFiltered,
      fillingRate: fillingRateData,
      surface: surfaceData,
      volume: volumeData,
    }
    )
    //const date = new Date(el.date)
    //   const options = {
    //     day: "numeric",
    //     month: "numeric",
    //     year: "2-digit",
    //   }
    //   return new Intl.DateTimeFormat("en-US", options).format(date)
    const dateFillingRate = dataFiltered.fillingRate.map(el => el.date)
    const dateSurface = dataFiltered.surface.map(el => el.date)
    const dateVolume = dataFiltered.volume.map(el => el.date)

    const dateTMP = [...dateFillingRate, ...dateSurface, ...dateVolume]
    const uniqueDate = new Set(dateTMP)

    setDateLabels(Array.from(uniqueDate))
    setLoading(false)
  }, [dataChart])

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
    labels: dateLabels,
    // .map((el, idx) => {
    //   console.log(el.value)
    //   return new Date(el[idx])
    //   const date = new Date(el.date)
    //   const options = {
    //     day: "numeric",
    //     month: "numeric",
    //     year: "2-digit",
    //   }
    //   return new Intl.DateTimeFormat("en-US", options).format(date)
    // })
    datasets: [
      {
        label: "Filling rate %",
        data: dataFiltered.fillingRate.map(el => (1 * el.value).toFixed(2)),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Surface hm²",
        data: dataFiltered.surface.map(
          el => (1 * el.value).toFixed(2) / 10_000
        ),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
      {
        label: "Volume hm³",
        data: dataFiltered.volume.map(
          el => (1 * el.value).toFixed(2) / 1_000_000
        ),
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
      {loading ? (
        <h2>Loading data...</h2>
      ) : (
        <>
          <Line options={options} data={data} />
          {/* <RadioInput /> */}
        </>
      )}
    </div>
  )
}
