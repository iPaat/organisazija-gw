class CameraSingleton {
    camera: any;

    constructor() {
        mp.events.add({
            "cCamera-CreateCamera": (pos1: Vector3Mp, pos2: Vector3Mp, viewAngle: number) => {
                this.createCamera(pos1, pos2, viewAngle);
            },

            "cCamera-ResetCamera": () => {
                this.resetCamera();
            },
        });
    }

    /**
     * Creates a Camera.
     *
     * @param pos1
     * @param pos2
     * @param viewAngle
     */
    createCamera(pos1: Vector3Mp, pos2: Vector3Mp, viewAngle: number) {
        this.camera = mp.cameras.new("Cam", pos1, pos2, viewAngle);
        this.camera.setActive(true);
        mp.game.cam.renderScriptCams(true, true, 20000000000000000000000000, false, false);
    }

    /**
     * Resets the Camera.
     */
    resetCamera() {
        this.camera.setActive(false);
        mp.game.cam.renderScriptCams(false, true, 0, true, true);
        this.camera.destroy();
    }
}

new CameraSingleton();