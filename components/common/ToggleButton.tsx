"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { motionToggle } from "@/lib/motionVariants";

// 토글버튼
const ToggleButton = ({
  state,
  disabled,
  onClick,
}: {
  state: boolean;
  disabled: boolean;
  onClick: () => void;
}) => {
  return (
    <div
      onClick={() => {
        !disabled && onClick();
      }}
      className={
        "transition-all flex w-8 h-4 rounded-full px-[2px] items-center " +
        (state ? "bg-w-blue" : "bg-slate-400") +
        (disabled ? " opacity-50" : " opacity-100 cursor-pointer")
      }
    >
      <motion.div
        className={"w-3 h-3 bg-white rounded-full"}
        initial={state ? "on" : "off"}
        animate={state ? "on" : "off"}
        variants={motionToggle}
        transition={{ duration: 0.5 }}
      />
    </div>
  );
};

export default ToggleButton;
