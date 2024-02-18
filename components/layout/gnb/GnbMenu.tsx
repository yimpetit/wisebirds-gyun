"use client";
import React from "react";
import { PermissionsStore } from "@/store/permissions";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { getMenu } from "@/lib/api";
import { motion } from "framer-motion";
import _ from "lodash";
import { motionMenuDrop } from "@/lib/motionVariants";

const GnbMenu = () => {
  // store에서 권한 상태 가져옴
  const auth = PermissionsStore((state) => state.Permissions);

  // React query 로그인 된 사용자 정보 호출
  const { data, isLoading } = useQuery<TMenu[], Error>({
    queryKey: ["getMenu"],
    queryFn: getMenu,
  });

  return (
    <ul className="flex h-16">
      {_.map(data, (item) => (
        <motion.li
          variants={motionMenuDrop}
          initial={"loading"}
          animate={
            !isLoading && item.role.indexOf(auth) !== -1 ? "loaded" : "loading"
          }
          key={item.id}
        >
          <Link
            href="/"
            className="flex h-full items-center px-4 text- font-medium hover:bg-gray-800 transition-colors"
          >
            {item.name}
          </Link>
        </motion.li>
      ))}
    </ul>
  );
};

export default GnbMenu;
