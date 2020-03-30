class Camera {
    constructor() {

    }

    /**
     * Creates a client camera.
     *
     * @param player
     * @param pos1
     * @param pos2
     * @param viewAngle
     */
    createCamera(player: PlayerMp, pos1: Vector3Mp, pos2: Vector3Mp, viewAngle: number) {
        player.call("cCamera-CreateCamera", [pos1, pos2, viewAngle]);
    }

    /**
     * Resets the client camera.
     *
     * @param player
     */
    resetCamera(player: PlayerMp) {
        player.call("cCamera-ResetCamera");
    }
}

export default new Camera();