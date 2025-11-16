import { Droplets } from 'lucide-react';

export default function LandingPageFooter() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between">

          <div className="flex items-center space-x-3 mb-6 md:mb-0">
            <div className="w-10 h-10 bg-linear-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
              <Droplets className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-white">Fiker Water</span>
          </div>

          <div className="flex flex-wrap justify-center space-x-8 mb-6 md:mb-0">
            <a href="#home" className="hover:text-white transition-colors duration-300">Home</a>
            <a href="#features" className="hover:text-white transition-colors duration-300">Features</a>
            <a href="#about" className="hover:text-white transition-colors duration-300">About</a>
            <a href="#contact" className="hover:text-white transition-colors duration-300">Contact</a>
          </div>

          <div className="text-sm text-gray-400">
            © 2025 Fiker Water. All rights reserved.
          </div>

        </div>
      </div>
    </footer>
  );
}
