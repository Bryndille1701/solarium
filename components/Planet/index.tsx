import type { Body } from 'types/bodies';
import { getD, majorToMinor } from 'utils/orbit';

type PlanetProps = {
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
};

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
  const path = getD(cx, cy, rx, ry);
  return (
    <a>
      <g
        style={{
          transform: `rotateX(${angle}deg)`,
          transformOrigin: 'center',
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
            cx={cx - rx}
            cy={cy}
            rx={12}
            ry={12}
          ></ellipse>
        </g>
      </g>
    </a>
  );
};

export default Planet;
