import React, { useRef, useState } from "react";
import { useAuth } from "@/features/auth/store";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import {
  User,
  Mail,
  Lock,
  ArrowRight,
  Eye,
  EyeOff,

} from "lucide-react";

const InputField = ({
  label,
  type,
  refProp,
  icon: Icon,
  showToggle,
  onToggle,
  showPassword,
}) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-sm font-medium text-slate-600 tracking-wide">
      {label}
    </label>
    <div className="relative group">
      <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors duration-200">
        <Icon size={17} />
      </div>
      <input
        type={showToggle ? (showPassword ? "text" : "password") : type}
        ref={refProp}
        placeholder={
          label === "Full Name"
            ? "John Doe"
            : label === "Email Address"
              ? "you@example.com"
              : "Min. 8 characters"
        }
        className="w-full pl-10 pr-10 py-3 rounded-xl border border-slate-200 bg-slate-50
          text-slate-800 placeholder-slate-400 text-sm
          focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent
          focus:bg-white transition-all duration-200 hover:border-slate-300"
      />
      {showToggle && (
        <button
          type="button"
          onClick={onToggle}
          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-indigo-500 transition-colors duration-200"
        >
          {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>
      )}
    </div>
  </div>
);

const Signup = () => {
  const { Signup } = useAuth();

  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const name = nameRef.current.value.trim();
    const email = emailRef.current.value.trim();
    const password = passwordRef.current.value.trim();

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (name.length <= 3)
      return setError("Name must be more than 3 characters.");
    if (!emailRegex.test(email))
      return setError("Please enter a valid email address.");
    if (password.length < 8)
      return setError("Password must be at least 8 characters.");

    setLoading(true);
    setError("");

    try {
      const success = await Signup({ name, email, password });

      if (success) {
        toast.success("Account created successfully!");
        nameRef.current.value = "";
        emailRef.current.value = "";
        passwordRef.current.value = "";
        setError("");
        navigate("/login");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-linear-to-br from-slate-100 via-indigo-50 to-slate-100 flex items-center justify-center px-4">
      {/* Card */}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl shadow-slate-200 border border-slate-100 overflow-hidden">
        {/* Top accent bar */}
        <div className="h-1.5 w-full bg-linear-to-r from-indigo-400 via-violet-500 to-indigo-400" />

        <div className="px-8 py-9">
          {/* Header */}
          <div className="mb-8 text-center">
           
            <h1 className="text-2xl font-bold text-slate-800 tracking-tight">
              Create your account
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Join us — it only takes a minute.
            </p>
          </div>

          {/* Error Banner */}
          {error && (
            <div className="mb-5 flex items-start gap-2.5 bg-red-50 border border-red-100 text-red-600 text-sm px-4 py-3 rounded-xl">
              <span className="mt-0.5">⚠</span>
              <span>{error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <InputField
              label="Full Name"
              type="text"
              refProp={nameRef}
              icon={User}
            />

            <InputField
              label="Email Address"
              type="email"
              refProp={emailRef}
              icon={Mail}
            />

            <InputField
              label="Password"
              type="password"
              refProp={passwordRef}
              icon={Lock}
              showToggle
              onToggle={() => setShowPassword((prev) => !prev)}
              showPassword={showPassword}
            />

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="mt-1 w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700
                active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed
                text-white font-semibold text-sm py-3 rounded-xl
                transition-all duration-200 shadow-md shadow-indigo-200 hover:shadow-indigo-300"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg
                    className="animate-spin h-4 w-4 text-white"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8H4z"
                    />
                  </svg>
                  Creating account...
                </span>
              ) : (
                <>
                  Create Account
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-slate-100" />
            <span className="text-xs text-slate-400 font-medium">
              Already have an account?
            </span>
            <div className="flex-1 h-px bg-slate-100" />
          </div>

          {/* Login Link */}
          <button
            onClick={() => navigate("/login")}
            className="w-full text-center text-sm font-semibold text-indigo-600 hover:text-indigo-700
              border border-indigo-100 hover:border-indigo-300 hover:bg-indigo-50
              py-2.5 rounded-xl transition-all duration-200"
          >
            Sign in instead
          </button>
        </div>

        {/* Footer */}
        <div className="bg-slate-50 border-t border-slate-100 px-8 py-4 text-center">
          <p className="text-xs text-slate-400">
            By signing up, you agree to our{" "}
            <span className="text-indigo-500 hover:underline cursor-pointer">
              Terms
            </span>{" "}
            and{" "}
            <span className="text-indigo-500 hover:underline cursor-pointer">
              Privacy Policy
            </span>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
