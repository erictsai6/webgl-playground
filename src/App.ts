import 'pepjs';
import CANNON from 'cannon';
window.CANNON = CANNON;

import { Engine } from "@babylonjs/core/Engines/engine";
import { Scene } from "@babylonjs/core/scene";
import { Vector3 } from "@babylonjs/core/Maths/math";
import { ArcRotateCamera } from "@babylonjs/core/Cameras/arcRotateCamera";

import { HemisphericLight } from "@babylonjs/core/Lights/hemisphericLight";
import { Mesh } from "@babylonjs/core/Meshes/mesh";

import { Color3, CubeTexture, Texture, ActionManager, ExecuteCodeAction, CannonJSPlugin } from "@babylonjs/core"
import { StandardMaterial } from "@babylonjs/core/Materials/standardMaterial";
import {GridMaterial} from  "@babylonjs/materials/grid"
import {PhysicsImpostor} from "@babylonjs/core/Physics/physicsImpostor"

// Required side effects to populate the Create methods on the mesh class. Without this, the bundle would be smaller but the createXXX methods from mesh would not be accessible.
import "@babylonjs/core/Meshes/meshBuilder";
import { RED, PINK, BROWN, LIGHT_BLUE, LIGHT_GREEN, generateColorMaterial } from './constants/colors';

// Get the canvas element from the DOM.
const canvas = document.getElementById("c") as HTMLCanvasElement;

// Associate a Babylon Engine to it.
const engine = new Engine(canvas);

// Create our first scene.
var scene = new Scene(engine);

// This creates and positions a free camera (non-mesh)
var camera = new ArcRotateCamera("camera1", 5, 5, 5, new Vector3(0, 2, -20), scene)
// var camera = new ArcRotateCamera("camera1", new Vector3(0, 5, -10), scene);
camera.lowerBetaLimit = 0.01;
camera.upperBetaLimit = (Math.PI / 2) * 0.9;

// This targets the camera to scene origin
// camera.setTarget(Vector3.Zero());
// camera.setPosition(new Vector3(0, 2, 10));

// This attaches the camera to the canvas
camera.attachControl(canvas, true);

var gravityVector = new Vector3(0, -9.8, 0);
scene.enablePhysics(gravityVector, new CannonJSPlugin());

// scene.enablePhysics(gravityVector, physicsPlugin);

// This creates a light, aiming 0,1,0 - to the sky (non-mesh)
var light = new HemisphericLight("light1", new Vector3(0, 1, 0), scene);

// Default intensity is 1. Let's dim the light a small amount
light.intensity = 0.5;

// Create a grid material
var myMaterial = new StandardMaterial("myMaterial", scene);

myMaterial.diffuseTexture = new Texture("http://i.imgur.com/Wk1cGEq.png", scene);

// myMaterial.diffuseColor = new Color3(0.5, 0.2, 1);
// myMaterial.specularColor = new Color3(0.5, 0.6, 0.87);
// myMaterial.emissiveColor = new Color3(1, 0, 1);
// myMaterial.ambientColor = new Color3(0.23, 0.98, 0.53);

var player;

// Our built-in 'ground' shape. Params: name, width, depth, subdivs, scene
var ground = Mesh.CreateGroundFromHeightMap("ground1", "img/heightmap/nyc.png",  500, 500, 250, 0, 10, scene, false, function() {
    // const material = new GridMaterial('grid', scene);
    var material = new StandardMaterial("mat1", scene);
    material.diffuseTexture = new Texture("http://i.imgur.com/Wk1cGEq.png", scene);
    material.bumpTexture  = new Texture("http://i.imgur.com/wGyk6os.png", scene);
    material.diffuseTexture.uScale = 30;
    material.diffuseTexture.vScale = 30;

    // material.specularColor = new Color3(0, 0, 0);
    ground.material = material;
    ground.physicsImpostor = new PhysicsImpostor(ground, PhysicsImpostor.HeightmapImpostor, 
        { mass: 0, friction: 0.5, restitution: 0.3 }, scene);
    ground.checkCollisions = true;
    // Our built-in 'sphere' shape. Params: name, subdivs, size, scene
    player = Mesh.CreateSphere("sphere1", 16, 2, scene);

    camera.setTarget(player);
    // Move the sphere upward 1/2 its height
    player.position.y = 3;

    // Affect a material
    player.material = myMaterial;
    player.checkCollisions = true;
    player.physicsImpostor = new PhysicsImpostor(player, PhysicsImpostor.SphereImpostor, { mass: 0.9, friction: 0.5 }, scene);

});

// scene.collisionsEnabled = true;

// Affect a material
// ground.material = material;

var skybox = Mesh.CreateBox("skyBox", 800, scene);
var skyboxMaterial = new StandardMaterial("skyBox", scene);
skyboxMaterial.backFaceCulling = false;
skyboxMaterial.disableLighting = true;
skyboxMaterial.reflectionTexture  = new CubeTexture("img/skybox/skybox", scene);;
skyboxMaterial.reflectionTexture.coordinatesMode = Texture.SKYBOX_MODE;
skybox.material = skyboxMaterial;

// skyboxMaterial.diffuseColor = new Color3(0, 0, 0);
// skyboxMaterial.specularColor = new Color3(0, 0, 0);
skybox.infiniteDistance = true;


var forceDirection = new Vector3(0, 1, 0);
var forceMagnitude = 0.5;
var contactLocalRefPoint = Vector3.Zero();

var map = {}; //object for multiple key presses
scene.actionManager = new ActionManager(scene);

// scene.fogMode = Scene.FOGMODE_EXP;
// scene.fogColor = new Color3(0.9, 0.9, 0.85);
// scene.fogDensity = 0.01;

scene.actionManager.registerAction(new ExecuteCodeAction(ActionManager.OnKeyDownTrigger, function (evt) {
    map[evt.sourceEvent.key] = evt.sourceEvent.type == "keydown";
}));

scene.actionManager.registerAction(new ExecuteCodeAction(ActionManager.OnKeyUpTrigger, function (evt) {
    map[evt.sourceEvent.key] = evt.sourceEvent.type == "keydown";
}));

function generateSpheres() {
    var sphere = Mesh.CreateSphere("sphere0", 16, 0.9, scene);

    sphere.position.y = 1
    sphere.position.x = 2
    sphere.position.z = 0

    sphere.material = generateColorMaterial(RED, scene);

    sphere = Mesh.CreateSphere("sphere1", 16, 0.7, scene);

    sphere.position.y = 1
    sphere.position.x = 0
    sphere.position.z = 2

    sphere.material = generateColorMaterial(PINK, scene);

    sphere = Mesh.CreateSphere("sphere1", 16, 0.5, scene);

    sphere.position.y = 1
    sphere.position.x = -2
    sphere.position.z = 0

    sphere.material = generateColorMaterial(LIGHT_BLUE, scene);

    sphere = Mesh.CreateSphere("sphere1", 16, 0.3, scene);

    sphere.position.y = 1
    sphere.position.x = 0
    sphere.position.z = -2

    sphere.material = generateColorMaterial(LIGHT_GREEN, scene);
    
}

let maxSpeed = 20;
let accelerate = 0.5;

function jump() {

    // Only jump if you are on the ground
    if (player.intersectsMesh(ground)) {
        player.physicsImpostor.applyImpulse(forceDirection.scale(forceMagnitude), player.getAbsolutePosition().add(contactLocalRefPoint));
    }
}

generateSpheres();

// Render every frame
engine.runRenderLoop(() => {
    scene.render();
});

let speed = 0;
let direction = null;

function determineRadius() {
    const {x: cameraX, z: cameraZ} = camera.position;
    const {x: targetX, z: targetZ} = camera.target;
    // console.log(targetX, targetZ);

    const x = cameraX - targetX;
    const z = cameraZ - targetZ;
    let angle = Math.atan(
        Math.abs(z) / Math.abs(x));

    // If quadrant 1
    if (x > 0 && z > 0) {
        angle = Math.PI + angle;
    } else if (x > 0 && z < 0) {
        angle = Math.PI - angle;
    } else if (x < 0 && z < 0) {
        angle = 0 + angle;
    } else if (x < 0 && z > 0) {
        angle = Math.PI * 2 - angle;
    }
    return angle;
}

function calculatePlayerPosition(speed, angle, player) {
    //SOH CAH TOA
    angle = angle % (2 * Math.PI);
    const deltaZ = Math.sin(angle) * speed;
    const deltaX = Math.cos(angle) * speed;

    // player.position.x += deltaX;
    // player.position.z += deltaZ;
    const currentVelocity = player.physicsImpostor.getLinearVelocity();
    currentVelocity.x = deltaX;
    currentVelocity.z = deltaZ;
    player.physicsImpostor.setLinearVelocity(currentVelocity);
    player.physicsImpostor.setAngularVelocity(currentVelocity);
}

function limitMaxSpeed(coordinate: number) {
    if (coordinate < 0) {
        return Math.max(-maxSpeed, coordinate);
    }
    return Math.min(maxSpeed, coordinate);
}

function decelerate() {
    
    const currentVelocity = player.physicsImpostor.getLinearVelocity();

    currentVelocity.x = currentVelocity.x / 8;
    currentVelocity.x = currentVelocity.x < 0.05 ? 0 : currentVelocity.x;

    currentVelocity.z = currentVelocity.z / 8;
    currentVelocity.z = currentVelocity.z < 0.05 ? 0 : currentVelocity.z;

    player.physicsImpostor.setLinearVelocity(currentVelocity);
}

let index = 0;
scene.registerAfterRender(function () {
    if (!player) {return}
    const facingAngle = determineRadius();
    let angles = [];
    index++;
    let isMoving = false;

    if ((map["w"] || map["W"])) {
        isMoving = true;
        angles.push(facingAngle);
    }

    if ((map["s"] || map["S"])) {
        isMoving = true;
        angles.push(facingAngle + Math.PI);    
    };

    if ((map["a"] || map["A"])) {
        isMoving = true;
        angles.push(facingAngle + Math.PI / 2);    
    };

    if ((map["d"] || map["D"])) {
        isMoving = true;
        angles.push(facingAngle - Math.PI / 2);    
    };
    if (isMoving) {
        speed += accelerate;
        speed = Math.min(speed, maxSpeed);
        const average = angles.reduce((prev, x) => prev + x, 0) / angles.length;

        calculatePlayerPosition(speed, average, player);
    }
    if (map[" "]) {
        jump();
    }
    if (!isMoving) {
        decelerate();
    }
    if (player && player.position.y < ground.position.y - 20) {
        player.position = new Vector3(0, 5, 0);
        // kill all positional movement
        player.physicsImpostor.setLinearVelocity(new Vector3(1, 0, 0));
        // kill all rotational movement
        player.physicsImpostor.setAngularVelocity(new Vector3(0, 0, 0));
});

window.addEventListener("resize", function () { 
    engine.resize();
});