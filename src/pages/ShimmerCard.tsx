// ShimmerCard.tsx

const ShimmerCard: React.FC = () => {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden animate-pulse">
        {/* Simulate image */}
        <div className="w-full h-48 bg-gray-300 dark:bg-gray-700"></div>
  
        {/* Simulate title and description */}
        <div className="p-6">
          {/* Simulate title */}
          <div className="h-6 bg-gray-300 dark:bg-gray-700 mb-4 rounded"></div>
  
          {/* Simulate lines of text */}
          <div className="h-4 bg-gray-300 dark:bg-gray-700 mb-2 rounded"></div>
          <div className="h-4 bg-gray-300 dark:bg-gray-700 mb-2 rounded"></div>
          <div className="h-4 bg-gray-300 dark:bg-gray-700 mb-4 rounded"></div>
  
          {/* Simulate button */}
          <div className="w-1/2 h-10 bg-gray-300 dark:bg-gray-700 rounded"></div>
        </div>
      </div>
    );
  };
  
  export default ShimmerCard;
  

  export const ShimmerCard1= () => (
    <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-sm animate-pulse">
      <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
      <div className="space-y-2 mb-4">
        <div className="h-4 bg-gray-200 rounded w-full"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
      </div>
      <div className="h-10 bg-gray-200 rounded"></div>
    </div>
  );