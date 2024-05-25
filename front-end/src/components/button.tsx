
import React from 'react';

interface ButtonProps {
  name: string;
  display: () => void;
}

const Button: React.FC<ButtonProps> = ({ name, display }) => {
  return (
    <div className="mt-3.5 ml-4">
      <button
        className="text-2xl bg-green-400 drop-shadow-md rounded-lg font-semibold px-4 py-2"
        onClick={display}
      >
        {name}
      </button>
    </div>
  );
};

export default Button;
