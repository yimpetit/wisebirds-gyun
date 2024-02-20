import React, { InputHTMLAttributes, forwardRef } from "react";

//react hook form 연동 및 편의를 위한
//제목, 에러메세지, 및 필수여부 Prop

interface ICustomInputProps extends InputHTMLAttributes<HTMLInputElement> {
  title: string; // 인풋 위에 올라가는 제목
  errorMsg?: string; // 에러메세지 출력
  requiredLabel?: boolean; // 제목 옆 필수여부 display
  subButtonName?: string; // 인풋박스 옆에 들어갈 서브 버튼 여부 및 제목
  subButtonOnClick?: () => void; // 서브 버튼 클릭시 함수
}

const InputBox = forwardRef<HTMLInputElement, ICustomInputProps>(
  (
    {
      title,
      errorMsg,
      subButtonName,
      subButtonOnClick,
      requiredLabel,
      ...rest
    },
    ref
  ) => {
    return (
      <label className="block mb-4">
        <div className="flex justify-between items-center">
          <div className="relative px-3 py-1 text-sm font-medium text-slate-700 text-left pb-1 bg-slate-200 rounded-t overflow-hidden">
            {title}
            {requiredLabel && (
              <div className="absolute right-[-8px] top-[-8px] w-4 h-4 rotate-45 bg-w-red" />
            )}
          </div>
          <div
            className={
              "transition-all duration-500 text-w-red text-sm " +
              (errorMsg
                ? "opacity-1 translate-x-0"
                : "delay-500 opacity-0 translate-x-2")
            }
          >
            {errorMsg ? errorMsg : "👍"}
          </div>
        </div>
        <div className="flex gap-2">
          <input
            ref={ref}
            className="text-slate-700 text-sm transition-colors border-2 border-slate-200 w-full py-2 px-2 outline-0 focus:border-w-blue rounded-tr rounded-br rounded-bl"
            {...rest}
          />
          {subButtonName && (
            <button
              type="button"
              className="transition-colors w-24 py-2 rounded bg-slate-400 hover:bg-slate-500"
              onClick={subButtonOnClick}
            >
              {subButtonName}
            </button>
          )}
        </div>
      </label>
    );
  }
);

InputBox.displayName = "InputBox"; // eslint 오류 수정을 위한 컴포넌트 displaynmae 지정

export default InputBox;
