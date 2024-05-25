import Customerform from "../components/Customerform"
import { useState,useEffect} from "react";
import Header from "../components/Header";
import Button from "../components/button";
import axios from 'axios';
import CustomerLogs from "../components/Customerlogs";

interface FormData {
  name: string;
  phoneNumber: string;
  address: string;
  reference?: string;  
  numberOfCans: number;
  costPerCan: number;
  deposit: number;
}

const Logbook=()=>{

  const [show, setShow] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const showing = () => {
    setShow(!show);
  };

  const [formdata, setFormData] = useState<FormData>({
    name: '',
    phoneNumber: '',
    address: '',
    reference: '',
    numberOfCans: 0,
    costPerCan: 0,
    deposit: 0
  });

  
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
    setShow(!show)
    console.log('Submitting form data:', formdata);}
  
    useEffect(() => {
      const sendFormDataToBackend = async () => {
        if (isSubmitting) {
          try {
            const response = await axios.post('http://localhost:3010/customers', formdata, {
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
    }, [isSubmitting, formdata]);
  
  return(
    <div>
      <Header/>
      <Button name={show ? "Logs" : "New"} display={showing} />
       {show && <Customerform 
        formData={formdata}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />}
      {
        !show && <CustomerLogs/>
      }
    </div>
  )
}

export default Logbook