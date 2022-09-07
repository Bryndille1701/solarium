import type { BodyRes, Body } from 'types/bodies';
import { planetColors } from 'styles/colors';

export const getPlanets = async () => {
  const res = await fetch(
    `${process.env.API_BASE_URL}/bodies/?filter[]=isPlanet,eq,true`
  );
  const resJson = await res.json();
  const bodies: BodyRes[] = resJson && resJson.bodies;
  const bodiesWithMoons: Body[] = await Promise.all(
    bodies.map(async (body) => {
      const moons = await getMoons(body);
      // @ts-ignore
      const color = planetColors[body.id];
      return {
        ...body,
        moons,
        color,
      };
    })
  );
  return bodiesWithMoons;
};

export const getBody = async (bodyId: string) => {
  const res = await fetch(`${process.env.API_BASE_URL}/bodies/${bodyId}`);
  const body: BodyRes = await res.json();
  const moons = await getMoons(body);
  // @ts-ignore
  const color = planetColors[body.id];
  return {
    ...body,
    moons,
    color,
  };
};
export const getMoons = async (body: BodyRes) => {
  const moonsRel = body.moons;
  if (moonsRel && moonsRel.length) {
    const moonsRes = await Promise.all(
      moonsRel.map(async (moon) => {
        const res = await fetch(moon.rel);
        const resJson: Body = await res.json();
        return resJson;
      })
    );
    return moonsRes;
  } else return [];
};
