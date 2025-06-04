import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';

function MisPedidos() {
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);
  const idPersona = localStorage.getItem('idPersona');

  useEffect(() => {
  const fetchPedidos = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/pedidos/${idPersona}`);
      const data = await response.json();
      console.log("Pedidos recibidos:", data); // 👈 REVISA ESTO EN LA CONSOLA

      // Asegura que es un arreglo antes de asignarlo
      if (Array.isArray(data)) {
        setPedidos(data);
      } else {
        console.error("Respuesta inesperada:", data);
        setPedidos([]); // evita que falle el render
      }
    } catch (error) {
      console.error("Error al obtener los pedidos:", error);
    } finally {
      setLoading(false);
    }
  };

  fetchPedidos();
}, [idPersona]);


  if (loading) return <div className="text-white text-center">Cargando pedidos...</div>;
  if (pedidos.length === 0) return <div className="text-white text-center">No tienes pedidos aún.</div>;

  return (
    <div>
      <Navbar />
      <div className="p-4 text-white">
        <h2>Mis Pedidos</h2>
        {pedidos.map(pedido => (
          <div key={pedido.idPedido} className="pedido-card mb-4 p-3 border rounded bg-dark">
            <h4>Pedido #{pedido.idPedido}</h4>
            <p><strong>Fecha:</strong> {new Date(pedido.FechaPedido).toLocaleString()}</p>
            <p><strong>Total:</strong> ${Number(pedido.Total).toFixed(2)}</p>
            <p><strong>Estado:</strong> {pedido.Estado}</p>
            <h5>Detalles:</h5>
            <ul>
              {pedido.detalles.map(item => (
                <li key={item.idDetalle}>
                  <img src={item.ImagenURL} alt={item.Titulo} style={{ width: '200px', marginRight: '10px' }} />
                  {item.Titulo} - {item.Cantidad} x ${item.PrecioUnitario}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MisPedidos;
