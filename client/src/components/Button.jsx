export const PrimaryButton = ({ label, isLoading, ...props }) => (
  <button
    disabled={isLoading}
    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none disabled:opacity-50"
    {...props}
  >
    {isLoading ? "Signing in..." : label}
  </button>
);