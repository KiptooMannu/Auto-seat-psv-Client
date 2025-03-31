import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="bg-gray-800 text-white w-full py-4">
      <div className="container mx-auto px-4 text-center">
        <p className="text-sm text-gray-300">
          © {new Date().getFullYear()} Auto Seat PSV. All Rights Reserved.
        </p>
        <div className="mt-2">
          <Link to="/dashboard" className="text-blue-400 hover:underline mx-2">
            Dashboard
          </Link>
          <Link to="/contact" className="text-blue-400 hover:underline mx-2">
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
