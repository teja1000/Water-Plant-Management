import React from 'react';


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


interface OrderFormProps {
  formData: FormData;
  handleChange: (event: React.ChangeEvent<HTMLInputElement | HTMLInputElement>) => void;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}


const OrderForm: React.FC<OrderFormProps> = ({ formData, handleChange, handleSubmit }) => {
  return (
    <div className="flex h-screen flex-col justify-center items-center mt-8">
      <form onSubmit={handleSubmit} className="space-y-4 w-1/5 p-4 bg-indigo-200 rounded-lg">
        <InputField label="Name" name="name" type="text" value={formData.name} handleChange={handleChange} />
        <InputField label="Phone Number" name="phoneNumber" type="tel" value={formData.phoneNumber} handleChange={handleChange} />
        <InputField label="Address" name="address" type="text" value={formData.address} handleChange={handleChange} />
        <InputField label="Number of Cans" name="numberOfCans" type="number" value={formData.numberOfCans} handleChange={handleChange} />
        <InputField label="Number of Drums" name="numberOfDrums" type="number" value={formData.numberOfDrums} handleChange={handleChange} />
        <InputField label="Advance" name="advance" type="number" value={formData.advance} handleChange={handleChange} />
        <InputField label="Date of Delivery" name="dateOfDelivery" type="date" value={formData.dateOfDelivery} handleChange={handleChange} />
        <InputField label="Time" name="time" type="time" value={formData.time} handleChange={handleChange} />

        <div className="flex items-center">
          <input
            type="checkbox"
            name="vehicle"
            id="vehicle"
            checked={formData.vehicle}
            onChange={handleChange}
            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
          />
          <label htmlFor="vehicle" className="ml-2 block text-sm font-medium text-gray-700">Need Vehicle</label>
        </div>

        <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          Submit
        </button>
      </form>
    </div>
  );
};


interface InputFieldProps {
  label: string;
  name: string;
  type: string;
  value: string | number;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}


const InputField: React.FC<InputFieldProps> = ({ label, name, type, value, handleChange }) => {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">{label}</label>
      <input
        type={type}
        name={name}
        id={name}
        value={value}
        onChange={handleChange}
        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        required
      />
    </div>
  );
};

export default OrderForm;
