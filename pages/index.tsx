import { getPlanets } from 'api/solar';
import Canvas from 'components/Canvas';
import Link from 'components/Link';
import ModalPage from 'components/ModalPage';
import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import type { Body } from 'types/bodies';

interface HomeProps {
  bodies: Body[];
}

const Home: NextPage<HomeProps> = ({ bodies }) => {
  return (
    <div>
      <Canvas bodies={bodies} isRoot={true} />
      <ModalPage bodies={bodies} />
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const res = await getPlanets();
  return {
    props: {
      bodies: res,
    },
  };
};

export default Home;
