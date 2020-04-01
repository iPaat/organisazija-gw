import {spawnCoords, offsetPosition} from './Options/sHelpers'

const teamData: TeamData = require('./Data/TeamData.json');

require('./Auth/sLogin');

let team: TeamData = null;

mp.events.add("sIndex-mod", (player, mod, modValue) => {
    player.vehicle.setMod(parseInt(mod), parseInt(modValue));
});

mp.events.addCommand({
    'team': (player, _, num) => {
        if (!teamData[parseInt(num)]) {
            player.notify('Team ~r~nicht ~s~gefunden!');

            return;
        }

        team = teamData[parseInt(num)];

        player.respawn(team.spawn);
        player.model = mp.joaat('mp_m_freemode_01');

        if (team.outfit) {
            player.changeOutfit(team.outfit)
        }

        // Team Weapon
        player.giveWeapon(mp.joaat(team.weapon), 1);

        // Default Weapons
        player.giveWeapon(RageEnums.Hashes.Weapon.ASSAULTRIFLE, 600);
        player.giveWeapon(RageEnums.Hashes.Weapon.CARBINERIFLE, 600);
        player.giveWeapon(RageEnums.Hashes.Weapon.ADVANCEDRIFLE, 600);
        player.giveWeapon(RageEnums.Hashes.Weapon.BULLPUPRIFLE, 600);
        player.giveWeapon(RageEnums.Hashes.Weapon.HEAVYPISTOL, 600);
        player.giveWeapon(RageEnums.Hashes.Weapon.UNARMED, 1);

        mp.players.forEach((p) => {
            if (p.id === player.id) {
                p.notify(`Du gehörst nun zum Team ${team.chatColor}${team.name}~s~.`);

                return
            }

            p.notify(`${player.niceName} gehört nun zum Team ${team.chatColor}${team.name}~s~.`);
        })
    },

    'car': (player) => {
        if (!team) {
            player.notify('Du bist in ~r~keinem ~s~Team!');

            return
        }

        const playerPos = player.position;
        const vehiclePos = offsetPosition(playerPos.x, playerPos.y, player.heading, 2);
        const vehicle = mp.vehicles.new(mp.joaat(team.vehicle), new mp.Vector3(vehiclePos.x, vehiclePos.y, playerPos.z), {
            heading: player.heading + 90,
            dimension: player.dimension,
        });

        vehicle.setColor(team.vehicleColor[0], team.vehicleColor[1]);
        vehicle.numberPlateType = 1;
        vehicle.numberPlate = team.short;
    },

    'pos': (player) => {
        const pos = player.position;
        let rot;
        if (player.vehicle) rot = player.vehicle.rotation.z;
        else rot = player.heading;
        const str = `x: ${pos.x}, y: ${pos.y}, z: ${pos.z}, rot: ${rot}, dim: ${player.dimension}`;

        player.outputChatBox(str);
    },

    'v': (player, _) => {
        if (player.adminLvl < 1) return;

        const pos = player.position;
        const vehicle = mp.vehicles.new(RageEnums.Hashes.Vehicle.HYDRA, new mp.Vector3(pos.x, pos.y, pos.z), {
            heading: player.heading,
            dimension: player.dimension,
        });

        player.putIntoVehicle(vehicle, -1);
    },

    'vd': (player, _) => {
        if (player.adminLvl < 1) return;

        mp.vehicles.forEach((v) => {
            v.destroy()
        })
    },

    'veh': (player, _, model: string) => {
        if (player.adminLvl < 1) return;

        const playerPos = player.position;
        const vehiclePos = offsetPosition(playerPos.x, playerPos.y, player.heading, 2);

        const vehicle = mp.vehicles.new(mp.joaat(model), new mp.Vector3(vehiclePos.x, vehiclePos.y, playerPos.z), {
            heading: player.heading + 90,
            dimension: player.dimension,
        });

        vehicle.numberPlateType = 1;
        vehicle.setColor(12, 38);

        vehicle.ownerId = player.id;
    },

    'mod': (player, _, a, b) => {
        if (player.adminLvl < 1) return;

        player.vehicle.setMod(parseInt(a), parseInt(b));
    },

    'color': (player, _, a, b) => {
        if (player.adminLvl < 1) return;

        player.vehicle.setColor(parseInt(a), parseInt(b))
    },

    'plate': (player, _, plate) => {
        if (player.adminLvl < 1) return;

        player.vehicle.numberPlate = plate
    },

    'repair': (player, text) => {
        if (player.adminLvl < 1) return;

        player.vehicle.repair()
    },

    'tp': (player, _, x, y, z) => {
        if (player.adminLvl < 1) return;

        // Give player a parachute if he ports in the sky.
        player.giveWeapon(RageEnums.Hashes.Weapon.PARACHUTE, 2);

        player.teleport({
            pos: new mp.Vector3(parseInt(x), parseInt(y), parseInt(z)),
            rot: 0,
            dim: 0
        });
    },

    's': (player) => {
        if (player.adminLvl < 1) return;

        player.respawn(spawnCoords)
    }
});