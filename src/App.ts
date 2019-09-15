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

import { Color3, CubeTexture, Texture, ActionManager, ExecuteCodeAction } from "@babylonjs/core"
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
var camera = new ArcRotateCamera("camera1", 5, 5, 5, new Vector3(0, 2, -20), scene)
// var camera = new ArcRotateCamera("camera1", new Vector3(0, 5, -10), scene);

// This targets the camera to scene origin
// camera.setTarget(Vector3.Zero());
// camera.setPosition(new Vector3(0, 2, 10));

// This attaches the camera to the canvas
camera.attachControl(canvas, true);

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
var player = Mesh.CreateSphere("sphere1", 16, 1, scene);

camera.setTarget(player);
// Move the sphere upward 1/2 its height
player.position.y = 1;

// Affect a material
player.material = myMaterial;
player.checkCollisions = true;
player.physicsImpostor = new PhysicsImpostor(player, PhysicsImpostor.SphereImpostor, { mass: 0.9 }, scene);


// Our built-in 'ground' shape. Params: name, width, depth, subdivs, scene
var ground = Mesh.CreateGround("ground1", 25, 25, 2, scene);
ground.physicsImpostor = new PhysicsImpostor(ground, PhysicsImpostor.BoxImpostor, { mass: 0, friction: 0.5, restitution: 0.7 }, scene);

var material = new GridMaterial("grid", scene);
scene.collisionsEnabled = true;

// Affect a material
ground.material = material;
ground.checkCollisions = true;

var skybox = Mesh.CreateBox("skyBox", 800, scene);
var skyboxMaterial = new StandardMaterial("skyBox", scene);
skyboxMaterial.backFaceCulling = false;
skyboxMaterial.disableLighting = true;
skyboxMaterial.reflectionTexture  = new CubeTexture("img/skybox/skybox", scene);;
skyboxMaterial.reflectionTexture.coordinatesMode = Texture.SKYBOX_MODE;
skybox.material = skyboxMaterial;

skyboxMaterial.diffuseColor = new Color3(0, 0, 0);
skyboxMaterial.specularColor = new Color3(0, 0, 0);
skybox.infiniteDistance = true;

var forceDirection = new Vector3(0, 1, 0);
var forceMagnitude = 0.2;
var contactLocalRefPoint = Vector3.Zero();

var map = {}; //object for multiple key presses
scene.actionManager = new ActionManager(scene);

scene.actionManager.registerAction(new ExecuteCodeAction(ActionManager.OnKeyDownTrigger, function (evt) {
    map[evt.sourceEvent.key] = evt.sourceEvent.type == "keydown";
}));

scene.actionManager.registerAction(new ExecuteCodeAction(ActionManager.OnKeyUpTrigger, function (evt) {
    map[evt.sourceEvent.key] = evt.sourceEvent.type == "keydown";
}));

function generateSpheres() {
    for (let i = 0; i < 100; i += 1) {
        var sphere = Mesh.CreateSphere("sphere" + i, 16, 0.2, scene);

        sphere.position.y = Math.random() * 5;
        sphere.position.x = (Math.random() * 10) - 5;
        sphere.position.z = (Math.random() * 10) - 5;

        sphere.material = myMaterial;
        sphere.checkCollisions = true;
        sphere.physicsImpostor = new PhysicsImpostor(sphere, PhysicsImpostor.SphereImpostor, { mass: 0.1 }, scene);
        
    }
}

player.isJumping = false;
function jump() {
    player.isJumping = true;
    player.physicsImpostor.applyImpulse(forceDirection.scale(forceMagnitude), player.getAbsolutePosition().add(contactLocalRefPoint));
}

generateSpheres();

// Render every frame
engine.runRenderLoop(() => {
    scene.render();
});

scene.registerAfterRender(function () {

    if ((map["w"] || map["W"])) {
        player.position.z += 0.1;
    };

    if ((map["s"] || map["S"])) {
        player.position.z -= 0.1;
    };

    if ((map["a"] || map["A"])) {
        player.position.x -= 0.1;

    };

    if ((map["d"] || map["D"])) {
        player.position.x += 0.1;
    };
    if (map[" "]) {
        jump();
    }

});