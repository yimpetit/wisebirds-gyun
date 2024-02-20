"use client";
import React, { useEffect, useState } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getUsers } from "@/lib/api";
import { PermissionsStore } from "@/store/permissions";
import _ from "lodash";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Paging from "../common/Paging";
import Selector from "../common/Selector";
import { FaLongArrowAltDown } from "react-icons/fa";
import dayjs from "dayjs";
import UserCreateButton from "./UserCreateButton";
import UserModifyDialog from "./UserModifyDialog";
import Button from "../common/Button";
import { redirect } from "next/navigation";

const UsersDataTable = () => {
  // store에서 권한 상태 가져옴
  const auth = PermissionsStore((state) => state.Permissions);

  const [params, setParams] = useState({
    page: 1,
    size: 25,
    sort: "email,Asc",
  });

  const [userModifyDialogData, setUserModifyDialogData] =
    useState<TUserDataContent>();

  // React query 캠페인 리스트 호출
  const { data, isFetching } = useQuery<TUserData, Error>({
    queryKey: ["getUsers", params],
    queryFn: () =>
      getUsers({ page: params.page, size: params.size, sort: params.sort }),
    placeholderData: keepPreviousData,
  });

  const pageInfo = {
    lastPage: data?.total_pages,
    current: data?.number,
  };

  const columnDefs: GridColDef[] = [
    // 컬럼 정보
    { field: "id", hideable: false },
    {
      field: "email",
      headerName: "아이디",
      flex: 1,
      sortable: false,
    },
    {
      field: "name",
      headerName: "이름",
      flex: 1,
      sortable: false,
    },
    {
      field: "last_login_at",
      headerName: "마지막 로그인 일시",
      sortable: false,
      flex: 1,
      valueFormatter: ({ value }) => {
        return value ? dayjs(value).format("YYYY-MM-DD HH:mm:ss") : "-";
      },
    },
    {
      field: "modify",
      headerName: "수정",
      sortable: false,
      align: "center",
      flex: 0,
      headerAlign: "center",
      renderCell: ({ row }) => {
        return (
          <Button
            name="수정"
            size="small"
            color="gray"
            onClick={() => {
              setUserModifyDialogData(_.find(data?.content, { id: row.id }));
            }}
          />
        );
      },
    },
  ];

  useEffect(() => {
    // users 페이지 권한 처리
    if (auth !== "ADMIN") {
      alert("권한이 없습니다.");
      redirect("/campaigns");
    }
  }, [auth]);

  return (
    <>
      <div className="flex gap-4 pb-3 justify-between">
        <div className="flex items-center">
          <div className="flex gap-2">
            <Selector
              options={[
                {
                  name: "아이디",
                  value: "email",
                },
                {
                  name: "이름",
                  value: "name",
                },
                {
                  name: "마지막 로그인 일시",
                  value: "last_login_at",
                },
              ]}
              onChange={(value) => {
                setParams({
                  ...params,
                  sort: value + "," + params.sort.split(",")[1],
                });
              }}
            />
            <button
              className={
                "transition-all text-slate-400 " +
                (params.sort.indexOf("Asc") === -1 ? "rotate-180" : "")
              }
              onClick={() => {
                const sortInfo = params.sort.split(",");
                setParams({
                  ...params,
                  sort:
                    sortInfo[0] +
                    "," +
                    (sortInfo[1] === "Asc" ? "Desc" : "Asc"),
                });
              }}
            >
              <FaLongArrowAltDown />
            </button>
          </div>
          <div className="text-sm text-slate-400">
            총 사용자 수 : {data?.total_elements}
          </div>
        </div>
        <div>
          <UserCreateButton params={params} />
        </div>
      </div>
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
      <UserModifyDialog
        params={params}
        data={userModifyDialogData}
        onClose={() => {
          setUserModifyDialogData(undefined);
        }}
      />
    </>
  );
};

export default UsersDataTable;
