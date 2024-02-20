"use client";
import { getPermissionsInfo } from "@/lib/api";
import { PermissionsStore } from "@/store/permissions";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import _ from "lodash";
import Selector from "@/components/common/Selector";
import { usePathname } from "next/navigation";

const PermissionsSelector = () => {
  // 권한이 없는 페이지 식별을 위한 url get
  const pathName = usePathname().replace("/", "");

  // store에서 권한 상태 가져옴
  const auth = PermissionsStore((state) => state.Permissions);

  // 변경된 권한 적용
  const setPermissions = PermissionsStore((state) => state.setPermissions);

  // React query 권한 정보 호출
  const { data, isLoading } = useQuery<TPermissions[], Error>({
    queryKey: ["getPermissionsInfo"],
    queryFn: getPermissionsInfo,
  });

  const { data: menuData } = useQuery<TMenu[], Error>({
    queryKey: ["getMenu"],
  });

  const getPageAuto = _.find(menuData, {
    //현재 페이지 조회 가능한 권한
    menu: pathName.toUpperCase(),
  })?.role;

  const optioins = _.map(data, (item) => {
    return {
      name: item.name,
      value: item.permission,
    };
  });

  const currentData = _.find(data, {
    permission: auth,
  });

  return (
    <Selector
      options={optioins}
      isLoading={isLoading}
      onChange={(value: TPermissionsState) => {
        setPermissions(value);
      }}
      disableOptions={_.map(data, (item) =>
        getPageAuto ? getPageAuto.indexOf(item.permission) === -1 : false
      )}
      defaulatValue={
        currentData
          ? {
              value: currentData.permission,
              name: currentData.name,
            }
          : undefined
      }
    />
  );
};

export default PermissionsSelector;
