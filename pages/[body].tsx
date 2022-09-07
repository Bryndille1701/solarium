import { getBody, getPlanets } from '@api/solar';
import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
// @ts-ignore
import { Body } from '@types/bodies';

type BodyPageProps = {
  body: Body;
};

const BodyPage = ({ body }: BodyPageProps) => {
  const router = useRouter();

  useEffect(() => {
    const url = `${'/'}?body=${body.id}`;
    const as = `/${body.id}`;
    router.push(url, as);
  }, []);
  return <div>{/* <Canvas bodies={[]} isRoot={true} /> */}</div>;
};

export default BodyPage;

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const bodyId = params && params.body ? String(params.body) : '';
  if (!bodyId) {
    return {
      props: {
        body: undefined,
      },
    };
  }
  const body = await getBody(bodyId);
  return {
    props: {
      body,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await getPlanets();
  const paths = res.map((body) => {
    return {
      params: { body: String(body.id) },
    };
  });
  return {
    paths: paths,
    fallback: false,
  };
};
