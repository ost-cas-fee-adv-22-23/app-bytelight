import { Heading1 } from '@smartive-education/design-system-component-library-bytelight';
import { GetServerSideProps, InferGetStaticPropsType } from 'next';
import { MumbelPost } from '../components/mumbel-post';
import { Post } from '../models/post';

type PageProps = {
  posts: { count: number; data: Post[] };
};

export default function PageHome({ posts }: PageProps): InferGetStaticPropsType<typeof getServerSideProps> {
  console.log(posts.data);
  return (
    <>
      <Heading1>Hallo Matthias</Heading1>
      {posts.data.map((post) => (
        <MumbelPost key={post.id} post={post} />
      ))}
    </>
  );
}
export const getServerSideProps: GetServerSideProps = async () => {
  console.log('hoi');
  return {
    props: { posts: require('../data/posts.json') },
  };
};
