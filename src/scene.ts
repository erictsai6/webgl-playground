import { Scene, Engine } from 'babylonjs';
import * as GUI from 'babylonjs-gui';

export function createScene(engine: Engine): Scene {
  return new Scene(engine);
}

export function createHeader(advancedTexture) {
  var label = new GUI.Rectangle('label for me');
  label.background = 'black'
  label.height = '30px';
  label.alpha = 0.5;
  label.width = '100px';
  label.cornerRadius = 20;
  label.thickness = 1;
  label.linkOffsetY = 30;
  label.top = '10%';
  label.zIndex = 5;
  label.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;

  var text1 = new GUI.TextBlock();
  text1.text = 'tsaibot.dev';
  text1.color = 'white';
  label.addControl(text1);

  advancedTexture.addControl(label);
}
