export default function Button({
  children,
  onClick,
  variant = 'primary',
  className = '',
  type = 'button'
}) {
  const baseStyles =
    "px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 active:scale-95";

  const variants = {
    primary:
      "bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:from-blue-600 hover:to-cyan-600 shadow-lg hover:shadow-xl",
    secondary: "bg-white text-blue-600 border-2 border-blue-500 hover:bg-blue-50"
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
}
