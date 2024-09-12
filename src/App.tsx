import React from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/footer";

function App() {
  return (
    <div className="App flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        {/* Other components like Course List, Instructor Info, etc. */}
      </main>
      <Footer />
    </div>
  );
}

export default App;
