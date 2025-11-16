import { Droplets } from 'lucide-react';
import Button from './Button';
import { useNavigate } from 'react-router-dom';

export default function LandingNavbar() {
  const navigate = useNavigate();

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md shadow-sm z-50 animate-slide-down">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">

          <div className="flex items-center space-x-3 cursor-pointer group">
            <div className="w-12 h-12 bg-linear-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center transform transition-transform duration-300 group-hover:rotate-12">
              <Droplets className="w-7 h-7 text-white" />
            </div>

            <span className="text-2xl font-bold bg-linear-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              Fiker Water
            </span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <a href="#home" className="text-gray-700 hover:text-blue-600 transition-colors duration-300 font-medium">Home</a>
            <a href="#features" className="text-gray-700 hover:text-blue-600 transition-colors duration-300 font-medium">Features</a>
            <a href="#about" className="text-gray-700 hover:text-blue-600 transition-colors duration-300 font-medium">About</a>
          </div>

          <Button onClick={() => navigate('/login')}>
            Login
          </Button>

        </div>
      </div>
    </nav>
  );
}
