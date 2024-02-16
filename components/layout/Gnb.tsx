import Image from "next/image";
import Link from "next/link";
import React from "react";

const Gnb = () => {
  return (
    <nav className="flex w-full bg-gray-900 justify-between">
      <ul className="flex text-white h-16">
        <li>
          <Link
            href="/"
            className="flex flex-col h-full items-center justify-center px-6"
          >
            <Image
              src="/logo.png"
              alt="wisebirds logo"
              width="41"
              height="22"
            />
            <h1 className="text-xs pt-1">Wisebirds</h1>
          </Link>
        </li>
        <li>
          <Link
            href="/"
            className="flex h-full items-center px-4 text- font-medium hover:bg-gray-800 transition-colors"
          >
            캠페인
          </Link>
        </li>
        <li>
          <Link
            href="/"
            className="flex h-full items-center px-4 font-medium hover:bg-gray-800 transition-colors"
          >
            사용자
          </Link>
        </li>
      </ul>
      <div className="flex h-16 items-center">
        <div className="text-white">user info</div>
        <div>authority</div>
      </div>
    </nav>
  );
};

export default Gnb;
