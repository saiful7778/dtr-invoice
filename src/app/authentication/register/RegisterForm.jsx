"use client";
import { Input } from "@/components/formik/Input";
import Password from "@/components/formik/Password";
import { registerSchema } from "@/lib/schemas/authentication";
import { Form, Formik } from "formik";
import { Button } from "keep-react";

const RegisterForm = () => {
  const initialValues = {
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  const handleSubmit = async (e) => {
    console.log(e);
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
            required
          />
        </div>
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
        <Password
          name="confirmPassword"
          placeholder="Confirm password"
          label="Confirm password"
          required
        />
        <Button
          className="w-full rounded-full"
          color="primary"
          size="sm"
          type="submit"
        >
          Register
        </Button>
      </Form>
    </Formik>
  );
};

export default RegisterForm;
