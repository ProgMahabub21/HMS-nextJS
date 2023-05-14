import React from 'react';

const PaymentCancelPage = () => {
  return (
    <div className="flex items-center justify-center h-screen text-white dark:bg-gray-900">
      <div className="text-center">
        <h1 className="mb-4 text-3xl font-bold">Payment Cancelled</h1>
        <p className="text-lg">Your payment has been cancelled.</p>
        <p className="text-lg">Please try again or contact support for assistance.</p>
      </div>
    </div>
  );
};

export default PaymentCancelPage;
