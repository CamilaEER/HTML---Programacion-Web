import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import './checkout.css'; // 👈 Asegúrate de que este archivo existe

function Checkout() {
  const [carrito, setCarrito] = useState([]);
  const [idPersona, setIdPersona] = useState(null);

  // Datos del formulario
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [direccion, setDireccion] = useState('');
  const [ciudad, setCiudad] = useState('');
  const [codigoPostal, setCodigoPostal] = useState('');
  const [metodoPago, setMetodoPago] = useState('tarjeta');

  useEffect(() => {
    const carritoGuardado = JSON.parse(localStorage.getItem('carrito')) || [];
    setCarrito(carritoGuardado);

    const idGuardado = localStorage.getItem('idPersona');
    if (idGuardado) {
      setIdPersona(parseInt(idGuardado));
    }
  }, []);

  const total = carrito.reduce((sum, cd) => sum + parseFloat(cd.Precio), 0);

  const realizarPago = async () => {
    if (!nombre || !direccion || !codigoPostal) {
      Swal.fire('Campos incompletos', 'Por favor llena todos los campos', 'warning');
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/pedido', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          idPersona,
          total,
          items: carrito.map(cd => ({
            idCD: cd.idCD,
            cantidad: 1,
            precio: parseFloat(cd.Precio)
          }))
        })
      });

      if (res.ok) {
        Swal.fire('✅ ¡Pago exitoso!', 'Tu pedido ha sido registrado', 'success');
        localStorage.removeItem('carrito');
        setCarrito([]);
      } else {
        Swal.fire('❌ Error', 'No se pudo registrar el pedido', 'error');
      }
    } catch (err) {
      console.error(err);
      Swal.fire('❌ Error', 'Fallo al conectar con el servidor', 'error');
    }
  };

  return (
    <div className="checkout-container">
      <h2>Finalizar compra</h2>
      <div className="row">
        <div className="col-md-6">
          <form className="checkout-form">
            <div className="mb-3">
              <label className="form-label">Nombre completo</label>
              <input type="text" className="form-control" value={nombre} onChange={(e) => setNombre(e.target.value)} />
            </div>
            <div className="mb-3">
              <label className="form-label">Dirección</label>
              <input type="text" className="form-control" value={direccion} onChange={(e) => setDireccion(e.target.value)} />
            </div>
            <div className="mb-3">
              <label className="form-label">Código postal</label>
              <input type="text" className="form-control" value={codigoPostal} onChange={(e) => setCodigoPostal(e.target.value)} />
            </div>
            <div className="mb-3">
              <label className="form-label">Método de pago</label>
              <select className="form-select" value={metodoPago} onChange={(e) => setMetodoPago(e.target.value)}>
                <option value="tarjeta">Tarjeta de crédito/débito</option>
                <option value="paypal">PayPal</option>
                <option value="oxxo">OXXO</option>
              </select>
            </div>
            <div className="mb-3">
              <strong>Total a pagar: ${total.toFixed(2)} MXN</strong>
            </div>
            <button type="button" className="btn btn-success" onClick={realizarPago}>
              Pagar ahora
            </button>
          </form>
        </div>

        <div className="col-md-6">
          <div className="checkout-resumen">
            <h5>Resumen del carrito</h5>
            {carrito.map(cd => (
              <div key={cd.idCD}>
                <strong>{cd.Titulo}</strong><br />
                <small>{cd.ArtistaNombre}</small><br />
                ${parseFloat(cd.Precio).toFixed(2)}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
