// src/pages/Home.jsx
import React, { useState } from 'react';
import CardCD from '../components/CardCD';

function Home() {
  const [discos] = useState([
    {
      idCD: 1,
      Titulo: 'Álbum 1',
      Artista: 'Artista 1',
      Precio: 199.99,
      ImagenURL: 'https://via.placeholder.com/150/0000FF/FFFFFF?text=CD+1',
    },
    {
      idCD: 2,
      Titulo: 'Álbum 2',
      Artista: 'Artista 2',
      Precio: 149.99,
      ImagenURL: 'https://via.placeholder.com/150/FF0000/FFFFFF?text=CD+2',
    },
    {
      idCD: 3,
      Titulo: 'Álbum 3',
      Artista: 'Artista 3',
      Precio: 129.99,
      ImagenURL: '',
    },
  ]);

  return (
    <div>
      <h1>Catálogo de Discos</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {discos.map(cd => (
          <CardCD key={cd.idCD} cd={cd} />
        ))}
      </div>
    </div>
  );
}

export default Home;
