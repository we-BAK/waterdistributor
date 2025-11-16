import { useState } from 'react';
import { Droplets, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Button from '../../component/Button';
import Input from '../../component/Input';

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (password !== "1234") {
      setError("Invalid email or password");
      return;
    }

    const emailPattern = /^(.+)@example\.com$/;
    const match = email.trim().toLowerCase().match(emailPattern);

    if (!match) {
      setError("Invalid email format. Use: role@example.com");
      return;
    }

    const role = match[1];
    switch (role) {
      case "owner":
        navigate("/owner");
        break;
      case "stockkeeper":
        navigate("/StockKeeper");
        break;
      case "sales":
        navigate("/sales");
        break;
      default:
        setError("Invalid role. Valid roles: owner, stockkeeper, sales");
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-500 via-cyan-500 to-blue-600 flex items-center justify-center px-4 py-12 relative overflow-hidden">

      {/* Background Decorations */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl opacity-10 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-300 rounded-full blur-3xl opacity-10 animate-pulse delay-1000"></div>

      {/* Back Button */}
      <button
        onClick={() => navigate("/")}
        className="absolute top-8 left-8 flex items-center space-x-2 text-white hover:bg-white/20 px-4 py-2 rounded-lg transition-all duration-300 backdrop-blur-sm"
      >
        <ArrowLeft className="w-5 h-5" />
        <span>Back</span>
      </button>

      {/* Login Card */}
      <div className="w-full max-w-md relative animate-fade-in-up">
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl p-8 sm:p-12 border border-white/20">

          {/* Logo */}
          <div className="flex justify-center mb-8">
            <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center shadow-lg transform transition-transform duration-300 hover:rotate-12">
              <Droplets className="w-12 h-12 text-blue-500" />
            </div>
          </div>

          {/* Heading */}
          <h2 className="text-3xl sm:text-4xl font-bold text-white text-center mb-3">
            Welcome Back
          </h2>
          <p className="text-blue-100 text-center mb-8">
            Sign in to your Fiker Water account
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-white font-medium text-sm">Email</label>
              <Input
                type="email"
                placeholder="role@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-white/90"
              />
            </div>

            <div className="space-y-2">
              <label className="text-white font-medium text-sm">Password</label>
              <Input
                type="password"
                placeholder="1234"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-white/90"
              />
            </div>

            {error && (
              <p className="text-red-300 text-sm text-center">{error}</p>
            )}

            <Button type="submit" className="w-full">
              Sign In
            </Button>

            <p className="mt-4 text-blue-100 text-center text-sm">
              Example login: owner@example.com | Password: 1234
            </p>
          </form>

        </div>
      </div>
    </div>
  );
}
