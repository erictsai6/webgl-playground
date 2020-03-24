import { SceneLoader, Scene } from 'babylonjs';

export function loadAssets(scene: Scene) {
  return SceneLoader.AppendAsync('models/Fox/', 'Fox.gltf', scene);
}

export class AssetManager {
    static MODELS = [];

}
