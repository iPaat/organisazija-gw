import Camera from '../Options/sCamera';
import Logger from '../Options/sLogger';
import PlayerSingleton from "../Player/sPlayerSingleton";
import Vehicle = RageEnums.Hashes.Vehicle;

class Login {
    loginScreenPlayerPos: Vector3Mp;
    camPos1: Vector3Mp;
    camPos2: Vector3Mp;
    camViewAngle: number;

    constructor() {
        this.loginScreenPlayerPos = new mp.Vector3(3294, 5216, 17);
        this.camPos1 = new mp.Vector3(3331.6, 5222.5, 23);
        this.camPos2 = new mp.Vector3(0, 0, 212);
        this.camViewAngle = 55;

        mp.events.add({
            "playerReady": async (player: PlayerMp) => {
                await this.playerReady(player);
            },

            "playerQuit": (player: PlayerMp) => {
                this.playerQuit(player)
            },
        });
    }

    async playerReady(player: PlayerMp) {
        Camera.createCamera(player, this.camPos1, this.camPos2, this.camViewAngle);
        player.spawn(this.loginScreenPlayerPos);
        player.dimension = -1;

        Logger.debug(`[SERVER]: Player joined. SocialClub: ${player.socialClub} | Name: ${player.name}`);

        await PlayerSingleton.createUser(player);
        await PlayerSingleton.updateUserName(player);

        Camera.resetCamera(player);
        await PlayerSingleton.loadAccount(player);
    }

    playerQuit(player: PlayerMp) {
        mp.players.forEach((p) => {
            if (p.id === player.id) return;

            p.notify(`~r~${player.niceName} ~s~quited.`)
        });

        mp.vehicles.forEach((v) => {
            if (v.ownerId === player.id) {
                v.destroy()
            }
        });
    }
}

new Login();