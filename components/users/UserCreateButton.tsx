"use client";
import React, { useState } from "react";
import Button from "../common/Button";
import Dialogs from "../common/Dialogs";
import InputBox from "../common/InputBox";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createUsers, getUsersExists } from "@/lib/api";
import _ from "lodash";

const CreateButton = ({ params }: any) => {
  const [open, setOpen] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    reset,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<TUserInputs>();

  const password = watch("password");
  const email = watch("email");

  const queryClient = useQueryClient();

  // 유저 생성 API Mutation
  const mutationUser = useMutation({
    mutationFn: ({ data }: { data: TUserInputs }) => {
      return createUsers({ data });
    },
    onSuccess: async (data, variables) => {
      // 회원 추가를 위해 기존 query 데이터 호출
      const previousValue = queryClient.getQueryData<TUserData>([
        "getUsers",
        params,
      ]);

      let prevContent = previousValue
        ? previousValue.content.slice(0, previousValue.content.length - 1)
        : [];

      const previousValueContent = [
        {
          id: data.id,
          email: variables.data.email,
          name: variables.data.name,
          last_login_at: null,
        },
        ...prevContent,
      ];

      //기존 데이터에서 사용자 업데이트
      if (previousValue) {
        queryClient.setQueryData(["getUsers", params], (oldData: TUserData) => {
          return {
            ...oldData,
            content: previousValueContent,
          };
        });
      }
      setOpen(false);
    },
    onError: (value) => {
      // console.log(value);
    },
  });

  // 유저 생성 API Mutation
  const mutationUserExists = useMutation({
    mutationFn: ({ email }: { email: string }) => {
      return getUsersExists({ email });
    },
    onSuccess: (data) => {
      if (data.result) {
        setError("email", {
          message: "이미 사용중인 이메일입니다. 다른 이메일을 입력하세요.",
        });
      } else {
        clearErrors("email");
      }
    },
    onError: (value) => {
      // console.log(value);
    },
  });

  const onSubmit: SubmitHandler<TUserInputs> = (data) => {
    mutationUser.mutate({ data });
  };

  return (
    <>
      <Button
        name={"생성"}
        onClick={() => {
          setOpen(true);
        }}
      />
      <Dialogs open={open} onClose={() => setOpen(false)} title={"사용자 생성"}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <InputBox
            type="text"
            title="아이디"
            errorMsg={errors.email?.message}
            subButtonName="중복확인"
            subButtonOnClick={() => {
              mutationUserExists.mutate({ email });
            }}
            {...register("email", {
              required: "아이디(이메일)을 입력하세요.",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "올바른 이메일 주소를 입력하세요.",
              },
              maxLength: {
                value: 50,
                message: "올바른 이메일 주소를 입력하세요.",
              },
              minLength: {
                value: 9,
                message: "올바른 이메일 주소를 입력하세요.",
              },
            })}
            requiredLabel
          />
          <InputBox
            type="password"
            title="비밀번호"
            placeholder="영문, 숫자, 특수문자 조합 8~15자"
            errorMsg={errors.password?.message}
            {...register("password", {
              required: "비밀번호를 입력하세요.",
              pattern: {
                value:
                  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%~^&*])[A-Za-z\d!@#~$%^&*]+$/,
                message: "8~15자 영문, 숫자, 특수문자를 사용하세요.",
              },
              maxLength: {
                value: 15,
                message: "8~15자 영문, 숫자, 특수문자를 사용하세요.",
              },
              minLength: {
                value: 8,
                message: "8~15자 영문, 숫자, 특수문자를 사용하세요.",
              },
            })}
            requiredLabel
          />
          <InputBox
            type="password"
            title="비밀번호 확인"
            errorMsg={errors.repeat_password?.message}
            {...register("repeat_password", {
              required: "비밀번호를 입력하세요.",
              validate: (value) =>
                value === password || "비밀번호가 일치하지 않습니다.",
            })}
            requiredLabel
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
            <Button name="생성" submit />
          </div>
        </form>
      </Dialogs>
    </>
  );
};

export default CreateButton;
