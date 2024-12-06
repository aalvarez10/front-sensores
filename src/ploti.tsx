import React from 'react';
import Plot from 'react-plotly.js';

const ExampleWaves = ({data}) => {
  // Crear datos para las ondas
  const x = Array.from({ length: 50 }, (_, i) => i); // Eje X
  const y = Array.from({ length: 50 }, (_, i) => i); // Eje Y

  // Generar datos Z como ondas
  const z = y.map((yi) =>
    x.map((xi) => Math.sin(xi / 5) * Math.cos(yi / 5)) // Función de ondas
  );

  return (
    <Plot
      data={[
        {
          z, // Datos Z
          x, // Datos X
          y, // Datos Y
          type: 'surface', // Tipo de gráfico
          colorscale: 'Viridis', // Paleta de colores
        },
      ]}
      layout={{
        title: 'Ondas 3D',
        scene: {
          xaxis: { title: 'Eje X' },
          yaxis: { title: 'Eje Y' },
          zaxis: { title: 'Eje Z' },
        },
        autosize: true,
      }}
      style={{ width: '100%', height: '500px' }}
    />
  );
};

export default ExampleWaves;
