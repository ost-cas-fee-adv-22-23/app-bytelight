import { Heading1 } from '@smartive-education/design-system-component-library-bytelight';
import { GetServerSideProps, InferGetStaticPropsType } from 'next';

type PageProps = {};

export default function PageHome({}: PageProps): InferGetStaticPropsType<typeof getServerSideProps> {
  return (
    <>
      <Heading1>Hallo Matthias</Heading1>
    </>
  );
}
export const getServerSideProps: GetServerSideProps = async () => ({
  props: { posts: require('../data/posts.json') },
});
