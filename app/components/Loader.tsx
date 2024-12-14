import React from "react";

function Loader() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="spinner border-4 border-blue-500 border-t-transparent rounded-full w-12 h-12 animate-spin"></div>
    </div>
  );
}

export default Loader;
