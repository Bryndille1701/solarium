import Link, { LinkProps } from 'next/link';
// @ts-ignore
import type { Body } from '@types/bodies';
import { getD, majorToMinor } from '@utils/orbit';

interface PlanetProps extends LinkProps {
  body: Body;
  planetNb: number;
  idx: number;
  biggest: Body | undefined;
  realValueWeight: number;
  meanValueWeight: number;
  orbitRatio: number;
  canvasWidth: number;
  canvasHeight: number;
  angle: number;
}

const Planet = ({
  body,
  planetNb,
  idx,
  biggest,
  realValueWeight,
  meanValueWeight,
  orbitRatio,
  canvasWidth,
  canvasHeight,
  angle,
  href,
  as,
}: PlanetProps) => {
  if (!biggest) {
    return null;
  }
  const biggestSemiMajorAxis = biggest.semimajorAxis;
  const meanSemiMajorAxis =
    biggestSemiMajorAxis * ((planetNb - idx) / planetNb);
  const semimajorAxis =
    (body.semimajorAxis * realValueWeight +
      meanSemiMajorAxis * meanValueWeight) /
    2;
  const rx = semimajorAxis / orbitRatio / 2;
  const ry = majorToMinor(semimajorAxis, body.eccentricity) / orbitRatio / 2;
  const cx = canvasWidth / 2;
  const cy = canvasHeight / 2;
  const path = getD(rx + 10, ry + 10, rx, ry);
  return (
    <Link href={href} as={as} passHref>
      <a
        style={{
          height: ry * 2 + 20,
          width: rx * 2 + 20,
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: `translate(-50%, -50%) rotateX(${angle}deg)`,
          transformOrigin: 'center',
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          style={{
            width: '100%',
            height: '100%',
            overflow: 'visible',
          }}
        >
          <g
            style={{
              animation: 'planetrotation',
              transformOrigin: 'center',
              animationDuration: `${body.sideralOrbit / 35}s`,
              animationTimingFunction: 'linear',
              animationIterationCount: 'infinite',
            }}
            className="body-orbit"
            key={body.id}
          >
            <path
              key={body.id}
              data-body={body.id}
              stroke={body.color ?? 'white'}
              strokeWidth={7}
              style={{ opacity: 0.7 }}
              fill="rgba(0,0,0,0)"
              id={`ORBIT-${body.id}`}
              d={path}
            />
            <ellipse
              fill={body.color ?? 'white'}
              width="60"
              height="60"
              cx={rx + 10}
              cy={12}
              rx={12}
              ry={12}
            ></ellipse>
          </g>
        </svg>
      </a>
    </Link>
  );
};

export default Planet;
