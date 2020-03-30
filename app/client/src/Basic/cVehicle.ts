import {roundNum} from "../Options/cHelpers";

const player = mp.players.local;

class Vehicle {
    speed: number = 0;

    constructor() {
        // Disable grenades.
        mp.game.controls.disableControlAction(0, 58, true);

        mp.events.add({
            "render": () => {
                this.showSpeed();
            }
        });
    }

    showSpeed() {
        const vehicle = player.vehicle;
        if (!vehicle || mp.gui.cursor.visible) return;

        this.speed = roundNum(vehicle.getSpeed() * 4);

        mp.game.graphics.drawText("     Speed: " + this.speed + " km/h", [0.920, 0.835], {
            font: 1,
            color: [255, 255, 255, 255],
            scale: [0.6, 0.6],
            outline: true,
            centre: false
        });
    }

    getIntoVehicleAsPassenger() {
        if (mp.gui.cursor.visible || player.vehicle) return;

        const pos = player.position;
        const vehHandle = mp.game.vehicle.getClosestVehicle(pos.x, pos.y, pos.z, 5, 0, 70);
        const vehicle = mp.vehicles.atHandle(vehHandle);

        if (!vehicle || !vehicle.isAnySeatEmpty() || vehicle.getSpeed() > 5) return;

        for (let i = 0; i < vehicle.getMaxNumberOfPassengers(); i++) {
            if (!vehicle.isSeatFree(i)) continue;

            player.taskEnterVehicle(vehicle.handle, 5000, i, 1, 1, 0);

            break;
        }
    }
}

const veh = new Vehicle();

// Enter as passenger if G is pressed.
mp.keys.bind(0x47, false, function () {
    veh.getIntoVehicleAsPassenger();
});