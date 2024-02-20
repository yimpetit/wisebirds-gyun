"use client";
import React from "react";

// 공용 버튼 컴포넌트
const Button = ({
  name,
  color = "green",
  size = "normal",
  onClick,
  submit,
}: {
  name: string;
  onClick?: () => void;
  submit?: boolean;
  color?: "green" | "gray";
  size?: "normal" | "small";
}) => {
  return (
    <button
      className={
        "transition-colors rounded  py-1 " +
        (color === "green"
          ? "bg-w-green hover:bg-teal-700 "
          : "bg-slate-400 hover:bg-slate-500 ") +
        (size !== "normal" ? "text-xs px-2" : "px-4")
      }
      type={submit ? "submit" : "button"}
      onClick={onClick}
    >
      {name}
    </button>
  );
};

export default Button;
