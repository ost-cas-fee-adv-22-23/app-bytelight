import { Heading1 } from '@smartive-education/design-system-component-library-bytelight';
import { GetServerSideProps, InferGetStaticPropsType } from 'next';

export default function PageHome(): InferGetStaticPropsType<typeof getServerSideProps> {
  return (
    <>
      <Heading1>Hallo Matthias</Heading1>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => ({
  props: { posts: require('../data/posts.json') },
});
