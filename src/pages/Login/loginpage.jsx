import { useState } from 'react';
import { Droplets } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Button from '../../component/Button';
import Input from '../../component/Input';
import loginBg from '../../assets/new.jpeg';
import LoginmainBg from '../../assets/new2.jpeg';

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
        console.error(`Invalid role: ${role}`);
        setError("Invalid role. Valid roles: owner, stockkeeper, sales");
    }
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center px-4 py-12 relative overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${LoginmainBg})`,
      }}
    >
      <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl opacity-10 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-300 rounded-full blur-3xl opacity-10 animate-pulse delay-1000"></div>

      <div 
        className="bg-cover bg-center bg-no-repeat rounded-3xl shadow-2xl p-8 sm:p-12 border border-white/20 relative"
        style={{
          backgroundImage: `url(${loginBg})`,
        }}
      >
        <div className="relative z-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-white text-center mb-3">
            Welcome Back
          </h2>
          <p className="text-blue-100 text-center mb-8">
            Sign in to your Fiker Water account
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="email" className="text-white font-medium text-sm">Email</label>
              <Input
                id="email"
                type="email"
                placeholder="role@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-white/10 backdrop-blur-md border border-white/30 text-black placeholder-gray-500"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="text-white font-medium text-sm">Password</label>
              <Input
                id="password"
                type="password"
                placeholder="1234"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-white/10 backdrop-blur-md border border-white/30 text-black placeholder-gray-500"
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