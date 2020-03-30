export const spawnCoords = {
    pos: new mp.Vector3(-1858.76, -348.24, 49.83774),
    rot: 142,
    dim: 0
};

export function offsetPosition(x: number, y: number, rot: number, distance: number) {
    return {
        x: x + Math.sin(-rot * Math.PI / 180) * distance,
        y: y + Math.cos(-rot * Math.PI / 180) * distance,
    };
}