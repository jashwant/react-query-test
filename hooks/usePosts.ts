import { postFields } from "graphql/fragments/article";
import { request } from "lib/fetch";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  QueryClient,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from "react-query";

const API_URL = "https://jsonplaceholder.typicode.com";

export const fetchPosts = async () => {
  const response = await fetch(`${API_URL}/posts?_limit=3`);
  const json = await response.json();
  return json;
};

export const usePosts = (): UseQueryResult<unknown, unknonw> => {
  const router = useRouter();
  const [isRouterReady, setIsRouterReady] = useState(false);

  useEffect(() => {
    if (router.isReady) {
      setIsRouterReady(true);
    }
  }, [router.isReady]);

  return useQuery(["posts"], fetchPosts, {
    staleTime: Infinity,
  });
};

export const fetchPost = async ({ queryKey: [_, id] }) => {
  const response = await fetch(`${API_URL}/posts/${id}`);
  const json = await response.json();
  return json;
};

export const usePost = (): UseQueryResult<unknown, unknown> => {
  const router = useRouter();
  const queryClient = useQueryClient();

  // const [isRouterReady, setIsRouterReady] = useState(false);

  // useEffect(() => {
  //   if (router.isReady) {
  //     setIsRouterReady(true);
  //   }
  // }, [router.isReady]);

  return useQuery(["posts", router.query.id], fetchPost, {
    staleTime: Infinity,
    initialData: () => {
      return queryClient
        .getQueryData("posts")
        ?.find((d) => d.id === router.query.id);
    },
  });
};
