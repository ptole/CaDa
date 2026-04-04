export function pseudoray(origin_x, origin_y, dir_x, dir_y, GRID) {
    let path = [];

    let nx = origin_x + dir_x;
    let ny = origin_y + dir_y;

    while (true) {
        //give path to first entity or wall in a line
        if (GRID[nx][ny] === 0 || GRID[nx][ny] === 125) {
            path.push([nx, ny]);
            nx += dir_x;
            ny += dir_y;
        }else{
            break;
        }
    }

    return path;
}