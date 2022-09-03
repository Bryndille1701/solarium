// Permet le calcul du semi-minor axis à partir du semi-major axis et de l’excentricité
export const majorToMinor = (
  semimajorAxis: number,
  eccentricity: number
): number => {
  return semimajorAxis * Math.sqrt(1 - Math.pow(eccentricity, 2));
};

export const getD = (cx: number, cy: number, rx: number, ry: number) => {
  var kappa = 4 * ((Math.sqrt(2) - 1) / 3);
  var ox = rx * kappa; // x offset for the control point
  var oy = ry * kappa; // y offset for the control point
  let d = `M${cx - rx},${cy}`;
  d += `C${cx - rx}, ${cy - oy}, ${cx - ox}, ${cy - ry}, ${cx}, ${cy - ry},`;
  d += `C${cx + ox}, ${cy - ry}, ${cx + rx}, ${cy - oy}, ${cx + rx}, ${cy},`;
  d += `C${cx + rx}, ${cy + oy}, ${cx + ox}, ${cy + ry}, ${cx}, ${cy + ry},`;
  d += `C${cx - ox}, ${cy + ry}, ${cx - rx}, ${cy + oy}, ${cx - rx}, ${cy},`;
  d += `z`;
  return d;
};
