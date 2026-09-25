import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white dark:bg-[#020712] text-gray-900 dark:text-white flex items-center justify-center px-4">

      <div className="text-center">

        <h1 className="text-7xl font-bold text-blue-600">
          404
        </h1>

        <h2 className="text-3xl font-bold mt-4">
          Page Not Found
        </h2>

        <p className="text-gray-500 dark:text-gray-400 mt-3">
          The page you're looking for doesn't exist.
        </p>

        <button
          onClick={() => navigate("/home")}
          className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition"
        >
          Go Home
        </button>

      </div>

    </div>
  );
};

export default NotFound;