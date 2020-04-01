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

        player.changeOutfit = function (outfit) {
            player.model = mp.joaat('mp_m_freemode_01');

            player.setProp(0, outfit.hat[0], outfit.hat[1]);
            player.setClothes(1, outfit.mask[0], outfit.mask[1], 2);
            player.setClothes(2, outfit.hair[0], outfit.hair[1], 2);
            player.setClothes(3, outfit.torso[0], outfit.torso[1], 2);
            player.setClothes(4, outfit.legs[0], outfit.legs[1], 2);
            player.setClothes(6, outfit.shoes[0], outfit.shoes[1], 2);
            player.setClothes(7, outfit.accessories[0], outfit.accessories[1], 2);
            player.setClothes(8, outfit.underShirt[0], outfit.underShirt[1], 2);
            player.setClothes(11, outfit.top[0], outfit.top[1], 2);
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