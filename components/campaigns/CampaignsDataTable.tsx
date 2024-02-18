"use client";
import React, { useState } from "react";
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { getCampaigns, getMenu, patchCampaign } from "@/lib/api";
import { PermissionsStore } from "@/store/permissions";
import { toRoundedPercentage } from "@/lib/helper";
import ToggleButton from "../common/ToggleButton";
import _ from "lodash";
import Skeleton from "../common/Skeleton";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { Column } from "react-table";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Paging from "../common/Paging";

const CampaignsDataTable = () => {
  // store에서 권한 상태 가져옴
  const auth = PermissionsStore((state) => state.Permissions);

  const [params, setParams] = useState({
    page: 1,
    size: 25,
    sort: "name,Asc",
  });

  // React query 캠페인 리스트 호출
  const { data, isFetching, isPlaceholderData } = useQuery<
    TCampaignData,
    Error
  >({
    queryKey: ["getCampaigns", params],
    queryFn: () =>
      getCampaigns({ page: params.page, size: params.size, sort: params.sort }),
    refetchOnWindowFocus: false,
    placeholderData: keepPreviousData,
  });

  const pageInfo = {
    lastPage: data?.total_pages,
    current: data?.number,
  };

  // React query 캠페인 상태 패치
  const mutation = useMutation({
    mutationFn: ({ id, enabled }: { id: number; enabled: boolean }) => {
      return patchCampaign({ id, enabled });
    },
    onMutate: async (variables) => {
      const previousValue = queryClient.getQueryData<TCampaignData>([
        "getCampaigns",
        params,
      ]);
      // 상태 수정을 위해 기존 query 데이터 호출
      const previousValueContent = _.map(previousValue?.content, (item) =>
        item.id === variables.id
          ? {
              ...item,
              enabled: !variables.enabled,
            }
          : item
      );
      console.log(previousValueContent);
      if (previousValue) {
        queryClient.setQueryData(
          ["getCampaigns", params],
          (oldData: TCampaignData) => {
            return {
              ...oldData,
              content: previousValueContent,
            };
          }
        ); //기존 데이터에서 변경된 상태 업데이트
      }
    },
  });

  const queryClient = useQueryClient();

  const columnDefs: GridColDef[] = [
    // 컬럼 정보
    { field: "id", hideable: false },
    {
      field: "enabled",
      headerName: "상태",
      width: 100,
      flex: 0,
      sortable: false,
      align: "center",
      headerAlign: "center",
      renderCell: ({ value, row }) => {
        return (
          <div className="flex h-full items-center">
            <ToggleButton
              state={value}
              disabled={auth === "VIEWER"}
              onClick={() => {
                mutation.mutate({
                  id: row.id,
                  enabled: value,
                });
              }}
            />
          </div>
        );
      },
    },
    {
      field: "name",
      headerName: "캠페인명",
      flex: 1,
      sortable: false,
    },
    {
      field: "campaign_objective",
      headerName: "캠페인 목적",
      flex: 2,
      sortable: false,
      valueFormatter: ({ value }) => {
        switch (value) {
          case "WEBSITE_CONVERSIONS":
            return "웹사이트 전환";
            break;
          case "WEBSITE_TRAFFIC":
            return "웹사이트 트래픽";
            break;
          case "SALES":
            return "판매";
            break;
          case "APP_INSTALLATION":
            return "앱설치";
            break;
          case "LEAD":
            return "리드";
            break;
          case "BRAND":
            return "브랜드 인지도 및 도달 범위";
            break;
          case "VIDEO_VIEWS":
            return "동영상 조회";
            break;
        }
      },
    },
    {
      field: "impressions",
      headerName: "노출수",
      sortable: false,
      align: "right",
      flex: 1,
      headerAlign: "right",
      valueFormatter: ({ value }) => {
        return value?.toLocaleString();
      },
    },
    {
      field: "clicks",
      headerName: "클릭수",
      sortable: false,
      align: "right",
      flex: 1,
      headerAlign: "right",
      valueFormatter: ({ value }) => {
        return value?.toLocaleString();
      },
    },
    {
      field: "ctr",
      headerName: "CTR",
      sortable: false,
      align: "right",
      flex: 1,
      headerAlign: "right",
      valueFormatter: ({ value }) => {
        return toRoundedPercentage(value);
      },
    },
    {
      field: "video_views",
      headerName: "동영상조회수",
      align: "right",
      flex: 1,
      headerAlign: "right",
    },
    {
      field: "vtr",
      headerName: "VTR",
      sortable: false,
      align: "right",
      flex: 1,
      headerAlign: "right",
      valueFormatter: ({ value }) => {
        return toRoundedPercentage(value);
      },
    },
  ];

  return (
    <>
      <div className="MuiDataGrid-Wisebird w-full max-h-[700px] h-full">
        <DataGrid
          rows={data?.content ?? []}
          columns={columnDefs}
          columnVisibilityModel={{
            id: false,
          }}
          loading={isFetching}
          rowHeight={40}
          columnHeaderHeight={40}
          hideFooter
          disableColumnFilter
          disableColumnMenu
          disableColumnSelector
          disableRowSelectionOnClick
        />
      </div>
      <Paging
        lastPage={pageInfo.lastPage ?? 0}
        current={pageInfo.current ?? 0}
        onChange={(page) => {
          setParams({
            ...params,
            page: page,
          });
        }}
      />
    </>
  );
};

export default CampaignsDataTable;
