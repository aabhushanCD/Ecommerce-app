import React, { useRef, useState } from "react";
import { useAuth } from "@/features/auth/store";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Signup = () => {
  const { Signup } = useAuth();

  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const name = nameRef.current.value.trim();
    const email = emailRef.current.value.trim();
    const password = passwordRef.current.value.trim();

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (name.length <= 3) {
      return setError("Name must be more than 3 characters");
    }

    if (!emailRegex.test(email)) {
      return setError("Invalid email format");
    }

    if (password.length < 8) {
      return setError("Password must be at least 8 characters");
    }

    try {
      const success = await Signup({ name, email, password });

      if (success) {
        toast.success("Sign-Up Successfully!");
        nameRef.current.value = "";
        emailRef.current.value = "";
        passwordRef.current.value = "";
        setError("");
        navigate("/login");
      }
    } catch (err) {
      console.error(err);
      setError("Signup failed");
    }
  };

  return (
    <div className="w-full flex justify-center mt-10 dark:text-black">
      <form
        onSubmit={handleSubmit}
        className="w-87.5 p-6 border rounded-xl shadow-md bg-white"
      >
        <h1 className="text-2xl font-semibold mb-4 text-center">Sign Up</h1>

        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

        <div className="flex flex-col gap-3">
          <label>Name:</label>
          <input type="text" ref={nameRef} className="border rounded-md p-2" />

          <label>Email:</label>
          <input
            type="email"
            ref={emailRef}
            className="border rounded-md p-2"
          />

          <label>Password:</label>
          <input
            type="password"
            ref={passwordRef}
            className="border rounded-md p-2"
          />

          <button
            type="submit"
            className="mt-3 bg-blue-600 text-white rounded-md py-2 hover:bg-blue-700"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
