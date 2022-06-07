import { useEffect, useState } from "react"
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

export const Chart = ({ dataChart }) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [dates, setDates] = useState([])

  const [values, setValues] = useState([])

  useEffect(() => {
    if (dataChart !== null) {
      console.log(dataChart)
      setDates(dataChart.map(d => d.date))
      setValues(dataChart.map(d => 1 * d.value))
      console.log(dates, values)
      setIsLoaded(true)
    }
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

            const labelWithoutExtension = label
              .split(" ")
              .slice(0, -1)
              .join(" ")

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
              else if (labelStartWith === "level")
                return `${labelWithoutExtension} : ${context.parsed.y.toFixed(
                  3
                )}`
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

  // const datasetFSV = [
  //   {
  //     label: "Filling rate %",
  //     data: dataFiltered.fillingRate.map(el => 1 * el.value),
  //     borderColor: "rgb(255, 99, 132)",
  //     backgroundColor: "rgba(255, 99, 132, 0.5)",
  //   },
  //   {
  //     label: "Surface hm²",
  //     data: dataFiltered.surface.map(el => (1 * el.value) / 10_000),
  //     borderColor: "rgb(53, 162, 235)",
  //     backgroundColor: "rgba(53, 162, 235, 0.5)",
  //   },
  //   {
  //     label: "Volume hm³",
  //     data: dataFiltered.volume.map(el => (1 * el.value) / 1_000_000),
  //     borderColor: "rgb(127, 255, 0)",
  //     backgroundColor: "rgba(127, 255, 0, 0.5)",
  //   },
  // ]

  const data = {
    labels: dates,
    datasets: {
      label: "Filling rate %",
      data: values,
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
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
      {!isLoaded ? (
        <div>Loading...</div>
      ) : (
        <Line options={options} data={data} />
      )}
    </div>
  )
}
