import {spawnCoords} from '../Options/sHelpers'

export default class PlayerLoader {
    constructor(player: PlayerMp) {
        this.loadMethods(player);

        mp.events.add({
            'playerDeath': (player: PlayerMp, reason: any, killer: PlayerMp) => {
                this.playerDeathHandler(player, reason, killer);
            }
        })
    }

    /**
     * Load additional methods into the player object.
     *
     * @param player
     */
    loadMethods(player: PlayerMp) {
        player.isDriver = function () {
            return !(!this.vehicle || this.seat !== -1);
        };

        player.teleport = function (coords) {
            this.position = coords.pos;
            this.heading = coords.rot;
            this.dimension = coords.dim;
        };

        player.respawn = function (coords) {
            this.spawn(coords.pos);

            this.heading = coords.rot;
            this.dimension = coords.dim;
            this.health = 100;
            this.armour = 100;
        };

        player.niceName = player.name.replace('_', ' ')
    }

    playerDeathHandler(player: PlayerMp, reason: any, killer: PlayerMp) {
        let textOthers = `${player.niceName} wurde von ${killer.niceName} ~r~getötet.`,
            textSelf = `Du wurdest von ${killer.niceName} ~r~getötet.`;

        if (player.id === killer.id) {
            textOthers = `${player.niceName} hat sich selbst ~r~getötet.`;
            textSelf = `Du hast dich selbst ~r~getötet.`;
        }

        mp.players.forEach((p) => {
            if (player.id === p.id) {
                p.notify(textSelf);

                return
            }

            p.notify(textOthers)
        });

        setTimeout(() => {
            player.respawn(spawnCoords)
        }, 5000)
    }
}