import React from 'react';
import { motion } from 'framer-motion';

interface ButtonProps {
  name: string;
  display: () => void;
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
}

const Button: React.FC<ButtonProps> = ({ 
  name, 
  display, 
  variant = 'primary',
  size = 'md' 
}) => {
  const baseStyles = "font-semibold rounded-lg transition-all duration-200 shadow-md hover:shadow-lg";
  
  const variantStyles = {
    primary: "bg-blue-500 hover:bg-blue-600 text-white",
    secondary: "bg-gray-500 hover:bg-gray-600 text-white",
    danger: "bg-red-500 hover:bg-red-600 text-white"
  };

  const sizeStyles = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg"
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]}`}
      onClick={display}
    >
      {name}
    </motion.button>
  );
};

export default Button;
