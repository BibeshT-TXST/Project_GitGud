export const BrandHeader = ({ title, subtitle }) => (
  <div className="text-center">
    <img className="mx-auto h-12 w-auto" src="/logo.svg" alt="Your Brand" />
    <h2 className="mt-6 text-3xl font-extrabold text-gray-900">{title}</h2>
    <p className="mt-2 text-sm text-gray-600">{subtitle}</p>
  </div>
);