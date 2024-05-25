import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="bg-sky-400  max-w-full h-24 flex items-center px-10 relative">
      <div className="absolute left-1/2 transform -translate-x-1/2 text-3xl font-poetsen">
        Ganga Jal plant
      </div>
      <Link to="/" className="ml-auto text-2xl shadow-xl text-white font-semibold">
        Home
      </Link>
    </div>
  );
}

export default Header;
