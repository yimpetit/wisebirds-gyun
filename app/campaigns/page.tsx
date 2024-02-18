import CampaignsDataTable from "@/components/campaigns/CampaignsDataTable";
import PageTitle from "@/components/common/PageTitle";
import React from "react";

const Campaign = () => {
  return (
    <div className="h-full flex flex-col">
      <div className="flex-none">
        <PageTitle title="캠페인 관리" />
      </div>
      <div className="flex-1">
        <CampaignsDataTable />
      </div>
    </div>
  );
};

export default Campaign;
