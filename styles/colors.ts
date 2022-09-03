type RGBObject = { r: number; g: number; b: number };

export const planetColors = {
  mercure: '#b49175',
  venus: '#ddafb1',
  terre: '#91cae7',
  mars: '#c24735',
  jupiter: '#d9b287',
  saturne: '#fdf18f',
  uranus: '#7c97ce',
  neptune: '#505ca6',
};

export const tempToColor = (temp: number): RGBObject => {
  const tempadj = temp / 100;
  let red;
  let green;
  let blue;
  if (tempadj <= 66) {
    red = 255;
  } else {
    red = tempadj - 60;
    red = 329.698727446 * Math.pow(red, -0.1332047592);
    if (red < 0) {
      red = 0;
    }
    if (red > 255) {
      red = 255;
    }
  }
  if (tempadj <= 66) {
    green = 255;
  } else {
    green = tempadj;
    red = 99.4708025861 * Math.log(green) - 161.1195681661;
    if (green < 0) {
      green = 0;
    }
    if (green > 255) {
      green = 255;
    }
  }
  if (tempadj >= 66) {
    blue = 255;
  } else {
    if (tempadj <= 19) {
      blue = 0;
    } else {
      blue = tempadj - 10;
      blue = 138.5177312231 * Math.log(blue) - 305.0447927307;
      if (blue < 0) {
        blue = 0;
      }
      if (blue > 255) {
        blue = 255;
      }
    }
  }
  return { r: red, g: green, b: blue };
};

export const rgbToHex = (rgb: RGBObject): string => {
  return (
    '#' +
    ('0' + rgb.r.toString(16)).substr(-2) +
    ('0' + rgb.g.toString(16)).substr(-2) +
    ('0' + rgb.b.toString(16)).substr(-2)
  );
};
