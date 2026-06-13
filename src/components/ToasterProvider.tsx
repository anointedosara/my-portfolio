"use client";

import { Toaster } from "react-hot-toast";

export function ToasterProvider() {
  return (
    <Toaster
      position="bottom-right"
      toastOptions={{
        style: {
          background: "rgb(18 18 32)",
          color: "#f0f0f8",
          border: "1px solid rgb(38 38 56)",
          borderRadius: "12px",
        },
        success: { iconTheme: { primary: "#cd5ff8", secondary: "#fff" } },
      }}
    />
  );
}
