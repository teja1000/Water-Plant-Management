
import React, { useState } from "react";
import axios from "axios";

interface FormData {
  name: string;
  phoneNumber: string;
  address: string;
  reference?: string;
  costPerCoolCan: number;
  costPerNormalCan: number;
  deposit: number;
}

const Accountform: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    phoneNumber: "",
    address: "",
    reference: "",
    costPerCoolCan: 0,
    costPerNormalCan: 0,
    deposit: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3010/accounts", formData);
      alert("Account created successfully");
    } catch (error) {
      console.error("Error creating account:", error);
      alert("Failed to create account");
    }
  };

  return (
    <div className="flex h-screen flex-col justify-center items-center">
      <form onSubmit={handleSubmit} className="space-y-4 w-3/5 p-4 bg-indigo-200 rounded-lg">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>
        <div>
          <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">Phone Number</label>
          <input
            type="tel"
            name="phoneNumber"
            id="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>
        <div>
          <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
          <input
            type="text"
            name="address"
            id="address"
            value={formData.address}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>
        <div>
          <label htmlFor="reference" className="block text-sm font-medium text-gray-700">Reference</label>
          <input
            type="text"
            name="reference"
            id="reference"
            value={formData.reference}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="costPerCoolCan" className="block text-sm font-medium text-gray-700">Cost Per Cool Can</label>
          <input
            type="number"
            name="costPerCoolCan"
            id="costPerCoolCan"
            value={formData.costPerCoolCan}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>
        <div>
          <label htmlFor="costPerNormalCan" className="block text-sm font-medium text-gray-700">Cost Per Normal Can</label>
          <input
            type="number"
            name="costPerNormalCan"
            id="costPerNormalCan"
            value={formData.costPerNormalCan}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>
        <div>
          <label htmlFor="deposit" className="block text-sm font-medium text-gray-700">Deposit</label>
          <input
            type="number"
            name="deposit"
            id="deposit"
            value={formData.deposit}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>
        <div>
          <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Accountform;

