"use client";
import React, { useEffect, useState } from "react";
import Button from "../common/Button";
import Dialogs from "../common/Dialogs";
import InputBox from "../common/InputBox";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { patchUsers } from "@/lib/api";
import _ from "lodash";

const UserModifyButton = ({
  params,
  data,
  onClose,
}: {
  params: any;
  data?: TUserDataContent;
  onClose: () => void;
}) => {
  const [open, setOpen] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TUserInputsModify>();

  const queryClient = useQueryClient();

  // 사용자 수정 API Mutation
  const mutationUserModify = useMutation({
    mutationFn: ({ id, name }: { id: number; name: string }) => {
      return patchUsers({ id, name });
    },
    onSuccess: (data, variables) => {
      // 사용자 수정을 위해 기존 query 데이터 호출
      const previousValue = queryClient.getQueryData<TUserData>([
        "getUsers",
        params,
      ]);

      console.log(variables);

      const previousValueContent = _.map(previousValue?.content, (item) =>
        item.id === variables.id
          ? {
              ...item,
              name: variables.name,
            }
          : item
      );

      //기존 데이터에서 사용자 업데이트
      if (previousValue) {
        queryClient.setQueryData(["getUsers", params], (oldData: TUserData) => {
          return {
            ...oldData,
            content: previousValueContent,
          };
        });
      }
      onClose();
    },
    onError: (value) => {
      // console.log(value);
    },
  });

  const onSubmit: SubmitHandler<TUserInputsModify> = (data) => {
    mutationUserModify.mutate({ id: data.id, name: data.name });
  };

  useEffect(() => {
    if (data) {
      setOpen(true);
      reset(data);
    } else {
      setOpen(false);
    }
  }, [data, reset]);

  return (
    <>
      <Dialogs open={open} onClose={() => setOpen(false)} title={"사용자 수정"}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <InputBox
            type="text"
            title="아이디"
            errorMsg={errors.email?.message}
            disabled
            {...register("email")}
          />

          <InputBox
            type="text"
            title="이름"
            errorMsg={errors.name?.message}
            {...register("name", {
              required: "이름을 입력하세요.",
              pattern: {
                value: /^[가-힣a-zA-Z]+$/,
                message:
                  "이름을 올바르게 입력하세요. (숫자, 특수문자, 공백 입력 불가)",
              },
              maxLength: {
                value: 16,
                message:
                  "이름을 올바르게 입력하세요. (숫자, 특수문자, 공백 입력 불가)",
              },
              minLength: {
                value: 1,
                message:
                  "이름을 올바르게 입력하세요. (숫자, 특수문자, 공백 입력 불가)",
              },
            })}
            requiredLabel
          />
          <div className="flex gap-2 justify-center">
            <Button
              name="취소"
              color="gray"
              onClick={() => {
                setOpen(false);
                reset();
              }}
            />
            <Button name="저장" submit />
          </div>
        </form>
      </Dialogs>
    </>
  );
};

export default UserModifyButton;
