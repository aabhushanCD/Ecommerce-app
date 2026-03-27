import { Mail, Lock, CheckCircle, Eye } from "lucide-react";
import React, { useRef, useState } from "react";

import { useNavigate } from "react-router-dom";
import { useAuth } from "@/features/auth/store";
import { toast } from "sonner";

const Login = () => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  const [eye, setEye] = useState(false);
  const [validForm, setValidForm] = useState({
    email: { valid: false },
    password: { valid: false },
  });

  const emailRegx = /^[a-zA-Z0-9+-.%]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const handleFormChange = () => {
    const email = emailRef.current.value.trim();
    const password = passwordRef.current.value.trim();

    setValidForm({
      email: { valid: emailRegx.test(email) },
      password: { valid: password.length >= 8 },
    });
  };

  const handleLogin = async () => {
    try {
      const email = emailRef.current.value.trim();
      const password = passwordRef.current.value.trim();
      const success = await login({ email, password });

      if (success) navigate("/");
    } catch (error) {
      toast.error(error.message);
      console.error(error);
    }
  };

  return (
    <div className="">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Log In</h1>
      <p className="text-gray-500 mb-6">
        Enter your credentials to access your account
      </p>

      {/* Email */}
      <div className="mb-5">
        <label className="text-sm text-gray-600">Email</label>
        <div className="flex items-center border rounded-xl px-3 py-2 mt-1 bg-white">
          <Mail className="text-gray-400" size={18} />
          <input
            type="text"
            placeholder="you@example.com"
            className="w-full outline-none px-2"
            ref={emailRef}
            onChange={handleFormChange}
          />
          {validForm.email.valid && (
            <CheckCircle className="text-green-500" size={18} />
          )}
        </div>
      </div>

      {/* Password */}
      <div className="mb-6">
        <label className="text-sm text-gray-600">Password</label>
        <div className="flex items-center border rounded-xl px-3 py-2 mt-1 bg-white">
          <Lock className="text-gray-400" size={18} />
          <input
            type={`${eye ? "text" : "password"}`}
            placeholder="••••••••"
            className="w-full outline-none px-2"
            ref={passwordRef}
            onChange={handleFormChange}
          />
          {validForm.password.valid && (
            <CheckCircle className="text-green-500" size={18} />
          )}
          <span>
            <Eye onClick={() => setEye(!eye)} />
          </span>
        </div>
      </div>

      {/* Button */}
      <button
        disabled={!validForm.email.valid || !validForm.password.valid}
        onClick={handleLogin}
        className="w-full py-3 rounded-xl text-white font-semibold 
              bg-linear-to-r from-green-400 to-emerald-500
              hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Login
      </button>

      <p className="text-center text-sm text-gray-500 mt-4">
        Don’t have an account?
        <span
          className="text-green-600 font-semibold cursor-pointer"
          onClick={() => navigate("/register")}
        >
          Sign up
        </span>
      </p>
    </div>
  );
};

export default Login;
