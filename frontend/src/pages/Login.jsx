import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  Mail,
  Lock,
  ArrowRight,
} from "lucide-react";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      console.log({
        email,
        password,
      });

      // Temporary navigation
      setTimeout(() => {
        navigate("/");
      }, 1000);

    } catch (err) {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-slate-950">

      {/* LEFT SECTION */}
      <div className="hidden lg:flex flex-col justify-between relative overflow-hidden p-14">

        {/* Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-700 via-slate-900 to-cyan-900 opacity-90" />

        {/* Glow Effects */}
        <div className="absolute top-10 left-10 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl" />

        <div className="absolute bottom-10 right-10 w-72 h-72 bg-cyan-500/20 rounded-full blur-3xl" />

        {/* Content */}
        <div className="relative z-10">

          {/* Logo */}
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-blue-600 flex items-center justify-center text-white text-2xl font-bold shadow-xl">
              F
            </div>

            <h1 className="text-3xl font-bold text-white">
              Forex Insight
            </h1>
          </div>

          {/* Hero Text */}
          <div className="mt-24 max-w-xl">

            <h1 className="text-6xl font-bold leading-tight text-white">
              Smart Forex
              <br />
              Decisions with AI
            </h1>

            <p className="mt-8 text-slate-300 text-lg leading-relaxed">
              Analyze hidden forex charges,
              compare bank exchange rates,
              and maximize your savings
              with intelligent financial insights.
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="relative z-10 grid grid-cols-3 gap-5">

          <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl p-5">
            <h2 className="text-3xl font-bold text-white">
              25+
            </h2>

            <p className="text-slate-300 text-sm mt-1">
              Supported Banks
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl p-5">
            <h2 className="text-3xl font-bold text-white">
              98%
            </h2>

            <p className="text-slate-300 text-sm mt-1">
              Accuracy Rate
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl p-5">
            <h2 className="text-3xl font-bold text-white">
              AI
            </h2>

            <p className="text-slate-300 text-sm mt-1">
              Smart Insights
            </p>
          </div>
        </div>
      </div>

      {/* RIGHT SECTION */}
      <div className="flex items-center justify-center px-6 py-10 bg-slate-50">

        <div className="w-full max-w-md">

          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center justify-center gap-3 mb-10">

            <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center text-white text-xl font-bold">
              F
            </div>

            <h1 className="text-2xl font-bold text-slate-800">
              Forex Insight
            </h1>
          </div>

          {/* Card */}
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 p-10">

            {/* Heading */}
            <div className="text-center">
              <h1 className="text-4xl font-bold text-slate-800">
                Welcome Back
              </h1>

              <p className="mt-3 text-slate-500">
                Login to continue your forex journey
              </p>
            </div>

            {/* Error */}
            {error && (
              <div className="mt-6 bg-red-100 border border-red-300 text-red-600 px-4 py-3 rounded-xl text-sm">
                {error}
              </div>
            )}

            {/* Form */}
            <form
              onSubmit={handleSubmit}
              className="mt-8 space-y-5"
            >

              {/* Email */}
              <div>
                <label className="text-sm font-semibold text-slate-700">
                  Email Address
                </label>

                <div className="mt-2 flex items-center border border-slate-300 rounded-xl px-4 py-3 bg-slate-50 focus-within:ring-2 focus-within:ring-blue-500">

                  <Mail
                    size={18}
                    className="text-slate-500"
                  />

                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) =>
                      setEmail(e.target.value)
                    }
                    required
                    className="bg-transparent outline-none w-full ml-3 text-slate-700"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="text-sm font-semibold text-slate-700">
                  Password
                </label>

                <div className="mt-2 flex items-center border border-slate-300 rounded-xl px-4 py-3 bg-slate-50 focus-within:ring-2 focus-within:ring-blue-500">

                  <Lock
                    size={18}
                    className="text-slate-500"
                  />

                  <input
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) =>
                      setPassword(e.target.value)
                    }
                    required
                    className="bg-transparent outline-none w-full ml-3 text-slate-700"
                  />
                </div>
              </div>

              {/* Forgot Password */}
              <div className="flex justify-end">
                <button
                  type="button"
                  className="text-sm text-blue-600 hover:text-blue-700"
                >
                  Forgot Password?
                </button>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 transition-all duration-300 text-white py-4 rounded-xl font-semibold flex items-center justify-center gap-2 shadow-lg"
              >
                {loading ? (
                  "Signing In..."
                ) : (
                  <>
                    Sign In

                    <ArrowRight size={18} />
                  </>
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-3 my-8">

              <div className="flex-1 h-px bg-slate-200" />

              <span className="text-sm text-slate-400">
                OR
              </span>

              <div className="flex-1 h-px bg-slate-200" />
            </div>

            {/* Register */}
            <Link
              to="/register"
              className="block text-center border border-slate-300 py-4 rounded-xl font-semibold hover:bg-slate-100 transition-all"
            >
              Create New Account
            </Link>

            {/* Footer */}
            <p className="text-center text-sm text-slate-400 mt-8">
              Protected with enterprise-grade security
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}