import { Zap, Droplets, DollarSign } from 'lucide-react';
import LandingNavbar from '../../component/LandingNavBar';
import LandingPageFooter from '../../component/Footer';
import FeatureCard from '../../component/FeatureCard';
import Button from '../../component/Button';

export default function LandingPage({ onLoginClick }) {
  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white">
      <LandingNavbar onLoginClick={onLoginClick} />

      <section id="home" className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in-left">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight mb-6">
                Pure Water
                <span className="block bg-linear
        -to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                  Delivered Fast
                </span>
                <span className="block">& Fresh</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Experience premium water delivery service at your doorstep. Fresh, safe, and affordable water dispensers for your home or office.
              </p>
              <Button onClick={onLoginClick} className="text-lg">
                Get Started
              </Button>
            </div>

            <div className="animate-fade-in-right">
              <div className="relative">
                <div className="absolute inset-0 bg-linear
        -to-r from-blue-400 to-cyan-400 rounded-3xl blur-3xl opacity-20 animate-pulse"></div>
                <div className="relative bg-linear
        -to-br from-blue-500 to-cyan-500 rounded-3xl p-12 shadow-2xl transform hover:scale-105 transition-transform duration-500">
                  <Droplets className="w-full h-64 text-white opacity-90" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              Why Choose Fiker Water?
            </h2>
            <p className="text-xl text-gray-600">
              Premium water delivery service with unmatched quality and speed
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={Zap}
              title="Fast Delivery"
              description="Lightning-fast delivery to your doorstep. Get your water dispensers within hours, not days. Our efficient logistics ensure you never run out."
              delay={0}
            />
            <FeatureCard
              icon={Droplets}
              title="Fresh & Safe Water"
              description="100% purified and tested water. Multi-stage filtration ensures every drop is clean, safe, and refreshing for you and your family."
              delay={100}
            />
            <FeatureCard
              icon={DollarSign}
              title="Affordable Pricing"
              description="Transparent pricing with no hidden fees. Flexible plans for homes and businesses. Premium quality at prices that make sense."
              delay={200}
            />
          </div>
        </div>
      </section>

      <section id="about" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-3xl shadow-xl p-12 animate-fade-in-up">
            <div className="text-center">
              <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
                About Fiker Water
              </h2>
              <div className="w-20 h-1 bg-linear
        -to-r from-blue-500 to-cyan-500 mx-auto mb-8"></div>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Fiker Water has been serving communities with premium water delivery services for years.
                Our mission is to provide every household and business with access to clean, safe, and
                affordable drinking water.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                We believe that access to pure water is a fundamental right. That's why we've built our
                service around three core values: quality, speed, and affordability. Our team works
                tirelessly to ensure every delivery meets the highest standards.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Trust Fiker Water for all your water dispenser needs. Join thousands of satisfied
                customers who have made the switch to hassle-free, reliable water delivery.
              </p>
            </div>
          </div>
        </div>
      </section>

      <LandingPageFooter />
    </div>
  );
}
