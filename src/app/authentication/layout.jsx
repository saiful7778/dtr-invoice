const AuthenticationLayout = ({ children }) => {
  return (
    <div className="text-gray-100 bg-gray-900 flex h-screen w-full items-center justify-center overflow-hidden">
      <div className="border-gray-700 bg-gray-800 w-full max-w-md rounded border p-2">
        {children}
      </div>
    </div>
  );
};

export default AuthenticationLayout;
