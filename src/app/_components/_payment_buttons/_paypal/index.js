// components/PaypalButton.js
import { Button } from '@mui/joy';
import React, { useEffect, useState } from 'react';

const PaypalButton = ({ amount, artistId, handleSuccess, handleFailure }) => {
  
  const [isScriptLoading, setIsScriptLoading] = useState(true); // State to track loading status

  useEffect(() => {
    const script = document.createElement('script');
    script.src = `https://www.paypal.com/sdk/js?client-id=AaqE55Tbfg1fpeOKnzI3U4aoRzMH1_Hvw-3wruPs-eQ1ICvFPBy3s3Ew72vzw7TpL43aunMAzvfHf88c&currency=USD`;
    script.async = true;
    script.onload = () => {
      setIsScriptLoading(false)
      window.paypal.Buttons({
        createOrder: (data, actions) => {
          // Send amount and artist ID to the backend to create the PayPal order
          return fetch('/api/payment-integration/paypal/create-order', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ amount, artistId }), // Include artistId in the request
          })
            .then((res) => res.json())
            .then((orderData) => {
              return orderData.id; // Return the PayPal order ID
            });
        },
        onApprove: (data, actions) => {
          // Capture the payment after user approval
          return fetch('/api/payment-integration/paypal/capture-order', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ orderId: data.orderID, artistId }), // Include artistId in capture request
          })
            .then((res) => res.json())
            .then((captureData) => {
              handleSuccess()
              // Optionally, process further actions on success
            });
        },
        onError: (err) => {
          handleFailure()
        },
      }).render('#paypal-button-container');
    };
    document.body.appendChild(script);
  }, [amount, artistId]);

  return( 
    <>
      {
        isScriptLoading ? (
          <Button loading fullWidth ></Button>
        ): ''
      }
      <div id="paypal-button-container"></div>
    </>
  );
};

export default PaypalButton;