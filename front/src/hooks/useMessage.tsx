import { useCallback } from "react";
import { notification } from "antd";

export const useMessage: Function = () => {
  return useCallback(
    (message: string, status: "success" | "error" | "warning" = "success") => {
      // @ts-ignore: Unreachable code error
      notification[status]({
        message: status.charAt(0).toUpperCase() + status.slice(1),
        description: message,
        duration: 20,
      });
    },
    []
  );
};
