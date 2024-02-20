import React from "react";
import { motion } from "framer-motion";
import { motionDialogs } from "@/lib/motionVariants";
import { IoMdClose } from "react-icons/io";

// 공용 다이얼로그
const Dialogs = ({
  open,
  title,
  onClose,
  children,
  hideClose,
}: {
  open: boolean;
  title: string;
  onClose?: () => void;
  children: React.ReactNode;
  hideClose?: boolean;
}) => {
  return (
    <motion.div
      className="fixed left-0 top-0 w-full h-full z-10"
      variants={motionDialogs}
      initial={"closed"}
      animate={open ? "open" : "closed"}
    >
      <div
        className="absolute left-0 top-0 w-full h-full bg-gray-500 bg-opacity-75 transition-opacity"
        onClick={onClose}
      ></div>

      <div className="h-screen w-screen flex items-center justify-center p-4 text-center">
        <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all my-8 w-full max-w-lg">
          <div className="bg-white px-4 pb-4 pt-5 relative">
            <div className="border-b text-xl text-slate-700 font-bold pb-2">
              {title}
            </div>
            <div className="pt-4">{children}</div>
            {!hideClose && (
              <button
                className="transition-transform absolute right-4 top-4 text-slate-800 text-xl hover:scale-125"
                onClick={onClose}
              >
                <IoMdClose />
              </button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Dialogs;
