"use client";
import { getPermissionsInfo } from "@/lib/api";
import { PermissionsStore } from "@/store/permissions";
import { useQuery } from "@tanstack/react-query";
import { FaAngleDown } from "react-icons/fa";
import _ from "lodash";
import { useState } from "react";
import { motion } from "framer-motion";
import { motionSelectBoxPopup } from "@/lib/motionVariants";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const PermissionsSelector = () => {
  //select Box 상태관리
  const [permission, setPermission] = useState("어드민"); //선택값
  const [isOpen, setIsOpen] = useState(false); //열림 닫힘 상태

  // 변경된 권한 적용
  const setPermissions = PermissionsStore((state) => state.setPermissions);

  // React query 권한 정보 호출
  const { data, isLoading } = useQuery<TPermissions[], Error>({
    queryKey: ["getPermissionsInfo"],
    queryFn: getPermissionsInfo,
  });

  return (
    <div
      className="relative cursor-pointer"
      onMouseLeave={() => setIsOpen(false)}
    >
      <div
        className="flex justify-between items-center w-40 px-2 bg-white rounded-md h-8 border-w-green border-2 text-slate-800"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="text-sm font-bold">
          {isLoading ? (
            <AiOutlineLoading3Quarters className="animate-spin" />
          ) : (
            permission
          )}
        </div>
        <div>
          <FaAngleDown />
        </div>
      </div>
      {data && (
        <motion.div
          animate={isOpen ? "open" : "closed"}
          variants={motionSelectBoxPopup}
          initial="closed"
          className="absolute left-0 top-full text-sm bg-white rounded-md w-full text-slate-700 border-white overflow-hidden z-50"
        >
          {_.map(data, (item, idx) => (
            <div
              key={idx}
              className={
                "transition-all px-2 py-2 border-l-2 border-l-white hover:bg-slate-100 hover:border-l-slate-100" +
                (idx === 0 ? "" : " border-t")
              }
              onClick={() => {
                setPermission(item.name);
                setPermissions(item.permission);
                setIsOpen(false);
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

export default PermissionsSelector;
