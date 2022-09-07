import { rgbToHex, tempToColor } from '@styles/colors';

type StarProps = {
  idx: number;
  canvasWidth: number;
  canvasHeight: number;
};

const Star = ({ canvasWidth, canvasHeight, idx }: StarProps) => {
  const cxStar = Math.random() * canvasWidth;
  const cyStar = Math.random() * canvasHeight;
  const temp = Number((Math.random() * 9000 + 1000).toFixed(0));
  const color = rgbToHex(tempToColor(temp));
  return (
    <circle
      r={Math.random() * 3 + 1}
      cx={cxStar}
      cy={cyStar}
      data-temp={temp}
      fill={color}
      style={{ opacity: (Math.random() + 0.1) * 0.5 }}
    />
  );
};
export default Star;
