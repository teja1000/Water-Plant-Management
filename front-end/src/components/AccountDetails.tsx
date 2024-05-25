import React from 'react';

interface Account {
  name: string;
  phoneNumber: string;
  address: string;
  reference?: string;
  costPerCoolCan: number;
  costPerNormalCan: number;
  deposit: number;
  TotalCoolCans: number;
  TotalNormalCans: number;
  PhysicalCans: number;
  TotalDrinkAmount: number;
  createdAt: string;
}

interface AccountDetailsProps {
  account: Account;
}

const AccountDetails: React.FC<AccountDetailsProps> = ({ account }) => {
  return (
    <div className="p-4 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-bold mb-2">{account.name}</h2>
      <p><strong>Phone:</strong> {account.phoneNumber}</p>
      <p><strong>Address:</strong> {account.address}</p>
      <p><strong>Reference:</strong> {account.reference || 'N/A'}</p>
      <p><strong>Cost Per Cool Can:</strong> {account.costPerCoolCan}</p>
      <p><strong>Cost Per Normal Can:</strong> {account.costPerNormalCan}</p>
      <p><strong>Deposit:</strong> {account.deposit}</p>
      <p><strong>Total Cool Cans:</strong> {account.TotalCoolCans}</p>
      <p><strong>Total Normal Cans:</strong> {account.TotalNormalCans}</p>
      <p><strong>Physical Cans:</strong> {account.PhysicalCans}</p>
      <p><strong>Total Drink Amount:</strong> {account.TotalDrinkAmount}</p>
      <p><strong>Account Created At:</strong> {new Date(account.createdAt).toLocaleDateString()}</p>
    </div>
  );
};

export default AccountDetails;


