export const AuthContainer = ({ children }) => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
    <div className="max-w-md w-full space-y-8 p-10 bg-white rounded-xl shadow-lg">
      {children}
    </div>
  </div>
);