export default function Input({
  type = 'text',
  placeholder,
  value,
  onChange,
  className = '',
  required = false
}) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required}
      className={`w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all duration-300 bg-white/80 backdrop-blur-sm ${className}`}
    />
  );
}
