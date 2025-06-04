import React, { useEffect, useState } from 'react';  // Importa React, useState y useEffect para manejar el estado y efectos
import Swal from 'sweetalert2';  // Importa SweetAlert2 para mostrar alertas bonitas
import './checkout.css';  // Asegúrate de que este archivo existe con los estilos correspondientes

// Componente de Checkout para realizar la compra
function Checkout() {
  // Estado para almacenar el carrito, el id de la persona, y los datos del formulario
  const [carrito, setCarrito] = useState([]);  // Carrito de productos almacenados en el localStorage
  const [idPersona, setIdPersona] = useState(null);  // ID de la persona (usuario) que está realizando la compra

  // Datos del formulario
  const [nombre, setNombre] = useState('');  // Nombre del usuario
  const [direccion, setDireccion] = useState('');  // Dirección de envío
  const [codigoPostal, setCodigoPostal] = useState('');  // Código postal del usuario
  const [metodoPago, setMetodoPago] = useState('tarjeta');  // Método de pago seleccionado (por defecto tarjeta)

  // useEffect para cargar el carrito y el id de persona desde localStorage
  useEffect(() => {
    const carritoGuardado = JSON.parse(localStorage.getItem('carrito')) || [];
    setCarrito(carritoGuardado);

    const idGuardado = localStorage.getItem('idPersona');
    if (idGuardado) {
      setIdPersona(parseInt(idGuardado));  // Establecer el id de la persona si está en localStorage
    }
  }, []);  // El efecto se ejecuta solo una vez cuando el componente se monta

  // Calcular el total del carrito sumando los precios de todos los CDs
  const total = carrito.reduce((sum, cd) => sum + parseFloat(cd.Precio), 0);

  // Función para realizar el pago (envío de los datos del pedido al servidor)
  const realizarPago = async () => {
    if (!nombre || !direccion || !codigoPostal) {  // Validar que los campos no estén vacíos
      Swal.fire('Campos incompletos', 'Por favor llena todos los campos', 'warning');
      return;
    }

    try {
      // Realizar una solicitud POST al servidor para registrar el pedido
      const res = await fetch('http://localhost:5000/pedido', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          idPersona,  // ID de la persona que hace el pedido
          total,  // Total de la compra
          items: carrito.map(cd => ({
            idCD: cd.idCD,  // ID del CD
            cantidad: 1,  // Establecer cantidad a 1 (en este caso, 1 por cada CD)
            precio: parseFloat(cd.Precio)  // Precio del CD
          }))
        })
      });

      // Si la respuesta del servidor es exitosa, mostrar alerta y limpiar el carrito
      if (res.ok) {
        Swal.fire('✅ ¡Pago exitoso!', 'Tu pedido ha sido registrado', 'success');
        localStorage.removeItem('carrito');  // Limpiar el carrito en el localStorage
        setCarrito([]);  // Limpiar el estado del carrito
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
      <h2>Finalizar compra</h2>  {/* Título de la página de checkout */}
      
      <div className="row">
        <div className="col-md-6">
          {/* Formulario de checkout */}
          <form className="checkout-form">
            <div className="mb-3">
              <label className="form-label">Nombre completo</label>
              <input
                type="text"
                className="form-control"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}  // Actualizar el estado del nombre
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Dirección</label>
              <input
                type="text"
                className="form-control"
                value={direccion}
                onChange={(e) => setDireccion(e.target.value)}  // Actualizar el estado de la dirección
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Código postal</label>
              <input
                type="text"
                className="form-control"
                value={codigoPostal}
                onChange={(e) => setCodigoPostal(e.target.value)}  // Actualizar el estado del código postal
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Método de pago</label>
              <select
                className="form-select"
                value={metodoPago}
                onChange={(e) => setMetodoPago(e.target.value)}  // Actualizar el estado del método de pago
              >
                <option value="tarjeta">Tarjeta de crédito/débito</option>
                <option value="paypal">PayPal</option>
                <option value="oxxo">OXXO</option>
              </select>
            </div>
            <div className="mb-3">
              <strong>Total a pagar: ${total.toFixed(2)} MXN</strong>  {/* Mostrar el total calculado */}
            </div>
            <button
              type="button"
              className="btn btn-success"
              onClick={realizarPago}  // Llamar a la función realizarPago al hacer clic
            >
              Pagar ahora
            </button>
          </form>
        </div>

        <div className="col-md-6">
          {/* Resumen del carrito de compras */}
          <div className="checkout-resumen">
            <h5>Resumen del carrito</h5>
            {carrito.map(cd => (
              <div key={cd.idCD}>
                <strong>{cd.Titulo}</strong><br />
                <small>{cd.ArtistaNombre}</small><br />
                ${parseFloat(cd.Precio).toFixed(2)}  {/* Mostrar el precio de cada CD */}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;  // Exportar el componente para que pueda ser utilizado en otras partes de la app
