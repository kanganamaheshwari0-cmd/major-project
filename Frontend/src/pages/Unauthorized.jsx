import { useNavigate } from "react-router-dom";

const Unauthorized = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#020712] text-white flex items-center justify-center">
      <div className="text-center">

        <h1 className="text-6xl font-bold text-red-500">
          403
        </h1>

        <h2 className="text-3xl font-bold mt-4">
          Unauthorized
        </h2>

        <p className="text-gray-400 mt-3">
          You do not have permission to access this page.
        </p>

        <button
          onClick={() => navigate("/home")}
          className="mt-6 bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl font-semibold"
        >
          Go Home
        </button>

      </div>
    </div>
  );
};

export default Unauthorized;