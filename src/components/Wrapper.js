import React from "react";

export default function Wrapper({ children }) {
  return (
    <div
      style={{
        maxWidth: "1280px",
        margin: "0 auto",
        paddingInline: "10px",
        // backgroundColor: "red",
      }}
    >
      {children}
    </div>
  );
}
