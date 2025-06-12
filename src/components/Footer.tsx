import Link from 'next/link';
import { FaInstagram } from 'react-icons/fa';

const Footer = () => (
  <footer className="bg-white border-t border-gray-200 mt-12">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* Logo & Tagline */}
      <div>
        <div className="flex items-center mb-2">
          <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Palette Pals</span>
        </div>
        <p className="text-gray-600 text-sm mb-4">Bringing your vision to life with color and creativity.</p>
      </div>
      {/* Quick Links */}
      <div>
        <h3 className="text-lg font-semibold mb-3 text-gray-900">Quick Links</h3>
        <ul className="space-y-2">
          <li><Link href="/" className="text-gray-600 hover:text-pink-600 transition-colors">Home</Link></li>
          <li><Link href="/services" className="text-gray-600 hover:text-pink-600 transition-colors">Services</Link></li>
          <li><Link href="/work" className="text-gray-600 hover:text-pink-600 transition-colors">Gallery</Link></li>
          <li><Link href="/contact" className="text-gray-600 hover:text-pink-600 transition-colors">Contact</Link></li>
        </ul>
      </div>
      {/* Contact Info */}
      <div>
        <h3 className="text-lg font-semibold mb-3 text-gray-900">Contact Us</h3>
        <p className="text-gray-600 text-sm mb-1">Email: hitanshiwatwani52000@gmail.com</p>
        <p className="text-gray-600 text-sm mb-1">Phone: +91 9479670801</p>
        <p className="text-gray-600 text-sm mb-4">Address: Anywhere in India</p>
        <a href="https://www.instagram.com/palette._.pals/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-pink-600 hover:text-purple-600">
          <FaInstagram className="w-5 h-5 mr-2" />
          @palette._.pals
        </a>
      </div>
    </div>
    <div className="border-t border-gray-100 text-center py-4 text-gray-400 text-sm">
      © 2025 Palette Pals. All rights reserved.
    </div>
  </footer>
);

export default Footer; 