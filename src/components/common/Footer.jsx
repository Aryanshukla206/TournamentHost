import React from 'react';
import { Link } from 'react-router-dom';
import { Trophy, Twitter, Facebook, Instagram, Mail, Phone } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-neutral-800 text-white pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center mb-4">
              <Trophy className="h-6 w-6 text-accent-400" />
              <span className="ml-2 text-xl font-bold">TourneyPro</span>
            </div>
            <p className="text-neutral-300 mb-4">
              The ultimate platform for hosting and participating in tournaments. From small gatherings to major competitions, we've got you covered.
            </p>
            {/* social Media ICONs */}
            {/* <div className="flex space-x-4 mb-4">
              <a href="#" className="text-neutral-300 hover:text-accent-400 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-neutral-300 hover:text-accent-400 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-neutral-300 hover:text-accent-400 transition-colors">
                <Instagram size={20} />
              </a>
            </div> */}
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-neutral-300 hover:text-accent-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-neutral-300 hover:text-accent-400 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/features" className="text-neutral-300 hover:text-accent-400 transition-colors">
                  Features
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="text-neutral-300 hover:text-accent-400 transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-neutral-300 hover:text-accent-400 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-bold text-lg mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/blog" className="text-neutral-300 hover:text-accent-400 transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-neutral-300 hover:text-accent-400 transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/support" className="text-neutral-300 hover:text-accent-400 transition-colors">
                  Support Center
                </Link>
              </li>
              <li>
                <Link to="/tutorials" className="text-neutral-300 hover:text-accent-400 transition-colors">
                  Tutorials
                </Link>
              </li>
              <li>
                <Link to="/api" className="text-neutral-300 hover:text-accent-400 transition-colors">
                  API Documentation
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <Mail className="h-5 w-5 mr-2 mt-0.5 text-neutral-400" />
                <span className="text-neutral-300">tourneypro2025@gmail.com</span>
              </li>
              <li className="flex items-start">
                <Phone className="h-5 w-5 mr-2 mt-0.5 text-neutral-400" />
                <span className="text-neutral-300">+91 8957849356</span>
              </li>
            </ul>
            {/* Uncomment if you want to add a newsletter subscription form */}
            {/* <div className="mt-6">
              <h4 className="font-semibold mb-2 text-sm uppercase tracking-wider">Subscribe to our newsletter</h4>
              <form className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="py-2 px-3 bg-neutral-700 text-white rounded-l-md focus:outline-none focus:ring-1 focus:ring-accent-400 flex-1"
                />
                <button
                  type="submit"
                  className="bg-accent-500 hover:bg-accent-600 text-white py-2 px-4 rounded-r-md transition-colors"
                >
                  Subscribe
                </button>
              </form>
            </div> */}
          </div>
        </div>

        <div className="border-t border-neutral-700 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-neutral-400 text-sm">
            &copy; {new Date().getFullYear()} TourneyPro. All rights reserved.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link to="/privacy" className="text-neutral-400 hover:text-accent-400 text-sm">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-neutral-400 hover:text-accent-400 text-sm">
              Terms of Service
            </Link>
            <Link to="/cookies" className="text-neutral-400 hover:text-accent-400 text-sm">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;