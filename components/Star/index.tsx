import { rgbToHex, tempToColor } from '@styles/colors';
import { useMemo } from 'react';

type StarProps = {
  idx: number;
  canvasWidth: number;
  canvasHeight: number;
};

const Star = ({ canvasWidth, canvasHeight, idx }: StarProps) => {
  const cxStar = useMemo(() => Math.random() * canvasWidth, [canvasWidth]);
  const cyStar = useMemo(() => Math.random() * canvasHeight, [canvasHeight]);
  const temp = useMemo(
    () => Number((Math.random() * 9000 + 1000).toFixed(0)),
    [canvasWidth]
  );
  const color = useMemo(() => rgbToHex(tempToColor(temp)), [temp, canvasWidth]);
  const opacity = useMemo(() => (Math.random() + 0.1) * 0.5, [canvasWidth]);
  return (
    <circle
      r={Math.random() * 3 + 1}
      cx={cxStar}
      cy={cyStar}
      data-temp={temp}
      fill={color}
      style={{ opacity }}
    />
  );
};
export default Star;
