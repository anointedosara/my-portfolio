"use client";

import { Toaster } from "react-hot-toast";

export function ToasterProvider() {
  return (
    <Toaster
      position="bottom-right"
      toastOptions={{
        style: {
          background: "rgb(28 30 43)",
          color: "#dee1e9",
          border: "1px solid rgb(44 47 64)",
          borderRadius: "12px",
        },
        success: { iconTheme: { primary: "#a78bfa", secondary: "#fff" } },
      }}
    />
  );
}
