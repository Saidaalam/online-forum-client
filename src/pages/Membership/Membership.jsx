import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useState } from 'react';
import Swal from 'sweetalert2';

const MembershipForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [amount, setAmount] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card,
    });

    if (error) {
      console.log('[error]', error);
    } else {
      console.log('[PaymentMethod]', paymentMethod);
      handleMembershipUpgrade();
    }
  };

  const handleMembershipUpgrade = () => {
    Swal.fire({
      icon: 'success',
      title: 'Congratulations!',
      text: 'You are now a member with Gold badge and increased posting limit.',
    });
  };

  return (
    <form onSubmit={handleSubmit} className="m-28 mt-8">
      <CardElement
        options={{
          style: {
            base: {
              fontSize: '20px',
              color: '#424770',
              '::placeholder': {
                color: '#aab7c8',
              },
            },
            invalid: {
              color: '#9e2146',
            },
          },
        }}
      />
      <div className="mb-4 mt-10">
        <label htmlFor="amount" className="block text-lg m-4">Amount (in dollar):</label>
        <input
          type="number"
          id="amount"
          name="amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
      </div>
      <button
        className="btn bg-[#9ACD32] text-white w-24 text-xl mt-10"
        type="submit"
        disabled={!stripe}
      >
        Pay
      </button>
    </form>
  );
};

export default MembershipForm;
