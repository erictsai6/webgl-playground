import { SceneLoader, Scene } from 'babylonjs';

export function loadAssets(scene: Scene) {
  return Promise.all([
    SceneLoader.AppendAsync('models/Fox/', 'Fox.gltf', scene),
    SceneLoader.AppendAsync('models/Nature/', 'NatureFreePack1.obj', scene),
  ]);
}

export class AssetManager {
    static MODELS = [];
}
