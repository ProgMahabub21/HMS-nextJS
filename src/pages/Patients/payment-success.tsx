import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

import { axiosInstance } from '../common/axios';


const PaymentSuccessfulPage = () => {
  const router = useRouter();

  useEffect(() => {
    const { cartItems, userId,amount ,sessionId } = router.query;

    if (typeof cartItems === 'string' && typeof userId === 'string') {
      // Parse the cartItems JSON string back to an array of objects 
      const parsedCartItems = JSON.parse(cartItems);
      const refid = sessionId;

      // Log the cartItems and userId
      console.log('Payment Success - Cart Items:', parsedCartItems);
      console.log('Payment Success - User ID:', userId);
      console.log('Transaction Session ID ',refid)
      console.log('Total Transaction Amount ', amount);

      // send the post to paymentrecords api

      const storepayment = async () => {
        try {
          const response = await axiosInstance.post(`/patients/recordpayment/${userId}`, {
            refid,
            amount
          });
          console.log('Payment Records stored successfully:', response.data);
          alert(`Your Transaction ID : ${refid} . Save it for future preference` );
          router.push('/Patients/homepage');
        } catch (error) {
          console.log('Error storing the data:', error);
        }
          
      };
      
      storepayment();

    }
  }, [router, router.query]);

  return (
    <div className="flex items-center justify-center h-screen text-white dark:bg-gray-900">
      <div className="text-center">
        <h1 className="mb-4 text-3xl font-bold">Payment Successful!</h1>
        <p className="text-lg">Thank you for your payment.</p>
        <p className="text-lg">Your order has been successfully processed.</p>
        {/* Additional information or order summary can be displayed here */}
      </div>
    </div>
  );
};

export default PaymentSuccessfulPage;
