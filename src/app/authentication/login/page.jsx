import LoginForm from "./LoginForm";

export const metadata = {
  title: "Login - authentication",
  description: "This is user login page",
};

const LoginPage = () => {
  return (
    <>
      <h4 className="text-center">Login</h4>
      <LoginForm />
    </>
  );
};

export default LoginPage;
