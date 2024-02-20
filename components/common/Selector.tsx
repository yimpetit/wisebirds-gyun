"use client";
import { FaAngleDown } from "react-icons/fa";
import _ from "lodash";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { motionSelectBoxPopup } from "@/lib/motionVariants";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const Selector = ({
  options, // 셀렉트 옵션
  isLoading, // 로딩 여부
  onChange,
  defaulatValue, //기본 선택값
  disableOptions, //옵션 disable
}: {
  options: {
    name: string;
    value: string;
  }[];
  defaulatValue?: {
    name: string;
    value: string;
  };
  isLoading?: boolean;
  onChange: (value: any) => void;
  disableOptions?: boolean[];
}) => {
  const [value, setValue] = useState(""); //선택값
  const [isOpen, setIsOpen] = useState(false); //열림 닫힘 상태

  useEffect(() => {
    // 기본값이 지정 되지 않을 경우 옵션값의 첫번째로 설정
    if (value === "" && options.length !== 0)
      setValue(defaulatValue ? defaulatValue.name : options[0]?.name);
  }, [options, value]);

  return (
    <div className="relative" onMouseLeave={() => setIsOpen(false)}>
      <div
        className="flex justify-between items-center w-40 px-2 bg-white rounded-md h-8 border-w-green border-2 text-slate-800 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="text-sm font-bold">
          {isLoading ? (
            <AiOutlineLoading3Quarters className="animate-spin" />
          ) : (
            value
          )}
        </div>
        <div>
          <FaAngleDown />
        </div>
      </div>
      {options && (
        <motion.div
          animate={isOpen ? "open" : "closed"}
          variants={motionSelectBoxPopup}
          initial="closed"
          className="absolute left-0 top-full text-sm bg-white rounded-md w-full text-slate-700 border-white overflow-hidden z-50"
        >
          {_.map(options, (item, idx) => (
            <div
              key={idx}
              className={
                "transition-all px-2 py-2 border-l-2 border-l-white" +
                (idx === 0 ? "" : " border-t") +
                (disableOptions?.[idx]
                  ? " text-slate-300"
                  : " hover:bg-slate-100 hover:border-l-slate-100 cursor-pointer")
              }
              onClick={() => {
                if (!disableOptions?.[idx]) {
                  onChange(item.value);
                  setValue(item.name);
                  setIsOpen(false);
                }
              }}
            >
              {item.name}
            </div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default Selector;
