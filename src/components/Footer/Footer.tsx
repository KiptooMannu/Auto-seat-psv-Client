// components/Footer/Footer.tsx
import React from 'react';

interface FooterProps {
  className?: string;
}

const Footer: React.FC<FooterProps> = ({ className }) => {
  return (
    <footer className={`bg-gray-800 text-white p-4 ${className || ''}`}>
      {/* Footer content */}
    </footer>
  );
};

export default Footer;
