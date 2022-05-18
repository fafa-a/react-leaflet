import React from "react"
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
  console.log(labels.length)

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
        label: "Taux remplissage %",
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
