interface PlayerMp {
    loggedIn: boolean;
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    lang: string;
    adminLvl: number;
    niceName: string;

    updateName(): void;

    isDriver(): boolean;

    teleport(coords: EntityCoords): void;

    respawn(coords: EntityCoords): void;
}

interface VehicleMp {
    ownerId: number
}

interface TeamData {
    name: string;
    short: string;
    chatColor: string;
    spawn: EntityCoords;
    weapon: string;
    vehicle: string;
    vehicleColor?: (number)[] | null;
}

interface DatabaseConfig {
    port: number;
    host: string;
    user: string;
    password: string;
    database: string;
}

interface EntityCoords {
    pos: Vector3Mp;
    rot: number;
    dim: number;
}