import { FollowCamera, Vector3 } from 'babylonjs';

export function initializeFollowCamera(canvas, scene) {
  // This creates and initially positions a follow camera
  const camera = new FollowCamera('FollowCam', new Vector3(0, 500, 0), scene);

  // The goal distance of camera from target
  camera.radius = 250;

  // The goal height of camera above local origin (centre) of target
  camera.heightOffset = 250;

  // The goal rotation of camera around local origin (centre) of target in x y plane
  camera.rotationOffset = 5;

  // Acceleration of camera in moving from current to goal position
  camera.cameraAcceleration = 0.005

  // The speed at which acceleration is halted
  camera.maxCameraSpeed = 10

  // camera.target is set after the target's creation

  // This attaches the camera to the canvas
  camera.attachControl(canvas, true);

  camera.isRigCamera = true;

  return camera;
}
