import { useEffect, useRef } from 'react';

function PaypalCheckoutButton({ total }) {
  const paypalRef = useRef();

  useEffect(() => {
    if (window.paypal) {
      window.paypal.Buttons({
        createOrder: (data, actions) => {
          return actions.order.create({
            purchase_units: [{
              amount: {
                value: total.toFixed(2)
              }
            }]
          });
        },
        onApprove: (data, actions) => {
          return actions.order.capture().then(details => {
            alert(`Pago completado por ${details.payer.name.given_name}`);
            // Aquí podrías guardar el pedido en la base de datos
          });
        },
        onError: err => {
          console.error('Error en el pago:', err);
          alert('Hubo un error al procesar el pago.');
        }
      }).render(paypalRef.current);
    }
  }, [total]);

  return <div ref={paypalRef}></div>;
}

export default PaypalCheckoutButton;
