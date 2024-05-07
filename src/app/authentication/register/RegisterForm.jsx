"use client";
import { Input } from "@/components/formik/Input";
import Password from "@/components/formik/Password";
import createUser from "@/lib/actions/user/createUser";
import { registerSchema } from "@/lib/schemas/authentication";
import { Form, Formik } from "formik";
import { Spinner } from "keep-react";
import { useState } from "react";
import Alert from "@/lib/config/alert.config";
import Button from "@/components/Button";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

const RegisterForm = () => {
  const [spinner, setSpinner] = useState(false);
  const router = useRouter();

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
      router.push("/authentication/login");
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
      <Form className="space-y-4">
        <Input
          type="text"
          placeholder="Full name"
          label="Your name"
          name="fullName"
          disabled={spinner}
          required
        />
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
          className="w-full rounded-full py-2"
          variant="primary"
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
    callbackUrl: "/admin/dashboard",
  });
};

export default RegisterForm;
