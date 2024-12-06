import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Registrar los componentes de Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LiveSensorChart = () => {
  // Estado para los datos del sensor
  const [sensorData, setSensorData] = useState([]);

  // Configuración inicial del gráfico
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "X",
        data: [1,2,3],
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderWidth: 2,
      },
      {
        label: "Y",
        data: [6,54,4],
        borderColor: "rgba(54, 162, 235, 1)",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderWidth: 2,
      },
      {
        label: "Z",
        data: [23,4,1],
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderWidth: 2,
      },
    ],
  });

  // Simular la recepción de datos del sensor (en un proyecto real, esto se reemplaza por una API o WebSocket)
  useEffect(() => {
    const fetchData = () => {
      // Aquí obtendrías los datos del sensor desde tu backend o API
      fetch("http://localhost:3000/api/sensores")
        .then((response) => response.json())
        .then((data) => {
          setSensorData((prev) => {
            // Mantén un número limitado de puntos (por ejemplo, 20)
            const newData = [...prev, data];
            return newData.slice(-20);
          });
        })
        .catch((err) => console.error("Error al obtener datos:", err));
    };

    const interval = setInterval(fetchData, 500); // Actualiza cada 500ms
    return () => clearInterval(interval); // Limpia el intervalo al desmontar el componente
  }, []);

  // Actualiza el gráfico dinámicamente cuando cambian los datos
  useEffect(() => {
    const labels = sensorData.map((_, index) => `Punto ${index + 1}`);
    const xData = sensorData.map((point) => point.x);
    const yData = sensorData.map((point) => point.y);
    const zData = sensorData.map((point) => point.z);

    setChartData({
      labels,
      datasets: [
        { ...chartData.datasets[0], data: xData },
        { ...chartData.datasets[1], data: yData },
        { ...chartData.datasets[2], data: zData },
      ],
    });
  }, [sensorData]);

  // Opciones para el gráfico
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Datos del Sensor en Vivo (X, Y, Z)",
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Tiempo (Puntos)",
        },
      },
      y: {
        title: {
          display: true,
          text: "Valores",
        },
      },
    },
  };

  return( <Line data={chartData} options={options} />)
};

export default LiveSensorChart;
