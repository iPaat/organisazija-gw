/// <reference path="../index.d.ts" />
import Database from '../Options/sDatabase'
import PlayerLoader from './sPlayerLoader';
import {spawnCoords} from '../Options/sHelpers'

class PlayerSingleton {
    constructor() {

    }

    /**
     * Create a new user into the database.
     *
     * @param player
     */
    async createUser(player: PlayerMp) {
        const socialClub: string = player.socialClub;
        const name: string = player.name;
        const r: any = await Database.query('SELECT socialClub FROM users WHERE socialClub = ? LIMIT 1', [
            socialClub
        ]);

        if (!r[0]) {
            await Database.query('INSERT INTO users (name, socialClub) VALUES (?, ?)', [
                name,
                socialClub
            ]);

            return
        }
    }

    /**
     * Updates the username in the database.
     *
     * @param player
     */
    async updateUserName(player: PlayerMp) {
        const socialClub: string = player.socialClub;
        const name: string = player.name;

        await Database.query('UPDATE users SET name = ? WHERE socialClub = ? LIMIT 1', [
            name,
            socialClub
        ]);
    }

    /**
     * Load an user from the database.
     *
     * @param player
     */
    async loadAccount(player: PlayerMp) {
        const r: any = await Database.query(
            'SELECT * from users WHERE socialClub = ? LIMIT 1',
            [
                player.socialClub
            ]
        );

        player.id = r[0].id;
        player.adminLvl = r[0].adminLvl;
        player.model = mp.joaat('mp_m_freemode_01');

        new PlayerLoader(player);

        setTimeout(() => {
            player.teleport(spawnCoords)
        }, 500);

        setTimeout(() => {
            mp.players.forEach((p) => {
                p.notify(`~g~${player.niceName} ~s~joined.`)
            });
        }, 1000);

        player.loggedIn = true;
    }
}

export default new PlayerSingleton();