const AuthenticationLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gray-900 p-4 text-gray-100">
      <div className="flex w-full max-w-4xl flex-col rounded border border-gray-700 bg-gray-800 md:flex-row">
        {children}
      </div>
    </div>
  );
};

export default AuthenticationLayout;
