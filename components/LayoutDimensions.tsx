import React from "react";

export default function LayoutDimensions({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="max-w-[90rem] bg-slate-950 mx-auto">{children}</div>;
}
