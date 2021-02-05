import { useState, useCallback } from "react";

export const useAuth = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const request = useCallback(
    async (
      url: string,
      method: string = "GET",
      body: any = null,
      headers: any = {}
    ) => {
      setLoading(true);

      try {
        if (body) {
          body = JSON.stringify(body);
          headers["Content-Type"] = "application/json";
        }

        const response = await fetch(url, {
          method,
          body,
          headers,
        });
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Something went wrong :(");
        }
        setLoading(false);
        return data;
      } catch (error) {
        setLoading(false);
        return { error: error.message };
      }
    },
    []
  );

  return { request, loading };
};
