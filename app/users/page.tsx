import React from "react";
import PageTitle from "@/components/common/PageTitle";
import UsersDataTable from "@/components/users/UsersDataTable";

const Users = () => {
  return (
    <div className="h-full flex flex-col">
      <div className="flex-none">
        <PageTitle title="사용자 관리" />
      </div>
      <div className="flex-1 relative">
        <UsersDataTable />
      </div>
    </div>
  );
};

export default Users;
