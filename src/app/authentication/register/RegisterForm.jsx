"use client";
import { Input } from "@/components/formik/Input";
import Password from "@/components/formik/Password";
import createUser from "@/lib/actions/user/createUser";
import { registerSchema } from "@/lib/schemas/authentication";
import { Form, Formik } from "formik";
import { Button, Spinner } from "keep-react";
import { useState } from "react";
import { signIn } from "next-auth/react";
import Alert from "@/lib/config/alert.config";

const RegisterForm = () => {
  const [spinner, setSpinner] = useState(false);

  const initialValues = {
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
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
      const userData = {
        fullName: e.fullName,
        email: e.email,
        password: e.password,
      };
      await createUserData(userData);
    } catch (err) {
      console.error(err);
      Alert.fire({
        icon: "error",
        text: "Something went wrong",
      });
    } finally {
      reset();
    }
  };
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={registerSchema}
    >
      <Form className="space-y-2">
        <div className="flex gap-2">
          <Input
            type="text"
            placeholder="Full name"
            label="Your name"
            name="fullName"
            disabled={spinner}
            required
          />
        </div>
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
        <Password
          name="confirmPassword"
          placeholder="Confirm password"
          label="Confirm password"
          disabled={spinner}
          required
        />
        <Button
          className="w-full rounded-full"
          color="primary"
          size="sm"
          disabled={spinner}
          type="submit"
        >
          {spinner ? <Spinner color="info" /> : "Register"}
        </Button>
      </Form>
    </Formik>
  );
};

const createUserData = async (userData) => {
  await createUser(userData);
  Alert.fire({
    icon: "success",
    title: "Account is created!",
  });
  await signIn("credentials", {
    email: userData.email,
    password: userData.password,
    redirect: true,
    callbackUrl: "/",
  });
};

export default RegisterForm;
