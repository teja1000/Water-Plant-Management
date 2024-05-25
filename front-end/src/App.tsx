
import { BrowserRouter,Routes,Route } from "react-router-dom"
import Homepage from "./pages/Homepage"
import Order from "./pages/Order"
import Logbook from "./pages/Logbook"
import Transactions from "./pages/Transactions"
import Analytics from "./pages/Analytics"
import Accounts from "./pages/Accounts"


function App() {
  

  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage/>}/>
        <Route path="/Order" element={<Order/>}/>
        <Route path="/Logbook" element={<Logbook/>}/>
        <Route path="/Transctions" element={<Transactions/>}/>
        <Route path="/Accounts" element={<Accounts/>}/>
        <Route path="/Analytics" element={<Analytics/>}/>
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
