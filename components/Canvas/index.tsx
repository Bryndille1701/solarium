import { useEffect, useMemo, useState } from 'react';
import useResizeObserver from 'use-resize-observer';
import type { Body } from 'types/bodies';
import { majorToMinor, getD } from 'utils/orbit';
import { tempToColor, rgbToHex } from 'styles/colors';

interface CanvasProps {
  bodies: Body[];
  isRoot: boolean;
}

const Canvas = ({ bodies, isRoot = true }: CanvasProps) => {
  const { ref: canvasRef, width = 1 } = useResizeObserver<HTMLDivElement>();
  const [orbitRatio, setOrbitRatio] = useState(1);
  const [realValueWeight, setRealValueWeight] = useState(1);
  const [meanValueWeight, setMeanValueWeight] = useState(1);
  // Angle de perspective, en degrés
  const angleDeg = 60;
  // Passage en radians
  const angleRad = angleDeg * (Math.PI / 180);
  // Calcul du cosinus de l'angle
  const cosAngle = Math.cos(angleRad);
  // Utilisation du cosinus pour déterminer la taille
  const heightDiv = width * cosAngle;

  const orderedBodies = useMemo(() => {
    const sorted = bodies.sort((a, b) => {
      return b.semimajorAxis - a.semimajorAxis;
    });
    return sorted;
  }, [bodies]);
  useEffect(() => {
    const biggestBody = orderedBodies[0];
    const ratio = biggestBody.semimajorAxis / (width * 0.9);
    setOrbitRatio(ratio);
  }, [orderedBodies, width]);

  useEffect(() => {
    if (width < 700) {
      setMeanValueWeight(2);
      setRealValueWeight(0);
    } else {
      setMeanValueWeight(0.6);
      setRealValueWeight(1.4);
    }
  }, [width]);
  return (
    <div
      ref={canvasRef}
      style={{ width: '100%', height: heightDiv }}
      className="canvas-root"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        width="100%"
        height="100%"
      >
        {Array.from(new Array(30)).map((star, idx) => {
          const cxStar = Math.random() * width;
          const cyStar = Math.random() * heightDiv;
          const temp = Number((Math.random() * 39000 + 1000).toFixed(0));
          const color = rgbToHex(tempToColor(temp));
          return (
            <circle
              key={idx}
              r={Math.random() * 3 + 1}
              cx={cxStar}
              cy={cyStar}
              data-temp={temp}
              fill={color}
              style={{ opacity: (Math.random() + 0.1) * 0.8 }}
            />
          );
        })}
        {orderedBodies.map((body, idx) => {
          const length = orderedBodies.length;
          const biggest = orderedBodies[0].semimajorAxis;
          const meanSemiMajorAxis = biggest * ((length - idx) / length);
          const semimajorAxis =
            (body.semimajorAxis * realValueWeight +
              meanSemiMajorAxis * meanValueWeight) /
            2;
          const rx = semimajorAxis / orbitRatio / 2;
          const ry =
            majorToMinor(semimajorAxis, body.eccentricity) / orbitRatio / 2;
          const cx = width / 2;
          const cy = heightDiv / 2;
          const path = getD(cx, cy, rx, ry);
          return (
            <g
              key={body.id}
              style={{
                transform: `rotateX(${angleDeg}deg)`,
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
                  fill="none"
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
          );
        })}
      </svg>
    </div>
  );
};

export default Canvas;
