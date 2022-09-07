import { useEffect, useMemo, useState } from 'react';
import useResizeObserver from 'use-resize-observer';
import type { Body } from 'types/bodies';
import { majorToMinor, getD } from 'utils/orbit';
import { tempToColor, rgbToHex } from 'styles/colors';
import PlanetLink from '../PlanetLink';
import Star from 'components/Star';

interface CanvasProps {
  bodies: Body[];
  isRoot: boolean;
}

const Canvas = ({ bodies, isRoot = true }: CanvasProps) => {
  const {
    ref: canvasRef,
    width = 1,
    height = 1,
  } = useResizeObserver<HTMLDivElement>();
  const [orbitRatio, setOrbitRatio] = useState(1);
  const [biggestBody, setBiggestBody] = useState<Body>();
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
    const biggest = orderedBodies[0];
    setBiggestBody(biggest);
    const ratio = biggest.semimajorAxis / (width * 0.9);
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
      style={{ width: '100%', height: '100vh', position: 'relative' }}
      className="canvas-root"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        width="100%"
        height="100%"
        style={{ position: 'absolute' }}
      >
        {Array.from(new Array(50)).map((_, idx) => (
          <Star key={idx} idx={idx} canvasWidth={width} canvasHeight={height} />
        ))}
      </svg>
      {orderedBodies.map((body, idx) => {
        console.log(`/?body=${body.id}`);
        return (
          <PlanetLink
            body={body}
            planetNb={orderedBodies.length}
            idx={idx}
            biggest={biggestBody}
            realValueWeight={realValueWeight}
            meanValueWeight={meanValueWeight}
            orbitRatio={orbitRatio}
            canvasWidth={width}
            canvasHeight={heightDiv}
            angle={angleDeg}
            href={{ pathname: '/', query: { body: body.id } }}
            as={`/${body.id}`}
          />
        );
      })}
    </div>
  );
};

export default Canvas;
