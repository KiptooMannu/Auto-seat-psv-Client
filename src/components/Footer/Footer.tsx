import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white w-full py-4">
      <div className="mx-auto px-4 text-center">
        <p className="text-sm text-gray-300">
          © {new Date().getFullYear()} Auto Seat PSV. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
