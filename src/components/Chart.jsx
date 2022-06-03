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
import zoomPlugin from "chartjs-plugin-zoom"
import { DataContext } from "../context/DataContext"

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  TimeScale,
  Title,
  Tooltip,
  Legend,
  zoomPlugin
)

export const Chart = () => {
  const { dataChart } = useContext(DataContext)
  // console.log(dataChart)
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
    })
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
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context) {
            const label = context.dataset.label || ""

            const labelStartWith = label
              .slice(0, label.indexOf(" "))
              .toLowerCase()

            const labelWithoutExtension = label.split(" ").slice(0, -1).join(" ")

            if (context.parsed.y !== null) {
              if (labelStartWith === "filling")
                return `${labelWithoutExtension} : ${context.parsed.y.toFixed(
                  3
                )} %`
              else if (labelStartWith === "surface")
                return `${labelWithoutExtension} : ${context.parsed.y.toFixed(
                  3
                )} hm²`
              else if (labelStartWith === "volume")
                return `${labelWithoutExtension} : ${context.parsed.y.toFixed(
                  3
                )} hm³`
            }
            return labelWithoutExtension
          },
        },
      },
      legend: {
        position: "top",
        labels: { font: { size: 14 } },
      },
      zoom: {
        pan: {
          enabled: true,
          modifierKey: "ctrl",
          // onPanStart: chart => {
          //   chart.event.changedPointers[0].target.style.cursor = "grab"
          // },
        },
        zoom: {
          wheel: {
            enabled: true,
          },
          drag: {
            enabled: true,
            backgroundColor: "rgba(0,204,255,0.15)",
            borderColor: "rgba(0,204,255,1.00)",
            borderWidth: 1,
          },
          pinch: {
            enabled: true,
          },
          mode: "xy",
        },
        limits: {
          y: { min: 0, max: "original" },
        },
      },
    },
    title: { display: true, text: "My Chart" },
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
        data: dataFiltered.fillingRate.map(el => 1 * el.value),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Surface hm²",
        data: dataFiltered.surface.map(el => (1 * el.value) / 10_000),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
      {
        label: "Volume hm³",
        data: dataFiltered.volume.map(el => (1 * el.value) / 1_000_000),
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
    </div>
  )
}
