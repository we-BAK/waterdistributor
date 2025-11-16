/* eslint-disable no-unused-vars */
export default function FeatureCard({ icon: Icon, title, description, delay = 0 }) {
  return (
    <div
      className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 animate-fade-in-up"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="w-16 h-16 bg-linear-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mb-6 transform transition-transform duration-300 hover:rotate-6">
        <Icon className="w-8 h-8 text-white" />
      </div>

      <h3 className="text-xl font-bold text-gray-800 mb-3">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
  );
}
