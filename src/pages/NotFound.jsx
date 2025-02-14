import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <section className="bg-gradient-to-br from-[#bd2ad6] to-[#35196a] min-h-[90vh] flex flex-col items-center justify-center px-6 text-center text-white">
      <h1 className="text-9xl font-bold text-red-500 drop-shadow-lg">404</h1>
      <h2 className="text-3xl font-semibold mt-4">Oops! Page Not Found</h2>
      <p className="text-lg mt-2 text-gray-300">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link
        to="/"
        className="mt-6 px-6 py-3 bg-indigo-600 text-white text-lg font-semibold rounded-lg shadow-lg hover:bg-indigo-700 transition duration-300 transform hover:scale-105"
      >
        Go Back Home
      </Link>
    </section>
  );
};

export default NotFound;
