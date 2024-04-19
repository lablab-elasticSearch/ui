import React, { useEffect, useRef } from "react";
import { Bar, Line } from "react-chartjs-2";
import "chart.js/auto";

const PlotComponent = ({ plot }) => {
  const chartRef = useRef(null);
  if (!plot) return null;
  console.log(plot);

  let chartComponent;
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: plot.title || 'Chart Title'
      }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: plot.xlabel || 'X-Axis'
        }
      },
      y: {
        title: {
          display: true,
          text: plot.ylabel || 'Y-Axis'
        }
      }
    }
  };

  if (plot.type === "line") {
    const data = {
      labels: plot.x, // Treat x as labels (categorical)
      datasets: [
        {
          label: plot.legend,
          data: plot.y,
          fill: false,
          borderColor: "rgb(75, 192, 192)",
          tension: 0.1,
        },
      ],
    };
    chartComponent = <Line data={data} options={options} height={300} width={600} />; // Set height and width
  } else if (plot.type === "bar") {
    const data = {
      labels: plot.x,
      datasets: [
        {
          data: plot.y,
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
          ],
          borderWidth: 1,
        },
      ],
    };
    chartComponent = <Bar ref={chartRef} data={data} options={options} height={400} width={600} />; // Set height and width
  }

  return <div>{chartComponent}</div>;
};

export default PlotComponent;