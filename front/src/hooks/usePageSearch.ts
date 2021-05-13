import { useEffect, useState } from "react";
import axios from "axios";

export const usePageSearch = (
  type: "ad" | "article" | "all" = "all",
  page: number = 1,
  query: string = "",
  resetData?: boolean
) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(false);
  const [pages, setPages] = useState<Array<any>>([]);
  const [hasMore, setHasMore] = useState(false);

  const headers = {
    "Content-Type": "application/json",
  };

  useEffect(() => {
    setPages([]);
  }, [type, query, resetData]);

  useEffect(() => {
    setLoading(true);
    setError(false);
    let cancel: any;
    axios({
      method: "GET",
      url: `/api/custom-page?type=${type}&page=${page}&query=${query}`,
      headers,
      cancelToken: new axios.CancelToken((c) => (cancel = c)),
    })
      .then((res) => {
        setPages((prevPages: Array<any>) => {
          return [...prevPages, ...res.data.pages];
        });
        setHasMore(!!res.data.next);
        setLoading(false);
      })
      .catch((e) => {
        if (axios.isCancel(e)) return;
        setLoading(false);
        console.log(e.response);
        if (e.response) {
          setError({
            status: e.response.status,
            message: e.response.data.message,
          });
        } else {
          setError({
            status: 400,
            message: "Something went wrong..",
          });
        }
      });
    return () => cancel();
  }, [type, page, query, resetData]);
  return { loading, error, pages, hasMore };
};
