import React from "react";

//page title 컴포넌트

const PageTitle = ({ title }: { title: string }) => {
  return <div className="py-4 text-2xl text-slate-200 font-bold">{title}</div>;
};

export default PageTitle;
