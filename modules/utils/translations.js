export function pixelToGrid(screen_x, screen_y, origin_x, origin_y, grid_size){
    let x = Math.floor( (screen_x - origin_x) / grid_size );
    let y = Math.floor( (screen_y - origin_y) / grid_size );

    return {x, y}
}