import React from "react";
import { LuSparkles } from "react-icons/lu";

const Logo = () => {
  return (    
        <div className="d-flex align-items-center gap-2">
          <div className="logobox d-flex justify-content-center align-items-center">
            <LuSparkles className="logo" />
          </div>
          <h2 className="m-0 text-light" style={{ fontSize: "20px" }}>
            ElevateAI
          </h2>
        </div>

  );
};

export default Logo;
