import Image from "next/image";
import Link from "next/link";
import React from "react";
import UserInfo from "./gnb/UserInfo";

import PermissionsSelector from "./gnb/PermissionsSelector";
import GnbMenu from "./gnb/GnbMenu";

const Gnb = () => {
  return (
    <nav className="flex w-full bg-gray-900 justify-between text-white">
      <div className="flex">
        <div className="flex h-full items-center">
          <Link
            href="/"
            className="flex flex-col h-fdivl items-center justify-center px-6"
          >
            <Image
              src="/logo.png"
              alt="wisebirds logo"
              width="41"
              height="22"
            />
            <h1 className="text-xs pt-1">Wisebirds</h1>
          </Link>
        </div>
        <GnbMenu />
      </div>
      <div className="flex h-16 items-center pr-4">
        <UserInfo />
        <PermissionsSelector />
      </div>
    </nav>
  );
};

export default Gnb;
