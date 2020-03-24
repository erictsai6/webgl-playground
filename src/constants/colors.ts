import { Color3, StandardMaterial } from 'babylonjs';

let index = 0;

export const RED = new Color3(1, 0.09, 0.09);
export const PINK = new Color3(1, 0.5, 0.9);

// rgb(56, 170, 155)
export const LIGHT_BLUE = new Color3(0.17, 0.66, 0.6);

// rgb(85, 165, 44)
export const LIGHT_GREEN = new Color3(0.33, 0.64, 0.17);

// rgb(114, 71, 71)

export const BROWN = new Color3(0.44, 0.278, 0.278);

export function generateColorMaterial(color: Color3, scene): StandardMaterial {
  index++;
  const material = new StandardMaterial(`colorMaterial${index}`, scene);
  material.diffuseColor = color;
  return material;
}
