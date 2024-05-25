import { useEffect, useState } from 'react';
import axios from 'axios';

interface Order {
  _id: string; // MongoDB ObjectId is a string
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

const Orderlogs = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:3010/orders'); 
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`http://localhost:3010/orders/${id}`); 
  
      setOrders(orders.filter(order => order._id !== id));
    } catch (error) {
      console.error('Error deleting order:', error);
    }
  };

  return (
    <div className="w-full flex flex-wrap justify-center p-8 bg-gray-100">
      {orders.map(order => (
        <div key={order._id} className="w-1/3 p-4">
          <div className="p-4 bg-white shadow-lg rounded-lg">
            <h3 className="text-lg font-bold mb-2">{order.name}</h3>
            <p className="mb-1"><strong>Phone:</strong> {order.phoneNumber}</p>
            <p className="mb-1"><strong>Address:</strong> {order.address}</p>
            <p className="mb-1"><strong>Number of Cans:</strong> {order.numberOfCans}</p>
            <p className="mb-1"><strong>Number of Drums:</strong> {order.numberOfDrums}</p>
            <p className="mb-1"><strong>Advance:</strong> {order.advance}</p>
            <p className="mb-1"><strong>Date of Delivery:</strong> {new Date(order.dateOfDelivery).toLocaleDateString()}</p>
            <p className="mb-1"><strong>Time:</strong> {order.time}</p>
            <p className="mb-1"><strong>Vehicle Needed:</strong> {order.vehicle ? 'Yes' : 'No'}</p>
            <button
              onClick={() => handleDelete(order._id)}
              className="mt-4 px-4 py-2 bg-red-600 text-white rounded"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Orderlogs;
