"use client";
import { getLoginUserInfo } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { FaAngleDown, FaUserCircle } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
import { motion } from "framer-motion";
import { motionArrow, motionUserPopup } from "@/lib/motionVariants";
import Skeleton from "../../common/Skeleton";

const UserInfo = () => {
  // 팝업 상태관리
  const [isOpen, setIsOpen] = useState(false);

  // React query 로그인 된 사용자 정보 호출
  const { data, isLoading } = useQuery<TMe, Error>({
    queryKey: ["getLoginUserInfo"],
    queryFn: getLoginUserInfo,
  });

  return (
    <div className="relative mr-4">
      <div
        className="flex gap-2 items-center cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="translate-y-0.5 text-slate-400">
          <FaUserCircle />
        </div>
        <div className="text-sm">
          {isLoading ? (
            <Skeleton tailWindClass="w-20 h-6 bg-gray-600" />
          ) : (
            data?.email
          )}
        </div>
        <motion.div animate={isOpen ? "up" : "down"} variants={motionArrow}>
          <FaAngleDown />
        </motion.div>
      </div>
      <motion.div
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        variants={motionUserPopup}
        className="absolute left-0 top-8 min-w-full rounded px-2 py-1 bg-gray-800 border border-2 border-w-green text-slate-300"
      >
        <div className="flex gap-1 items-end text-xl border-b pt-1 pb-2 mb-2 text-slate-300 border-gray-500">
          <div>{data?.name}</div>
          <div className="text-xs py-1 text-slate-400">
            {data?.company.name}
          </div>
        </div>
        <div className="pb-2 flex gap-1 text-sm text-slate-300 items-center">
          <IoIosMail />
          <div>{data?.email}</div>
        </div>
      </motion.div>
    </div>
  );
};

export default UserInfo;
