import 'pepjs';
import CANNON from 'cannon';

import * as BABYLON from 'babylonjs';
import 'babylonjs-loaders';
// eslint-disable-next-line no-duplicate-imports
import { MeshBuilder, StandardMaterial, Mesh, CubeTexture, Texture, Engine, Scene } from 'babylonjs';

import { h, Component } from 'preact';

// Required side effects to populate the Create methods on the mesh class. Without this, the bundle would be smaller but the createXXX methods from mesh would not be accessible.
import { createScene, createHeader } from './scene';
import { loadAssets } from './asset-manager';
import { AppActionManager } from './action-manager';
import { initializeFollowCamera } from './camera';

window.CANNON = CANNON;

BABYLON.SceneLoader.ShowLoadingScreen = false;

export class Playground extends Component {

  private engine: Engine;
  private scene: Scene;
  private canvas: HTMLCanvasElement;

  render() {
    return (
      <canvas 
        id="c" 
        ref={this.onCanvasLoaded} />      
    );
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onWindowResize);
  }

  componentDidMount() {
    // start ENGINE
    this.engine = new Engine(this.canvas, true);

    //Create Scene
    const scene = createScene(this.engine);

    createHeader(scene);

    //--Light---
    this.addLight(scene);

    //--Camera---
    initializeFollowCamera(this.canvas, scene);

    //--Meshes---
    loadAssets(scene).then(() => {
      this.onAssetsLoaded(scene);
    });

    //--Ground---
    // this.addGround();

    // Add Events
    window.addEventListener("resize", this.onWindowResize, false);

    // Render Loop
    this.engine.runRenderLoop(() => {
      scene.render();
    });

    window.scene = scene;
  }

  addLight(scene: Scene) {
    const light = new BABYLON.DirectionalLight('light1', new BABYLON.Vector3(-2, -6, -2), scene);
    light.position = new BABYLON.Vector3(20, 60, 20);
    light.shadowMinZ = 30;
    light.shadowMaxZ = 180;
    light.intensity = 5;
  }

  onAssetsLoaded = (scene: Scene) => {
    const fox = scene.meshes[1];

    const camera = scene.activeCamera;
    const light = scene.lights[0];

    camera.lockedTarget = fox;

    const generator = new BABYLON.ShadowGenerator(512, light);
    generator.useContactHardeningShadow = true;
    generator.bias = 0.01;
    generator.normalBias = 0.05;
    generator.contactHardeningLightSizeUVRatio = 0.08;

    for (let i = 0; i < scene.meshes.length; i++) {
      generator.addShadowCaster(scene.meshes[i]);
      scene.meshes[i].receiveShadows = true;
      if (scene.meshes[i].material && scene.meshes[i].material.bumpTexture) {
        scene.meshes[i].material.bumpTexture.level = 2;
      }
    }

    const skybox = Mesh.CreateBox('skyBox', 800, scene);
    const skyboxMaterial = new StandardMaterial('skyBox', scene);
    skyboxMaterial.backFaceCulling = false;
    skyboxMaterial.disableLighting = true;
    skyboxMaterial.reflectionTexture = new CubeTexture('img/skybox/skybox', scene); 
    skyboxMaterial.reflectionTexture.coordinatesMode = Texture.SKYBOX_MODE;
    skybox.material = skyboxMaterial;

    // skyboxMaterial.diffuseColor = new Color3(0, 0, 0);
    // skyboxMaterial.specularColor = new Color3(0, 0, 0);
    skybox.infiniteDistance = true;

    // create solid particle system of stationery grey boxes to show movement of box and camera
    const boxesSPS = new BABYLON.SolidParticleSystem('boxes', scene, { updatable: false });

    // function to position of grey boxes
    const setBoxPosition = function(particle, i, s) {
      particle.position = new BABYLON.Vector3(-50 + Math.random() * 500, -50 + Math.random() * 500, -50 + Math.random() * 500);
    }

    // add 400 boxes
    boxesSPS.addShape(MeshBuilder.CreateBox('box', { size: 1 }, scene), 400, { positionFunction: setBoxPosition });
    boxesSPS.buildMesh(); // mesh of boxes

    // scene.environmentTexture.lodGenerationScale = 0.6;

    const actionManager = new AppActionManager(scene);
    actionManager.registerActions();
  }

  onCanvasLoaded = (c: HTMLCanvasElement) => {
    if (c !== null) {
      this.canvas = c;
    }
  }

  onWindowResize = () => {
    this.engine.resize();
  }
}
