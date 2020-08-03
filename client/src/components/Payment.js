import React from 'react';
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";

const promise = loadStripe("pk_test_TYooMQauvdEDq54NiTphI7jx");

export default function Payment() {
    return (
       <div className="payment-page">
          <Elements stripe={promise}>
              <CheckoutForm />
          </Elements>
       </div>
    );
}