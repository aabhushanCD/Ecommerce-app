import { UserPen } from "lucide-react";
import React, { useRef, useState } from "react";
import catwebp from "/images/catwebp.webp";
import { useAuth } from "@/Store/store";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const navigate = useNavigate();
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
      if (success) {
        navigate("/");
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="fixed z-50 top-10 left-10 gap-4 flex w-300 h-10 border bg-white shadow-gray-400 m-auto">
      <div>
        <div>
          <img src={catwebp} alt="" className="w-100 h-auto" />
        </div>
        <p className="font-semibold">Create an account</p>
      </div>

      <div>
        <h1 className="text-3xl font-bold mb-5">Log In</h1>

        {/* Email */}
        <div className="mt-5 flex border-b items-center gap-2">
          <UserPen />
          <input
            type="text"
            placeholder="Your email"
            className="outline-none p-1"
            onChange={handleFormChange}
            ref={emailRef}
          />

          {validForm.email.valid && <input type="checkbox" checked readOnly />}
        </div>

        {/* Password */}
        <div className="mt-5 flex border-b items-center gap-2">
          <UserPen />
          <input
            type="password"
            placeholder="Your Password"
            className="outline-none p-1"
            onChange={handleFormChange}
            ref={passwordRef}
          />

          {validForm.password.valid && (
            <input type="checkbox" checked readOnly />
          )}
        </div>

        <div className="p-3 flex justify-center">
          <button
            disabled={!validForm.email.valid || !validForm.password.valid}
            className="bg-green-400 p-2 rounded-2xl disabled:bg-gray-400"
            onClick={handleLogin}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
