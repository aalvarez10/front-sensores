import { useEffect, useRef, useState } from "react";
import Example from "./Barchar";

//import Example3D from "./ploti";

const MAX_POINTS = 40;

const App = () => {
  const [sensorData, setSensorData] = useState([]);
  const audioRef = useRef(null);

  useEffect(() => {
    audioRef.current = new Audio("ruta-del-sonido.mp3");
  }, []);

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8080");

    socket.onopen = () => {
      console.log("Conectado al servidor WebSocket");
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log(data.ay);
      if (parseFloat(data.ay) > 3 || parseFloat(data.ay) < -3 ) {
        /* const audio = new Audio();
        audio.src = 'pacman-dies.mp3';
        audio.load();
        audio.play();
        alert("Se cayo"); */
        audioRef.current.play().catch((error) => {
          console.error("Error al reproducir el sonido:", error);
        });
      }
      const newData = {
        ax: parseFloat(data.ax),
        ay: parseFloat(data.ay),
        az: parseFloat(data.az),
      };

      handleNewData(newData);
    };

    socket.onerror = (error) => {
      console.error("Error en WebSocket:", error);
    };

    socket.onclose = () => {
      console.log("Conexión WebSocket cerrada");
    };

    return () => {
      socket.close();
    };
  }, []);

  const handleNewData = (newData) => {
    setSensorData((prevData) => {
      const newEntry = {
        x: newData.ax,
        y: newData.ay,
        z: newData.az,
        type: "surface", // Tipo de gráfico
        colorscale: "Viridis",
      };
      const updatedData = [...prevData, newEntry];
      if (updatedData.length > MAX_POINTS) {
        updatedData.shift();
      }

      return updatedData;
    });
  };

  return (
    <div className="containerGnr">
      <h1>Gráfica en Vivo de Datos del Sensores</h1>
      <audio ref={audioRef} src="/pacman-dies.mp3" preload="auto"></audio>
      <Example data={sensorData} />
      {/* <Example3D data={sensorData}/> */}
    </div>
  );
};

export default App;
