import 'pepjs';
import CANNON from 'cannon';

import * as BABYLON from 'babylonjs';
import 'babylonjs-loaders';
import * as GUI from 'babylonjs-gui';

// Required side effects to populate the Create methods on the mesh class. Without this, the bundle would be smaller but the createXXX methods from mesh would not be accessible.
import { createScene, createHeader } from './scene';
import { loadAssets } from './asset-manager';
window.CANNON = CANNON;

BABYLON.SceneLoader.ShowLoadingScreen = false;

async function main() {
  // Get the canvas element from the DOM.
  const canvas = document.getElementById('c') as HTMLCanvasElement;

  // Associate a Babylon Engine to it.
  const engine = new BABYLON.Engine(canvas);

  const scene = createScene(engine);

  var advancedTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI('ui1');

  createHeader(advancedTexture);

  // AssetManager?
  await loadAssets(scene);

  // Initialize default scene settings
  scene.createDefaultCameraOrLight(true, true, true);
  scene.activeCamera.useAutoRotationBehavior = true;
  scene.activeCamera.lowerRadiusLimit = 15;
  scene.activeCamera.upperRadiusLimit = 180;

  scene.activeCamera.alpha = 0.8;

  scene.lights[0].dispose();
  var light = new BABYLON.DirectionalLight('light1', new BABYLON.Vector3(-2, -6, -2), scene);
  light.position = new BABYLON.Vector3(20, 60, 20);
  light.shadowMinZ = 30;
  light.shadowMaxZ = 180;
  light.intensity = 5;

  var generator = new BABYLON.ShadowGenerator(512, light);
  generator.useContactHardeningShadow = true;
  generator.bias = 0.01;
  generator.normalBias= 0.05;
  generator.contactHardeningLightSizeUVRatio = 0.08;

  for (var i = 0; i < scene.meshes.length; i++) {
    generator.addShadowCaster(scene.meshes[i]);
    scene.meshes[i].receiveShadows = true;
    if (scene.meshes[i].material && scene.meshes[i].material.bumpTexture) {
      scene.meshes[i].material.bumpTexture.level = 2;
    }
  }

  var helper = scene.createDefaultEnvironment({
    skyboxSize: 1500,
    groundShadowLevel: 0.5,
  });

  helper.setMainColor(BABYLON.Color3.Gray());

  scene.environmentTexture.lodGenerationScale = 0.6;

  engine.runRenderLoop(() => {
    scene.render();
  });

  window.addEventListener('resize', function () {
    engine.resize();
  });
}

main();
