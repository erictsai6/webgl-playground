import { Scene, ExecuteCodeAction, ActionManager } from 'babylonjs';

export class AppActionManager {
  private actionMap;

  constructor(private scene: Scene) {
    this.scene.actionManager = new ActionManager(this.scene);
    this.actionMap = {};
  }

  registerActions() {
    this.scene.actionManager.registerAction(new ExecuteCodeAction(ActionManager.OnKeyDownTrigger, (evt) => {
      this.actionMap[evt.sourceEvent.key] = evt.sourceEvent.type === 'keydown';
    }));

    this.scene.actionManager.registerAction(new ExecuteCodeAction(ActionManager.OnKeyUpTrigger, (evt) => {
      this.actionMap[evt.sourceEvent.key] = evt.sourceEvent.type === 'keydown';
    }));

    this.scene.registerAfterRender(() => {
      let isMoving = false;

      if ((this.actionMap.w || this.actionMap.W)) {
        isMoving = true;
      }

      if (isMoving) {
        const fox = this.scene.meshes[1];
        fox.position.z++;
        this.scene.animationGroups[1].play();
      }
    });
  }
}
