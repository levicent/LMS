
import { Home, ArrowLeft, Ghost } from 'lucide-react';

const NoPath = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6 relative overflow-hidden">
      {/* Animated floating ghosts in background */}
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="absolute opacity-10 animate-floating"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animation: `float ${6 + i}s ease-in-out infinite`,
            animationDelay: `${i * 0.5}s`
          }}
        >
          <Ghost 
            size={32 + (i * 8)} 
            className="text-gray-400"
          />
        </div>
      ))}

      <div className="max-w-xl w-full bg-white rounded-2xl shadow-lg p-8 relative">
        <div className="text-center">
          <div className="flex items-center justify-center gap-4 mb-6">
            <span className="text-8xl font-bold text-gray-800">4</span>
            <Ghost size={80} className="text-gray-600 animate-bounce" />
            <span className="text-8xl font-bold text-gray-800">4</span>
          </div>

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
              className="flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 
                       bg-gray-800 text-white font-medium rounded-lg
                       hover:bg-gray-900 transition-all duration-300
                       hover:shadow-lg"
            >
              <Home className="w-4 h-4" />
              Home Page
            </a>

            <button
              onClick={() => window.history.back()}
              className="flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 
                       bg-white text-gray-700 font-medium rounded-lg border border-gray-200
                       hover:bg-gray-50 hover:border-gray-300 transition-all duration-300"
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

      {/* Add custom keyframes for floating animation */}
      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0);
          }
          33% {
            transform: translateY(-20px) translateX(10px);
          }
          66% {
            transform: translateY(20px) translateX(-10px);
          }
        }
        .animate-floating {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default NoPath;