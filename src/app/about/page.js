import React from "react";
import Navbar from "../components/Navbar";
import About from "../components/About";

export default function page() {
  return (
      <div className="h-full w-full flex flex-col justify-center">
            <Navbar/>
            <About/>
      </div>
  );
}
