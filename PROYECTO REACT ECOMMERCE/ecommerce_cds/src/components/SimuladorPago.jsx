function SimuladorPago({ total, onPagoExitoso }) {
  const procesarPago = () => {
    // Simular un pequeño delay de procesamiento
    setTimeout(() => {
      alert(`✅ Pago simulado exitosamente por $${total.toFixed(2)} MXN`);
      onPagoExitoso(); // Llama a una función que guarde el pedido
    }, 1000);
  };

  return (
    <div style={{ marginTop: '20px' }}>
      <button onClick={procesarPago} style={{
        padding: '10px 20px',
        backgroundColor: '#0070f3',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer'
      }}>
        Simular pago seguro 💳
      </button>
    </div>
  );
}

export default SimuladorPago;
