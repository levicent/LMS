import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { useTheme } from "../../context/themeContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SearchBar() {
  const themeContext = useTheme();
  const { theme } = themeContext;
  const [searchQuery, setSearchQuery] = useState(""); 
  const navigate = useNavigate(); 

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Redirect to the search results page with the query as a URL parameter
      navigate(`/search?query=${searchQuery}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className="relative">
      <input
        type="text"
        placeholder="Search for anything"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className={`w-64 pl-10 pr-4 py-2 rounded-md text-sm ${
          theme === "dark"
            ? "bg-gray-700 text-white placeholder-gray-400"
            : "bg-gray-100 text-gray-900 placeholder-gray-500"
        }`}
      />
      <button
        type="submit"
        className={`absolute left-3 top-2.5 ${
          theme === "dark" ? "text-gray-400" : "text-gray-500"
        }`}
      >
        <MagnifyingGlassIcon className="h-5 w-5" />
      </button>
    </form>
  );
}

export default SearchBar;








//OPTIONAL ONE MAY DELETE 
export const MobileSearchBar = () => {
    const { theme } = useTheme();
    const [isExpanded, setIsExpanded] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();
  
    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (searchQuery.trim()) {
        navigate(`/search?query=${searchQuery}`);
        setIsExpanded(false);
      }
    };
  
    return (
      <div className="flex items-center lg:hidden">
        {!isExpanded ? (
          <>
            {/* Search Icon Button */}
            <button
              onClick={() => setIsExpanded(true)}
              className={`p-2 rounded-full ${
                theme === "dark"
                  ? "text-gray-400 hover:text-white"
                  : "text-gray-500 hover:text-gray-600"
              }`}
              aria-label="Open search"
            >
              <MagnifyingGlassIcon className="h-6 w-6" />
            </button>
  
            
          </>
        ) : (
          <div className="flex items-center gap-2 w-full max-w-[calc(100vw-2rem)]">
            <form onSubmit={handleSearch} className="flex-1 relative">
              <input
                type="text"
                placeholder="Search for anything"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
                className={`w-full pl-10 pr-4 py-2 rounded-lg text-sm ${
                  theme === "dark"
                    ? "bg-gray-800 text-white placeholder-gray-400"
                    : "bg-gray-100 text-gray-900 placeholder-gray-500"
                }`}
              />
              <MagnifyingGlassIcon 
                className={`absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 ${
                  theme === "dark" ? "text-gray-400" : "text-gray-500"
                }`} 
              />
            </form>
            <button
              onClick={() => {
                setIsExpanded(false);
                setSearchQuery("");
              }}
              className={`p-2 rounded-full flex-shrink-0 ${
                theme === "dark"
                  ? "text-gray-400 hover:text-white"
                  : "text-gray-500 hover:text-gray-600"
              }`}
            >
            </button>
          </div>
        )}
      </div>
    );
  };

