import React, { ReactElement } from "react";

//화면 스켈레톤
const Skeleton = ({
  tailWindClass,
  children,
}: {
  tailWindClass: string;
  children?: ReactElement;
}) => {
  return (
    <div className={"animate-pulse rounded-md " + tailWindClass}>
      {children}
    </div>
  );
};

export default Skeleton;
