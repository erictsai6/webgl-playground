import { Scene, Engine, Mesh, Vector3 } from 'babylonjs';

import { MeshWriter } from 'meshwriter';
export function createScene(engine: Engine): Scene {
  return new Scene(engine);
}

export function createHeader(scene: Scene) {
  const Writer = MeshWriter(scene, { scale: 1 });
  const text1 = new Writer(
    'Erica',
    {
      anchor: 'center',
      'letter-height': 25,
      color: '#1C3870',
      position: {
        x: 10,
        y: 15,
        z: 20
      }
    }
  );
  (text1.getMesh() as Mesh).rotate(new Vector3(0, 10, 10), 10);
}
