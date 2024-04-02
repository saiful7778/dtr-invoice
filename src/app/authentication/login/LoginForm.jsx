"use client";
import { Input } from "@/components/formik/Input";
import Password from "@/components/formik/Password";
import { loginSchema } from "@/lib/schemas/authentication";
import { Form, Formik } from "formik";
import { Button } from "keep-react";

const LoginForm = () => {
  const initialValues = {
    email: "",
    password: "",
  };
  const handleSubmit = async (e) => {
    console.log(e);
  };
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={loginSchema}
    >
      <Form className="space-y-2">
        <Input
          type="email"
          placeholder="Email address"
          label="Your email"
          name="email"
          required
        />
        <Password
          name="password"
          placeholder="Strong password"
          label="Password"
          required
        />
        <Button
          className="w-full rounded-full"
          color="primary"
          size="sm"
          type="submit"
        >
          Login
        </Button>
      </Form>
    </Formik>
  );
};

export default LoginForm;
