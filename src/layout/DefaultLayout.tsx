import React from "react";
import Footer from "../components/Footer/Footer";
import Navbar from "../components/Navbar/Navbar";

interface DefaultLayoutProps {
  children: React.ReactNode;
}

function DefaultLayout({ children }: DefaultLayoutProps) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}

export default DefaultLayout;
