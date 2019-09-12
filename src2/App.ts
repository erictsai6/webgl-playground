import 'pepjs';
import * as OIMO from 'oimo';
window.OIMO = OIMO;

import { Engine } from "@babylonjs/core/Engines/engine";
import { Scene } from "@babylonjs/core/scene";
import { Vector3 } from "@babylonjs/core/Maths/math";
import { FreeCamera } from "@babylonjs/core/Cameras/freeCamera";
import { ArcRotateCamera } from "@babylonjs/core/Cameras/arcRotateCamera";

import { HemisphericLight } from "@babylonjs/core/Lights/hemisphericLight";
import { Mesh } from "@babylonjs/core/Meshes/mesh";

import { Color3 } from "@babylonjs/core"
import { StandardMaterial } from "@babylonjs/core/Materials/standardMaterial";
import {OimoJSPlugin} from "@babylonjs/core/Physics/Plugins/oimoJSPlugin"
import {GridMaterial} from  "@babylonjs/materials/grid"
import {PhysicsImpostor} from "@babylonjs/core/Physics/physicsImpostor"

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
camera.attachControl(canvas, false);

var gravityVector = new Vector3(0,-.81, 0);
var physicsPlugin = new OimoJSPlugin();
scene.enablePhysics(gravityVector, physicsPlugin);

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
var sphere = Mesh.CreateSphere("sphere1", 16, 1, scene);

// Move the sphere upward 1/2 its height
sphere.position.y = 1;

// Affect a material
sphere.material = myMaterial;

// Our built-in 'ground' shape. Params: name, width, depth, subdivs, scene
var ground = Mesh.CreateGround("ground1", 10, 10, 2, scene);
ground.physicsImpostor = new PhysicsImpostor(ground, PhysicsImpostor.BoxImpostor, { mass: 0, friction: 0.5, restitution: 0.7 }, scene);

var material = new GridMaterial("grid", scene);
scene.collisionsEnabled = true;

// Affect a material
ground.material = material;
ground.checkCollisions = true;

function generateSpheres() {
    for (let i = 0; i < 100; i += 1) {
        var sphere = Mesh.CreateSphere("sphere" + i, 16, 0.2, scene);

        sphere.position.y = Math.random() * 5;
        sphere.position.x = (Math.random() * 10) - 5;
        sphere.position.z = (Math.random() * 10) - 5;

        sphere.material = myMaterial;
        sphere.checkCollisions = true;
        sphere.physicsImpostor = new PhysicsImpostor(sphere, PhysicsImpostor.SphereImpostor, { mass: 0.1 }, scene);
        // scene.registerBeforeRender(function () {
        //     sphere.moveWithCollisions(scene.gravity);
        // })
        
    }
}

generateSpheres();

// Render every frame
engine.runRenderLoop(() => {
    scene.render();
});