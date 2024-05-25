import { useState, useEffect } from "react";
import axios from "axios";
import Accountform from "../components/Accountform";
import Button from "../components/button";
import Header from "../components/Header";
import AccountDetails from "../components/AccountDetails";

interface Account {
  _id: string;
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

interface PresentDayLog {
  Date: string;
  Bill: number;
  RefilledCans: number;
  ReturnedCans: number;
  NumberofCoolCans: number;
  NumberofNormalCans: number;
  DrinksAmount: number;
}

interface PreviousDayLog {
  Date: string;
  Bill: number;
  CoolingCans: number;
  NormalCans: number;
  DrinkAmount: number;
}

const Accounts = () => {
  const [showForm, setShowForm] = useState(false);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);
  const [presentDayLog, setPresentDayLog] = useState<PresentDayLog | null>(null);
  const [previousDayLogs, setPreviousDayLogs] = useState<PreviousDayLog[]>([]);
  const [totalLog, setTotalLog] = useState({ totalBill: 0, totalCoolingCans: 0, totalNormalCans: 0, totalDrinkAmount: 0 });

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await axios.get("http://localhost:3010/accounts");
        setAccounts(response.data);
      } catch (error) {
        console.error("Error fetching accounts:", error);
      }
    };

    fetchAccounts();
  }, []);

  useEffect(() => {
    const fetchLogs = async () => {
      if (selectedAccount) {
        try {
          const presentDayResponse = await axios.get(`http://localhost:3010/accounts/${selectedAccount._id}/present-day-log`);
          setPresentDayLog(presentDayResponse.data);

          const previousDayResponse = await axios.get(`http://localhost:3010/accounts/${selectedAccount._id}/previous-day-log`);
          const previousLogs = previousDayResponse.data;
          setPreviousDayLogs(previousLogs);

          const totalBill = previousLogs.reduce((acc: number, log: PreviousDayLog) => acc + log.Bill, 0);
          const totalCoolingCans = previousLogs.reduce((acc: number, log: PreviousDayLog) => acc + log.CoolingCans, 0);
          const totalNormalCans = previousLogs.reduce((acc: number, log: PreviousDayLog) => acc + log.NormalCans, 0);
          const totalDrinkAmount = previousLogs.reduce((acc: number, log: PreviousDayLog) => acc + log.DrinkAmount, 0);

          setTotalLog({ totalBill, totalCoolingCans, totalNormalCans, totalDrinkAmount });
        } catch (error) {
          console.error("Error fetching logs:", error);
        }
      }
    };

    fetchLogs();
  }, [selectedAccount]);

  const handleAccountClick = (account: Account) => {
    setSelectedAccount(account);
  };

  const handlePresentDayLogChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPresentDayLog((prev) => prev ? { ...prev, [name]: Number(value) } : null);
  };

  const handlePresentDayLogSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (selectedAccount && presentDayLog) {
      try {
        await axios.post(`http://localhost:3010/accounts/${selectedAccount._id}/present-day-log`, presentDayLog);
        alert("Present day log updated successfully");
      } catch (error) {
        console.error("Error updating present day log:", error);
        alert("Failed to update present day log");
      }
    }
  };

  return (
    <div>
      <Header />
      <div className="flex">
        <div className="w-1/4 p-4 bg-gray-200">
          <Button name={showForm ? "accounts" : "new"} display={toggleForm} />
          {showForm && <Accountform />}
          <div className="mt-4">
            {accounts.map((account) => (
              <div
                key={account._id}
                className="p-2 cursor-pointer"
                onClick={() => handleAccountClick(account)}
              >
                {account.name}
              </div>
            ))}
          </div>
        </div>
        <div className="w-3/4 p-4">
          {!selectedAccount && <h1>Welcome to Account Section</h1>}
          {selectedAccount && (
            <div>
              <AccountDetails account={selectedAccount} />
              <h2 className="text-lg font-bold mt-4">Total Log</h2>
              <div className="mb-4">
                <p><strong>Total Bill:</strong> {totalLog.totalBill}</p>
                <p><strong>Total Cooling Cans:</strong> {totalLog.totalCoolingCans}</p>
                <p><strong>Total Normal Cans:</strong> {totalLog.totalNormalCans}</p>
                <p><strong>Total Drink Amount:</strong> {totalLog.totalDrinkAmount}</p>
              </div>
              <h2 className="text-lg font-bold mt-4">Present Day Log</h2>
              {presentDayLog && (
                <form onSubmit={handlePresentDayLogSubmit}>
                  <div>
                    <label>Bill:</label>
                    <input type="number" name="Bill" value={presentDayLog.Bill} onChange={handlePresentDayLogChange} />
                  </div>
                  <div>
                    <label>Refilled Cans:</label>
                    <input type="number" name="RefilledCans" value={presentDayLog.RefilledCans} onChange={handlePresentDayLogChange} />
                  </div>
                  <div>
                    <label>Returned Cans:</label>
                    <input type="number" name="ReturnedCans" value={presentDayLog.ReturnedCans} onChange={handlePresentDayLogChange} />
                  </div>
                  <div>
                    <label>Number of Cool Cans:</label>
                    <input type="number" name="NumberofCoolCans" value={presentDayLog.NumberofCoolCans} onChange={handlePresentDayLogChange} />
                  </div>
                  <div>
                    <label>Number of Normal Cans:</label>
                    <input type="number" name="NumberofNormalCans" value={presentDayLog.NumberofNormalCans} onChange={handlePresentDayLogChange} />
                  </div>
                  <div>
                    <label>Drinks Amount:</label>
                    <input type="number" name="DrinksAmount" value={presentDayLog.DrinksAmount} onChange={handlePresentDayLogChange} />
                  </div>
                  <button type="submit">Submit</button>
                </form>
              )}
              <h2 className="text-lg font-bold mt-4">Previous Day Logs</h2>
              {previousDayLogs.map((log, index) => (
                <div key={index}>
                  <p><strong>Date:</strong> {new Date(log.Date).toLocaleDateString()}</p>
                  <p><strong>Bill:</strong> {log.Bill}</p>
                  <p><strong>Cooling Cans:</strong> {log.CoolingCans}</p>
                  <p><strong>Normal Cans:</strong> {log.NormalCans}</p>
                  <p><strong>Drink Amount:</strong> {log.DrinkAmount}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Accounts;
