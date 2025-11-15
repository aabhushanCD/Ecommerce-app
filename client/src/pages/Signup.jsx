import React, { useRef } from "react";

import { useAuth } from "@/Store/store";
const Signup = () => {
  const { Signup } = useAuth();
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = nameRef.current.value.trim();
    const email = emailRef.current.value.trim();
    const password = passwordRef.current.value.trim();
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    try {
      if (name.length <= 3) {
        return "Invalid Name!";
      }
      if (!emailRegex.test(email)) {
        return "Invalid Email!";
      }
      if (password.length <= 7) {
        return "Invalid Name!";
      }
      const success = await Signup({name, email, password});
      if (success) {
        nameRef.current.value = "";
        emailRef.current.value = "";
        passwordRef.current.value = "";
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="w-full flex justify-center mt-10">
      <div className="w-[350px] p-6 border rounded-xl shadow-md bg-white">
        <h1 className="text-2xl font-semibold mb-4 text-center">Sign Up</h1>
        <div className="flex flex-col gap-3">
          <label htmlFor="name" className="font-medium">
            Name:
          </label>
          <input
            type="text"
            id="name"
            ref={nameRef}
            className="border rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-300"
          />

          <label htmlFor="email" className="font-medium">
            Email:
          </label>
          <input
            type="email"
            id="email"
            ref={emailRef}
            className="border rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-300"
          />

          <label htmlFor="password" className="font-medium">
            Password:
          </label>
          <input
            type="password"
            id="password"
            ref={passwordRef}
            className="border rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-300"
          />

          <button
            className="mt-3 bg-blue-600 text-white rounded-md py-2 hover:bg-blue-700 transition"
            onClick={(e) => {
              handleSubmit(e);
            }}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
