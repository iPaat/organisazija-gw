import {spawnCoords, offsetPosition} from './Options/sHelpers'

require('./Auth/sLogin');

mp.events.add("sIndex-mod", (player, mod, modValue) => {
    player.vehicle.setMod(parseInt(mod), parseInt(modValue));
});

mp.events.addCommand({
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