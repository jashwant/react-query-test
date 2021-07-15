import { GetStaticProps } from "next";
import Link from "next/link";
import { User } from "../../interfaces";
import Layout from "../../components/Layout";
import { QueryClient } from "react-query";
import { dehydrate } from "react-query/hydration";
import { fetchPosts, usePosts } from "../../hooks/usePosts";

const Posts = () => {
  const { isLoading, isError, data } = usePosts();

  if (isLoading) {
    return "loading posts...";
  }

  return (
    <>
      <h2>Post List</h2>
      {data && (
        <ul>
          {data.map((post) => {
            return (
              <li key={post.id}>
                <h3>
                  <Link href={`/posts/${post.id}`}>
                    <a>{post.title}</a>
                  </Link>
                </h3>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
};

export default Posts;

export const getStaticProps: GetStaticProps = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(["posts"], fetchPosts);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };

  const items: User[] = sampleUserData;
  return { props: { items } };
};
