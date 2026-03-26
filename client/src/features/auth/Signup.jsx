import { Button } from "@/components/ui/button";
import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "./store";

const Form = ({ children }) => {
  return <form className="space-y-4 ">{children}</form>;
};
const Field = ({ children }) => {
  return <div className="block">{children}</div>;
};
const Label = ({ children, htmlFor }) => {
  return (
    <label
      htmlFor={htmlFor}
      className="text-slate-500 text-sm tracking-wide block font-semibold "
    >
      {children}
    </label>
  );
};

const Input = ({ className = "", ...props }) => {
  return (
    <input
      {...props}
      className={`border-2 px-2 py-2 mt-1 w-full rounded-md font-medium font-serif ${className}`}
    />
  );
};

const Signup = () => {
  const { Signup } = useAuth();

  const handleSignUp = async (e) => {
    e.preventDefault();
    await Signup;
  };
  return (
    <>
      <div>
        <Form>
          <Field>
            <Label>Name</Label>
            <Input placeholder="John" name="fullName"></Input>
          </Field>
          <Field>
            <Label>Email</Label>
            <Input placeholder="john@gmail.com" name="email"></Input>
          </Field>
          <Field>
            <Label>Password</Label>
            <Input
              type="password"
              placeholder="********"
              name="password"
            ></Input>
          </Field>
          <Link to="/login" className=" flex justify-center text-sm">
            Sign-In page
          </Link>
          <Button className="flex m-auto text-lg" onClick={handleSignUp}>
            Sign Up
          </Button>
        </Form>
      </div>
    </>
  );
};

export default Signup;
