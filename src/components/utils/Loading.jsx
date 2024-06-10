import React from "react";

const Loading = () => {
  const loaderStyles = {
    position: "relative",
    width: "80px",
    height: "80px",
    border: "8px solid rgba(0, 0, 0, 0.1)",
    borderTopColor: "#6366f1",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  };

  const loaderInnerStyles = {
    position: "absolute",
    top: "50%",
    left: "50%",
    width: "60px",
    height: "60px",
    backgroundColor: "#6366f1", 
    borderRadius: "50%",
    transform: "translate(-50%, -50%)",
    animation: "pulse 1s ease-in-out infinite",
    opacity: "0.8",
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="loader mb-52" style={loaderStyles}>
        <div className="loader-inner" style={loaderInnerStyles}></div>
      </div>
    </div>
  );
};

export default Loading;
