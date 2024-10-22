
import { Home, ArrowLeft } from 'lucide-react';

const NoPath = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="max-w-xl w-full bg-white rounded-lg shadow-sm p-8">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-gray-900 mb-4">
            404
          </h1>

          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Page Not Found
          </h2>

          <p className="text-gray-600 mb-8">
            We couldn't find the page you're looking for. 
            Please check the URL or try navigating back.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a 
              href="/"
              className="flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-2 bg-blue-600 text-white font-medium rounded hover:bg-blue-700 transition-colors"
            >
              <Home className="w-4 h-4" />
              Home Page
            </a>

            <button 
              onClick={() => window.history.back()}
              className="flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-2 bg-white text-gray-700 font-medium rounded border border-gray-300 hover:bg-gray-50 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Go Back
            </button>
          </div>

          <p className="mt-8 text-sm text-gray-500">
            If you need assistance, please contact our support team.
          </p>
        </div>
      </div>
    </div>
  );
};

export default NoPath;