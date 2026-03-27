import { Mail, Lock, CheckCircle, Eye } from "lucide-react";
import React from "react";

import { Label } from "@/components/customs/Label";
import { Field } from "@/components/customs/Field";
import { Input } from "@/components/customs/Input";
import { Form } from "@/components/customs/Form";
import Button from "@/components/customs/Button";
import Error from "@/components/customs/Error";
import { useNavigate } from "react-router-dom";
import { useForm } from "./form.hook";
import Loading from "@/components/customs/Loading";
import { useAuth } from "./store";

const Login = () => {
  const navigate = useNavigate();
  const { login, error } = useAuth();
  const { loading, handleInputChange, handleSubmit } = useForm();

  const onLogin = async (data) => {
    await login(data);
    navigate("/");
  };
  return (
    <div className="">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Log In</h1>
      <p className="text-gray-500 mb-6">
        Enter your credentials to access your account
      </p>

      {/* Email */}
      <Form onSubmit={handleSubmit(onLogin)}>
        <Field className="mb-5">
          <Label className="text-sm text-gray-600">Email</Label>
          <Error></Error>
          <Input
            onChange={handleInputChange}
            type="text"
            name="email"
            icon={Mail}
            placeholder="you@example.com"
            className="w-full outline-none px-2"
          />
        </Field>

        {/* Password */}
        <Field className="mb-6">
          <Label className="text-sm text-gray-600">Password</Label>
          <Input
            onChange={handleInputChange}
            icon={Lock}
            name="password"
            placeholder="••••••••••••"
            className="w-full outline-none px-2"
          />
        </Field>

        {/* Button */}
        {!loading ? <Button type="submit">Login</Button> : <Loading />}
      </Form>
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
