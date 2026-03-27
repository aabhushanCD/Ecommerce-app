import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./store";
import { Lock, Mail } from "lucide-react";
import { BsPersonCheck } from "react-icons/bs";
import { Label } from "@/components/customs/Label";
import { Input } from "@/components/customs/Input";
import { Field } from "@/components/customs/Field";
import { Form } from "@/components/customs/Form";
import { useForm } from "./form.hook";
import Button from "@/components/customs/Button";

const Signup = () => {
  const { Signup } = useAuth();
  const { loading, handleInputChange, handleSubmit } = useForm();
  const navigate = useNavigate();
  const onSignup = async (data) => {
    await Signup(data);
    navigate("/login");
  };
  return (
    <>
      <div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Sign Up</h1>
        <p className="text-gray-500 mb-6">
          Enter your credentials to access your account
        </p>
        <Form onSubmit={handleSubmit(onSignup)}>
          <Field>
            <Label htmlFor={"name"}>Name</Label>
            <Input
              onChange={handleInputChange}
              icon={BsPersonCheck}
              placeholder="John"
              name="name"
            ></Input>
          </Field>
          <Field>
            <Label htmlFor={"email"}>Email</Label>
            <Input
              onChange={handleInputChange}
              icon={Mail}
              placeholder="john@gmail.com"
              name="email"
            ></Input>
          </Field>
          <Field>
            <Label htmlFor={"password"}>Password</Label>
            <Input
              onChange={handleInputChange}
              type="password"
              placeholder="********"
              name="password"
              icon={Lock}
            ></Input>
          </Field>

          {!loading && <Button type="submit">Signup</Button>}
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
