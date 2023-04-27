import React from "react";
import { BarLoader } from "react-spinners";

const LoadingPage = () => {
  return (
    <div className="flex h-screen justify-center items-center overflow-hidden">
      <div className="z-50">
        <BarLoader height={6} width={10000} color="#e50914" />
      </div>
    </div>
  );
};

export default LoadingPage;
