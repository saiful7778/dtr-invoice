const AuthenticationLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gray-900 p-4 text-gray-100">
      <div className="w-full max-w-md rounded border border-gray-700 bg-gray-800 p-4">
        {children}
      </div>
    </div>
  );
};

export default AuthenticationLayout;
