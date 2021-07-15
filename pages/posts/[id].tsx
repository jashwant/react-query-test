import { GetStaticProps, GetStaticPaths } from "next";
import { QueryClient } from "react-query";
import { fetchPost, usePost } from "../../hooks/usePosts";
import { dehydrate } from "react-query/hydration";

const Post = () => {
  const { isLoading, isError, data } = usePost();
  if (isLoading) {
    return "loading...";
  }

  return (
    <>
      <h1>{data.title}</h1>
      <p>{data.body}</p>
    </>
  );
};

export default Post;

export const getStaticPaths: GetStaticPaths = async () => {
  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.

  return {
    paths: [],
    fallback: true,
  };
};

// This function gets called at build time on server-side.
// It won't be called on client-side, so you can even do
// direct database queries.
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const id = params?.id;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(["posts", id], fetchPost);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};
