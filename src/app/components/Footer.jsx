import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#2E2E2E] text-white mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-gradient-to-br from-[#1F3C88] to-[#5B73C5] w-10 h-10 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">W</span>
              </div>
              <span className="text-2xl font-bold">WINGER</span>
            </div>
            <p className="text-gray-400 mb-4">
              Your one-stop destination for quality products at unbeatable prices. Shop with confidence!
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-8 h-8 bg-[#1F3C88] rounded-full flex items-center justify-center hover:bg-[#F9C74F] hover:text-[#2E2E2E] transition">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 bg-[#1F3C88] rounded-full flex items-center justify-center hover:bg-[#F9C74F] hover:text-[#2E2E2E] transition">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 bg-[#1F3C88] rounded-full flex items-center justify-center hover:bg-[#F9C74F] hover:text-[#2E2E2E] transition">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 bg-[#1F3C88] rounded-full flex items-center justify-center hover:bg-[#F9C74F] hover:text-[#2E2E2E] transition">
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="/about" className="hover:text-[#F9C74F] transition">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-[#F9C74F] transition">Contact Us</Link></li>
              <li><Link to="/careers" className="hover:text-[#F9C74F] transition">Careers</Link></li>
              <li><Link to="/blog" className="hover:text-[#F9C74F] transition">Blog</Link></li>
            </ul>
          </div>

          {/* Help & Support */}
          <div>
            <h3 className="font-semibold mb-4">Help & Support</h3>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="/shipping" className="hover:text-[#F9C74F] transition">Shipping Info</Link></li>
              <li><Link to="/returns" className="hover:text-[#F9C74F] transition">Returns & Refunds</Link></li>
              <li><Link to="/faq" className="hover:text-[#F9C74F] transition">FAQs</Link></li>
              <li><Link to="/terms" className="hover:text-[#F9C74F] transition">Terms & Conditions</Link></li>
              <li><Link to="/privacy" className="hover:text-[#F9C74F] transition">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3 text-gray-400">
              <li className="flex items-start gap-2">
                <MapPin className="w-5 h-5 mt-0.5 text-[#F9C74F]" />
                <span>123 E-commerce Street, Mumbai, India 400001</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-5 h-5 text-[#F9C74F]" />
                <span>+91 1800-123-4567</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-[#F9C74F]" />
                <span>support@winger.com</span>
              </li>
            </ul>
            <div className="mt-4">
              <p className="text-sm text-gray-400 mb-2">Download Our App</p>
              <div className="flex gap-2">
                <button className="bg-[#1F3C88] px-4 py-2 rounded-lg text-sm hover:bg-[#F9C74F] hover:text-[#2E2E2E] transition">
                  Play Store
                </button>
                <button className="bg-[#1F3C88] px-4 py-2 rounded-lg text-sm hover:bg-[#F9C74F] hover:text-[#2E2E2E] transition">
                  App Store
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
          <p>&copy; 2024 WINGER. All rights reserved. | Designed with ❤️ for Indian shoppers</p>
        </div>
      </div>
    </footer>
  );
}