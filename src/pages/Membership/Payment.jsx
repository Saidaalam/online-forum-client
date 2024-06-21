
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Membership from "./Membership";

const stripePromise = loadStripe('pk_test_51PScc5Rr6WlAikJASOklyWtQzo1l6kl13hitF1919Z1snWmNNb6bDjJpDLxW3SZr8ERUeMSWbCPUYJIV4MgBCmRR00EiXBn7M6');

const Payment = () => {
  if (!import.meta.env.VITE_Payment_Gateway_PK) {
    console.error("Stripe publishable key is missing");
  }

  return (
    <div>
      <h2 className="text-4xl text-center">Payment</h2>
      <div>
        <Elements stripe={stripePromise}>
          <Membership />
        </Elements>
      </div>
    </div>
  );
};

export default Payment;
