import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Header = () => {
  return (
    <motion.div 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="bg-gradient-to-r from-sky-400 to-blue-500 max-w-full h-24 flex items-center px-10 relative shadow-lg"
    >
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="absolute left-1/2 transform -translate-x-1/2 text-3xl font-poetsen text-white"
      >
        Ganga Jal plant
      </motion.div>
      <Link 
        to="/" 
        className="ml-auto text-2xl text-white font-semibold hover:text-blue-100 transition-colors duration-200"
      >
        <motion.span
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Home
        </motion.span>
      </Link>
    </motion.div>
  );
}

export default Header;
