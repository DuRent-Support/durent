"use client";

import { MessageCircle, Mail, Phone, Box } from "lucide-react";

const Footer = ({ onWhatsAppClick }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card-bg border-t border-gray-800 mt-24">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand Info */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img
                src="/logo.png"
                alt="DuRent Support Logo"
                className="w-10 h-10 object-contain"
              />
              <h3 className="text-xl font-bold text-white">DuRent Support</h3>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              Professional production support equipment rental for Film & Media
              production. Behind-the-scenes essentials for your production
              needs.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4 uppercase tracking-wide text-sm">
              Our Services
            </h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>• Equipment Rental</li>
              <li>• Production Crew</li>
              <li>• Expendable Sales</li>
              <li>• Transport & Logistics</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-semibold mb-4 uppercase tracking-wide text-sm">
              Get in Touch
            </h4>
            <div className="space-y-3">
              <button
                onClick={onWhatsAppClick}
                className="flex items-center gap-3 text-gray-400 hover:text-green-400 transition-colors duration-300 group"
              >
                <MessageCircle className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                <span className="text-sm">WhatsApp Inquiry</span>
              </button>
              <div className="flex items-center gap-3 text-gray-400">
                <Phone className="w-5 h-5" />
                <span className="text-sm">+62 858-1481-0017</span>
              </div>
              <div className="flex items-center gap-3 text-gray-400">
                <Mail className="w-5 h-5" />
                <span className="text-sm">durentgrup@gmail.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-800 text-center">
          <p className="text-gray-500 text-sm">
            © {currentYear} DuRent Support. All rights reserved. | Professional
            Production Support Rental
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
