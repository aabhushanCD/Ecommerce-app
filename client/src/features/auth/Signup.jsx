import { Button } from "@/components/ui/button";
import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "./store";
import { Lock, Mail } from "lucide-react";
import { BsPersonCheck } from "react-icons/bs";

const Form = ({ children, ...props }) => {
  return (
    <form {...props} className="space-y-4 ">
      {children}
    </form>
  );
};
const Field = ({ children }) => {
  return <div className="block">{children}</div>;
};
const Label = ({ children, htmlFor }) => {
  return (
    <label
      htmlFor={htmlFor}
      className="text-sm text-gray-600 tracking-wide block mb-1  "
    >
      {children}
    </label>
  );
};

const Input = ({ className = "", icon: Icon, ...props }) => {
  return (
    <div className="flex items-center border-2 px-2 rounded-xl py-2">
      {Icon && <Icon className="text-gray-400 mr-2" size={18} />}
      <input
        {...props}
        className={`outline-none  w-full rounded-md font-medium font-serif ${className}`}
      />
    </div>
  );
};

const Signup = () => {
  const { Signup } = useAuth();

  const handleSignUp = async (e) => {
    e.preventDefault();
    await Signup();
  };
  return (
    <>
      <div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Sign Up</h1>
        <p className="text-gray-500 mb-6">
          Enter your credentials to access your account
        </p>
        <Form onSubmit={handleSignUp}>
          <Field>
            <Label htmlFor={"fullName"}>Name</Label>
            <Input
              icon={BsPersonCheck}
              placeholder="John"
              name="fullName"
            ></Input>
          </Field>
          <Field>
            <Label htmlFor={"email"}>Email</Label>
            <Input
              icon={Mail}
              placeholder="john@gmail.com"
              name="email"
            ></Input>
          </Field>
          <Field>
            <Label htmlFor={"password"}>Password</Label>
            <Input
              type="password"
              placeholder="********"
              name="password"
              icon={Lock}
            ></Input>
          </Field>

          <Button
            type="submit"
            className="w-full text-lg rounded-xl text-white font-semibold 
              bg-linear-to-r from-green-400 to-emerald-500
              hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Signup
          </Button>
          <Link
            to="/login"
            className=" flex justify-center text-sm text-gray-500 "
          >
            Already have an account?
            <span className="text-green-400 font-medium tracking-wide">
              Login
            </span>
          </Link>
        </Form>
      </div>
    </>
  );
};

export default Signup;
