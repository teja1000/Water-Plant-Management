import Header from "../components/Header"

import { useEffect, useState } from 'react';
import axios from 'axios';

interface TransactionData {
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
  startDate: string;
  endDate: string;
}

const Transactions = () => {
  const [transactions, setTransactions] = useState<TransactionData[]>([]);
  const [selectedTransaction, setSelectedTransaction] = useState<TransactionData | null>(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get('http://localhost:3010/transactions');
        console.log('Fetched transaction data:', response.data);
        setTransactions(response.data);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };

    fetchTransactions();
  }, []);

  const handleViewDetails = (transaction: TransactionData) => {
    setSelectedTransaction(transaction);
  };

  const handleCloseDialog = () => {
    setSelectedTransaction(null);
  };

  return (
    <div>
      <Header/>
    <div className="w-full p-8 bg-gray-100">
      <div className="flex flex-wrap justify-center">
        {transactions.map(transaction => (
          <div key={transaction._id} className="w-1/4 p-4">
            <div className="p-4 bg-white shadow-lg rounded-lg">
              <p className="text-lg font-bold mb-2">{transaction.name}</p>
              <p className="mb-1"><strong>Start Date:</strong> {new Date(transaction.startDate).toLocaleDateString()}</p>
              <p className="mb-1"><strong>End Date:</strong> {new Date(transaction.endDate).toLocaleDateString()}</p>
              <p className="mb-1"><strong>Bill:</strong> {(transaction.numberOfCans + transaction.addedCans + transaction.refilledCans) * transaction.costPerCan}</p>
              <button
                onClick={() => handleViewDetails(transaction)}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedTransaction && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
            <h3 className="text-xl font-bold mb-4">Transaction Details</h3>
            <p><strong>Name:</strong> {selectedTransaction.name}</p>
            <p><strong>Phone Number:</strong> {selectedTransaction.phoneNumber}</p>
            <p><strong>Address:</strong> {selectedTransaction.address}</p>
            <p><strong>Reference:</strong> {selectedTransaction.reference || 'N/A'}</p>
            <p><strong>Number of Cans:</strong> {selectedTransaction.numberOfCans + selectedTransaction.addedCans}</p>
            <p><strong>Cost Per Can:</strong> {selectedTransaction.costPerCan}</p>
            <p><strong>Deposit:</strong> {selectedTransaction.deposit}</p>
            <p><strong>Bill:</strong> {(selectedTransaction.numberOfCans + selectedTransaction.addedCans + selectedTransaction.refilledCans) * selectedTransaction.costPerCan}</p>
            <p><strong>Refilled Cans:</strong> {selectedTransaction.refilledCans}</p>
            <p><strong>Returned Cans:</strong> {selectedTransaction.returnedCans}</p>
            <p><strong>Start Date:</strong> {new Date(selectedTransaction.startDate).toLocaleDateString()}</p>
            <p><strong>End Date:</strong> {new Date(selectedTransaction.endDate).toLocaleDateString()}</p>
            <button
              onClick={handleCloseDialog}
              className="mt-4 px-4 py-2 bg-red-600 text-white rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
    </div>
  );
};

export default Transactions;
