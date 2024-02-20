"use client";
import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import Error from "../common/Error";
import { ErrorStore } from "@/store/error";

export default function ReactQueryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const setErrors = ErrorStore((state) => state.setError);

  /// react query 관련 전역 에러 처리
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: false,
      },
    },
    queryCache: new QueryCache({
      onError: () => {
        setErrors(true);
      },
    }),
  });

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
