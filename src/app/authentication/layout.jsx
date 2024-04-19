const AuthenticationLayout = ({ children }) => {
  return (
    <div className="bg flex min-h-screen w-full items-center justify-center p-4">
      <div className="flex w-full max-w-4xl flex-col overflow-hidden rounded-md border border-royal-blue/10 bg-gray-50 shadow-xl dark:bg-gray-800 dark:text-gray-50 md:flex-row">
        {children}
      </div>
    </div>
  );
};

export default AuthenticationLayout;
