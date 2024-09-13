import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaGithub } from 'react-icons/fa';


export default function Footer() {
  return (
    <footer className="bg-[#6a38c2] text-white py-6">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
        <div className="text-center md:text-left mb-4 md:mb-0">
          <h2 className="text-xl font-semibold">Stay Connected</h2>
          <p className="text-gray-100">Follow us on our social media channels</p>
        </div>
        <div className="flex space-x-4">
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#f83002]">
            <FaFacebook size={24} />
          </a>
          <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#f83002]">
            <FaTwitter size={24} />
          </a>
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#f83002]">
            <FaInstagram size={24} />
          </a>
          <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#f83002]">
            <FaLinkedin size={24} />
          </a>
          <a href="https://www.github.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#f83002]">
            <FaGithub size={24} />
          </a>
        </div>
      </div>
      <div className="text-center mt-6 text-gray-100">
        <p>&copy; {new Date().getFullYear()} Your Company. All rights reserved.</p>
      </div>
    </footer>
  );
}
