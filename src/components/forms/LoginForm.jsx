"use client";
import Button from "@/components/Button";
import { Input } from "@/components/formik/Input";
import Password from "@/components/formik/Password";
import { DEFAULT_LOGIN } from "@/lib/routes";
import { loginSchema } from "@/lib/schemas/authentication";
import { Form, Formik } from "formik";
import { Spinner } from "keep-react";
import { signIn } from "next-auth/react";
import { useState } from "react";

const LoginForm = ({ searchParams }) => {
  const [spinner, setSpinner] = useState(false);

  const initialValues = {
    email: "",
    password: "",
  };

  const handleReset = (resetForm) => {
    return () => {
      resetForm();
      setSpinner(false);
    };
  };

  const handleSubmit = async (e, { resetForm }) => {
    setSpinner(true);
    const reset = handleReset(resetForm);
    await signIn("credentials", {
      email: e.email,
      password: e.password,
      redirect: true,
      callbackUrl: searchParams?.callbackUrl || DEFAULT_LOGIN,
    });
    reset();
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={loginSchema}
    >
      <Form className="space-y-4">
        <Input
          className="w-full"
          type="email"
          placeholder="Email address"
          label="Your email"
          name="email"
          disabled={spinner}
          required
        />
        <Password
          className="w-full"
          name="password"
          placeholder="Strong password"
          label="Password"
          disabled={spinner}
          required
        />
        <Button
          className="w-full rounded-full py-2"
          variant="primary"
          type="submit"
          disabled={spinner}
        >
          {spinner ? <Spinner color="info" /> : "Login"}
        </Button>
      </Form>
    </Formik>
  );
};

export default LoginForm;
