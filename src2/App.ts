import { Engine } from "@babylonjs/core/Engines/engine";
import { Scene } from "@babylonjs/core/scene";
import { Vector3 } from "@babylonjs/core/Maths/math";
import { FreeCamera } from "@babylonjs/core/Cameras/freeCamera";
import { ArcRotateCamera } from "@babylonjs/core/Cameras/arcRotateCamera";

import { HemisphericLight } from "@babylonjs/core/Lights/hemisphericLight";
import { Mesh } from "@babylonjs/core/Meshes/mesh";

import { Color3 } from "@babylonjs/core"
import { StandardMaterial } from "@babylonjs/core/Materials/standardMaterial";

import {GridMaterial} from  "@babylonjs/materials/grid"

// Required side effects to populate the Create methods on the mesh class. Without this, the bundle would be smaller but the createXXX methods from mesh would not be accessible.
import "@babylonjs/core/Meshes/meshBuilder";

// Get the canvas element from the DOM.
const canvas = document.getElementById("c") as HTMLCanvasElement;

// Associate a Babylon Engine to it.
const engine = new Engine(canvas);

// Create our first scene.
var scene = new Scene(engine);

// This creates and positions a free camera (non-mesh)
var camera = new ArcRotateCamera("camera1", 5, 5, 5, new Vector3(0, 5, -10), scene)
// var camera = new ArcRotateCamera("camera1", new Vector3(0, 5, -10), scene);

// This targets the camera to scene origin
camera.setTarget(Vector3.Zero());

// This attaches the camera to the canvas
camera.attachControl(canvas, true);

// This creates a light, aiming 0,1,0 - to the sky (non-mesh)
var light = new HemisphericLight("light1", new Vector3(0, 1, 0), scene);

// Default intensity is 1. Let's dim the light a small amount
light.intensity = 0.5;

// Create a grid material
var myMaterial = new StandardMaterial("myMaterial", scene);

myMaterial.diffuseColor = new Color3(0.5, 0.2, 1);
// myMaterial.specularColor = new Color3(0.5, 0.6, 0.87);
// myMaterial.emissiveColor = new Color3(1, 0, 1);
// myMaterial.ambientColor = new Color3(0.23, 0.98, 0.53);

// Our built-in 'sphere' shape. Params: name, subdivs, size, scene
var sphere = Mesh.CreateSphere("sphere1", 16, 2, scene);

// Move the sphere upward 1/2 its height
sphere.position.y = 1;

// Affect a material
sphere.material = myMaterial;

// Our built-in 'ground' shape. Params: name, width, depth, subdivs, scene
var ground = Mesh.CreateGround("ground1", 10, 10, 2, scene);

var material = new GridMaterial("grid", scene);

// Affect a material
ground.material = material;

// Render every frame
engine.runRenderLoop(() => {
    scene.render();
});