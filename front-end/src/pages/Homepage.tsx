import { Link } from "react-router-dom"
import { FaShoppingCart, FaBook, FaUser } from "react-icons/fa";
import { GrTransaction } from "react-icons/gr";
import { BsGraphUp } from "react-icons/bs";
import Header from "../components/Header";
import { motion } from "framer-motion";

const MenuItem = ({ to, icon: Icon, label }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className="backdrop-blur-sm bg-white/30 rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl w-48 border border-white/20"
  >
    <Link to={to} className="flex flex-col items-center">
      <Icon className="size-40 text-blue-500 mb-4" />
      <span className="text-xl font-medium text-gray-800">{label}</span>
    </Link>
  </motion.div>
);

const Homepage = () => {
  const menuItems = [
    { to: "/Order", icon: FaShoppingCart, label: "Order" },
    { to: "/Logbook", icon: FaBook, label: "Logbook" },
    { to: "/Transctions", icon: GrTransaction, label: "Transactions" },
    { to: "/Accounts", icon: FaUser, label: "Accounts" },
    { to: "/Analytics", icon: BsGraphUp, label: "Analytics" },
  ];

  return (
    <div className="min-h-screen relative bg-gradient-to-br from-blue-100 to-white">
      <div className="absolute inset-0 bg-white/30 backdrop-blur-[2px]" />
      <Header />
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative flex gap-6 justify-around flex-wrap max-w-6xl mx-auto mt-12 p-6"
      >
        {menuItems.map((item, index) => (
          <motion.div
            key={item.to}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <MenuItem {...item} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

export default Homepage;