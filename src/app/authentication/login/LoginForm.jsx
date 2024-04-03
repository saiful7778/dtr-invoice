"use client";
import { Input } from "@/components/formik/Input";
import Password from "@/components/formik/Password";
import { loginSchema } from "@/lib/schemas/authentication";
import { Form, Formik } from "formik";
import { Button, Spinner } from "keep-react";
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
    try {
      await signIn("credentials", {
        email: e.email,
        password: e.password,
        redirect: true,
        callbackUrl: searchParams?.callbackUrl || "/admin/dashboard",
      });
    } catch (err) {
      console.error(err);
    } finally {
      reset();
    }
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
          disabled={spinner}
          required
        />
        <Password
          name="password"
          placeholder="Strong password"
          label="Password"
          disabled={spinner}
          required
        />
        <Button
          className="w-full rounded-full"
          color="primary"
          size="sm"
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
