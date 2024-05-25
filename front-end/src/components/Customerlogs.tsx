import { useEffect, useState } from 'react';
import axios from 'axios';

interface FormData {
  _id: string;
  name: string;
  phoneNumber: string;
  address: string;
  reference?: string;
  numberOfCans: number;
  costPerCan: number;
  deposit: number;
  addedCans: number;
  refilledCans: number;
  returnedCans: number;
  createdAt: string; 
}

const CustomerLogs = () => {
  const [customers, setCustomers] = useState<FormData[]>([]);
  const [returnCansInput, setReturnCansInput] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get('http://localhost:3010/customers');
        console.log('Fetched customer data:', response.data);
        setCustomers(response.data);
      } catch (error) {
        console.error('Error fetching customers:', error);
      }
    };

    fetchCustomers();
  }, []);

  const handleAddCan = (id: string) => {
    setCustomers(customers.map(customer =>
      customer._id === id ? { ...customer, addedCans: customer.addedCans + 1 } : customer
    ));
  };

  const handleRefill = (id: string) => {
    setCustomers(customers.map(customer =>
      customer._id === id ? { ...customer, refilledCans: customer.refilledCans + 1 } : customer
    ));
  };

  const handleReturnCans = (id: string) => {
    const returnedCans = returnCansInput[id] || 0;
    setCustomers(customers.map(customer =>
      customer._id === id ? { ...customer, returnedCans: customer.returnedCans + returnedCans } : customer
    ));
    setReturnCansInput({ ...returnCansInput, [id]: 0 });
  };

  const handleReturnCansInputChange = (id: string, value: number) => {
    setReturnCansInput({ ...returnCansInput, [id]: value });
  };

  const handleSettle = async (id: string) => {
    const customer = customers.find(c => c._id === id);
    if (customer && (customer.numberOfCans + customer.addedCans) === customer.returnedCans) {
      const settlementData = {
        name: customer.name,
        phoneNumber: customer.phoneNumber,
        address: customer.address,
        reference: customer.reference,
        numberOfCans: customer.numberOfCans,
        costPerCan: customer.costPerCan,
        deposit: customer.deposit,
        addedCans: customer.addedCans,
        refilledCans: customer.refilledCans,
        returnedCans: customer.returnedCans,
        createdAt: customer.createdAt 
      };

      try {
        await axios.post(`http://localhost:3010/customers/settle/${id}`, settlementData);
        setCustomers(customers.filter(customer => customer._id !== id));
      } catch (error) {
        console.error('Error settling customer:', error);
      }
    } else {
      alert("Cannot settle. The number of cans and returned cans must be equal.");
    }
  };

  const calculateBill = (customer: FormData) => {
    const totalCans = customer.numberOfCans + customer.addedCans + customer.refilledCans;
    return totalCans * customer.costPerCan;
  };

  return (
    <div className="w-full flex flex-wrap justify-center p-8 bg-gray-100">
      {customers.map(customer => (
        <div key={customer._id} className="w-1/3 p-4">
          <div className="p-4 bg-white shadow-lg rounded-lg">
            <h3 className="text-lg font-bold mb-2">{customer.name}</h3>
            <p className="text-sm text-gray-500 mb-2">{new Date(customer.createdAt).toLocaleDateString()}</p> {/* Display creation date */}
            <p className="mb-1"><strong>Phone:</strong> {customer.phoneNumber}</p>
            <p className="mb-1"><strong>Address:</strong> {customer.address}</p>
            <p className="mb-1"><strong>Reference:</strong> {customer.reference || 'N/A'}</p>
            <p className="mb-2"><strong>Number of Cans:</strong> {customer.numberOfCans + customer.addedCans}</p>
            <button onClick={() => handleAddCan(customer._id)} className="mt-4 px-4 py-2 bg-green-600 text-white rounded">Add Can</button>
            <p className="mb-2"><strong>Cost Per Can:</strong> {customer.costPerCan}</p>
            <button onClick={() => handleRefill(customer._id)} className="mt-4 px-4 py-2 bg-cyan-500 text-white rounded">Refill</button>
            <p className="mb-1"><strong>Deposit:</strong> {customer.deposit}</p>
            <p className="mb-1"><strong>Bill:</strong> {calculateBill(customer)}</p>
            <p className="mb-1"><strong>Refilled Cans:</strong> {customer.refilledCans}</p>
            <p className="mb-1"><strong>Returned Cans:</strong> {customer.returnedCans}</p>
            <div className="flex items-center mt-2">
              <input
                type="number"
                value={returnCansInput[customer._id] || 0}
                onChange={(e) => handleReturnCansInputChange(customer._id, parseInt(e.target.value) || 0)}
                className="block w-2/3 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              <button
                onClick={() => handleReturnCans(customer._id)}
                className="ml-2 px-4 py-2 bg-orange-500 text-white rounded"
                disabled={(returnCansInput[customer._id] || 0) + customer.returnedCans > (customer.numberOfCans + customer.addedCans)}
              >
                Return Can
              </button>
            </div>
            <button
              onClick={() => handleSettle(customer._id)}
              className="mt-4 px-4 py-2 bg-red-600 text-white rounded"
              disabled={(customer.numberOfCans + customer.addedCans) !== customer.returnedCans}
            >
              Settle
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CustomerLogs;







