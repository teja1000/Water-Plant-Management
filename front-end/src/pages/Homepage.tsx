import { Link } from "react-router-dom"
import { FaShoppingCart } from "react-icons/fa";
import { FaBook } from "react-icons/fa";
import { GrTransaction } from "react-icons/gr";
import { BsGraphUp } from "react-icons/bs";
import { FaUser } from "react-icons/fa6";
import Header from "../components/Header";
const Homepage=()=>{
  return(
    <div>
      <Header/>
      <div className="flex gap-4 justify-around  ml-4 mt-6">
      <div className="bg-neutral-300 w-48">
        <Link to="/Order"><FaShoppingCart className="size-40"/></Link>
        <div className="text-xl text-center pb-2 ">Order</div>
      </div>
      <div className="bg-neutral-300 w-48">
        <Link to="/Logbook"><FaBook className="size-40 pl-6 pt-2"/></Link>
        <div className="text-xl pb-2 text-center">Logbook</div>
      </div>
      <div className="bg-neutral-300 w-48">
        <Link to="/Transctions"><GrTransaction className="size-40"/></Link>
        <div className="text-xl pb-2 text-center">Transactions</div>
      </div>
      <div className="bg-neutral-300 w-48">
        <Link to="/Accounts"><FaUser className="size-40 pl-2 mt-2"/></Link>
        <div className="text-xl pb-2 text-center">Accounts</div>
      </div>
      <div className="bg-neutral-300 w-48">
        <Link to="/Analytics"><BsGraphUp className="size-40 pl-2 mt-2"/></Link>
        <div className="text-xl pb-2 text-center">Analytics</div>
      </div>
      </div>
    </div>
  )
}

export default Homepage