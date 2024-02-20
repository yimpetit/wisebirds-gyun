import React from "react";
import _ from "lodash";
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
  MdOutlineKeyboardDoubleArrowLeft,
  MdOutlineKeyboardDoubleArrowRight,
} from "react-icons/md";

const Paging = ({ lastPage, current, onChange }: TPaging) => {
  const pageSize = 10; // 페이지 그룹 사이즈
  const currentPageGroup = Math.ceil(current / pageSize); //현제 페이지 그룹
  const pages = Array.from(
    { length: pageSize },
    (_, i) => i + 1 + (currentPageGroup - 1) * pageSize
  ); // 페이지 생성
  return (
    <div className="flex justify-center items-center pt-4">
      {/* 이전 그룹 */}
      <button
        className={
          "transition-all flex items-center justify-center w-8 h-8 text-2xl font-bold rounded hover:scale-125 disabled:opacity-25"
        }
        onClick={() => onChange((currentPageGroup - 1) * pageSize)}
        disabled={current <= pageSize}
      >
        <MdOutlineKeyboardDoubleArrowLeft />
      </button>
      {/* 이전 페이지 */}
      <button
        className={
          "transition-all flex items-center justify-center w-8 h-8 text-2xl font-bold rounded hover:scale-125 disabled:opacity-25"
        }
        onClick={() => onChange(current - 1)}
        disabled={current === 1}
      >
        <MdOutlineKeyboardArrowLeft />
      </button>
      <ul className="flex gap-2 justify-center">
        {_.map(pages, (page) => (
          <li key={page}>
            <button
              className={
                "transition-all w-8 h-8 text-center text-sm font-medium rounded border-2 hover:bg-slate-600 " +
                (current === page
                  ? "bg-w-red border-w-red hover:bg-w-red"
                  : "border-slate-700 bg-slate-700 text-slate-200")
              }
              onClick={() => onChange(page)}
            >
              {page}
            </button>
          </li>
        ))}
      </ul>

      {/* 다음 페이지 */}
      <button
        className={
          "transition-all flex items-center justify-center w-8 h-8 text-2xl font-bold rounded hover:scale-125 disabled:opacity-25"
        }
        onClick={() => onChange(current + 1)}
        disabled={current === lastPage}
      >
        <MdOutlineKeyboardArrowRight />
      </button>

      {/* 다음 그룹 */}
      <button
        className={
          "transition-all flex items-center justify-center w-8 h-8 text-2xl font-bold rounded hover:scale-125 disabled:opacity-25"
        }
        onClick={() => onChange(currentPageGroup + pageSize)}
        disabled={current > lastPage - pageSize}
      >
        <MdOutlineKeyboardDoubleArrowRight />
      </button>
    </div>
  );
};

export default Paging;
