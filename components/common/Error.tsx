"use client";
import React, { useState } from "react";
import Dialogs from "./Dialogs";
import { IoMdMail } from "react-icons/io";
import Button from "./Button";
import { ErrorStore } from "@/store/error";

// 전체 에러
const Error = () => {
  // store에서 에러 상태 가져옴
  const open = ErrorStore((state) => state.Error);
  const setErrors = ErrorStore((state) => state.setError);

  return (
    <Dialogs open={open} title={"ERROR"} hideClose>
      <p className="text-slate-700 border-b pb-6 mb-2">
        에러가 발생했습니다.
        <br />
        같은 현상이 반복되면 고객센터로 문의바랍니다.
      </p>
      <div className="flex justify-between items-end pb-2">
        <p className="text-sm text-slate-400">
          고객센터
          <br />
          <IoMdMail className="inline mr-1 translate-y-[-2px]" />
          helpdesk@wisebirds.ai
        </p>
        <Button name="확인" onClick={() => setErrors(false)} />
      </div>
    </Dialogs>
  );
};

export default Error;
