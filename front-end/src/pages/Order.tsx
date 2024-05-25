import React, { useState, useEffect } from 'react';
import OrderForm from "../components/Orderform";
import Header from "../components/Header";
import Button from "../components/button";
import axios from 'axios';
import Orderlogs from "../components/Orderlogs";

interface FormData {
  name: string;
  phoneNumber: string;
  address: string;
  numberOfCans: number;
  numberOfDrums: number;
  advance: number;
  dateOfDelivery: string;
  time: string;
  vehicle: boolean;
}

const Order = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phoneNumber: '',
    address: '',
    numberOfCans: 0,
    numberOfDrums: 0,
    advance: 0,
    dateOfDelivery: '',
    time: '',
    vehicle: false
  });

  const [show, setShow] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const showing = () => {
    setShow(!show);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = event.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    console.log('Form Data Submitted:', formData);
  };

  useEffect(() => {
    const sendFormDataToBackend = async () => {
      if (isSubmitting) {
        try {
          const response = await axios.post('http://localhost:3010/orders', formData, {
            headers: {
              'Content-Type': 'application/json'
            }
          });

          console.log('Success:', response.data);
        } catch (error) {
          console.error('Error:', error);
        } finally {
          setIsSubmitting(false);
        }
      }
    };

    sendFormDataToBackend();
  }, [isSubmitting, formData]);

  return (
    <div>
      <Header />
      <Button name={show ? "orders" : "New"} display={showing} />
      {show && (
        <OrderForm
          formData={formData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
      )}
      {!show && <Orderlogs />}
    </div>
  );
};

export default Order;



