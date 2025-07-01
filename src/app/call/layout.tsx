import React, { ReactNode } from "react";

interface CallLayoutProps {
  children: ReactNode;
}

const layout = ({ children }: CallLayoutProps) => {
  return <div className="h-screen bg-black">{children}</div>;
};

export default layout;
