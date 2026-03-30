import { Level } from "./level.js";
import levels from "../data/levels.json" with { type: "json" };
import { LOG } from "../main.js";
import { UNIT_LUT } from "../data/units/unitLUT.js";
import { DrunkenWalker } from "./utils/crawler.js";
import { PLAYER, updateUI, draw, calcGridOffset } from "../main.js";


class LevelManager {
    currentLevel

    loadLevel(number) {

        const data = levels.levels[number.toString()];
        const lvl = new Level();

        //0 and 1 are reserved, so are 125, 126 and 127
        let running_id = 2;

        //load data into the level       

        let bs = []; //Branch starts

        bs = bs.concat(this.generateLevelLayout(lvl, 0, 0));
        bs = bs.concat(this.generateLevelLayout(lvl, 25, 25));
        bs = bs.concat(this.generateLevelLayout(lvl, 50, 50));
        bs = bs.concat(this.generateLevelLayout(lvl, 99, 99));

        bs = bs.concat(this.generateLevelLayout(lvl, 99, 0));
        bs = bs.concat(this.generateLevelLayout(lvl, 74, 25));
        bs = bs.concat(this.generateLevelLayout(lvl, 50, 50));
        bs = bs.concat(this.generateLevelLayout(lvl, 0, 99));

        for (let i = 0; i < bs.length; i++) {
            if (bs[i].length > 0) {
                this.generateLevelLayout(lvl, bs[i][0], bs[i][1]);
            }
        }

        this.addLevelBorders(lvl);

        //Create the enemies
        for (const [key, enemy] of Object.entries(data.enemies)) {
            for (let i = 0; i < enemy.count; i++) {
                let e = new UNIT_LUT[enemy.shorthand];
                e.id = running_id;
                e.map = lvl;
                lvl.addEnemy(e);
                this.findFreeSpaceAndPlaceEntity(lvl, e);
                running_id++;
            }
        }

        //Create pickups
        running_id = 2;

        for (const [key, pickup] of Object.entries(data.pickups)) {
            for (let i = 0; i < pickup.count; i++) {
                let pu = new UNIT_LUT[pickup.shorthand](pickup.value);
                pu.map = lvl;
                pu.paid = running_id;
                lvl.addPickup(pu);
                this.findFreeSpaceAndPlaceEntity(lvl, pu);
                running_id++;
            }
        }

        this.currentLevel = lvl;

        LOG.innerHTML += `Entering ${data.name} <br>`;
        LOG.innerHTML += `${data.description}<br>`;
        LOG.scrollTop = LOG.scrollHeight;

        this.findFreeSpaceAndPlaceEntity(this.currentLevel, PLAYER);
        PLAYER.map = this.currentLevel;
        
        this.currentLevel.GRID[PLAYER.grid_x][PLAYER.grid_y] = 1;
        updateUI();
        calcGridOffset();
        draw();
    }

    findFreeSpaceAndPlaceEntity(lvl, e) {
        let i = Math.floor(Math.random() * lvl.freeSpaceForSpawn.length);
        let coord = lvl.freeSpaceForSpawn[i];
        lvl.freeSpaceForSpawn.splice(i, 1);
        e.grid_x = coord[0];
        e.grid_y = coord[1];
        lvl.GRID[e.grid_x][e.grid_y] = e.id;
    }

    addLevelBorders(lvl) {
        for (let i = 0; i < lvl.size; i++) {
            lvl.addWall(i, 0);
            lvl.addWall(0, i);
            lvl.addWall(i, lvl.size - 1);
            lvl.addWall(lvl.size - 1, i);
        }
    }

    carveOutWalls(lvl, nx, ny) {
        lvl.removeWall(nx - 1, ny);
        lvl.removeWall(nx + 1, ny);
        lvl.removeWall(nx, ny - 1);
        lvl.removeWall(nx, ny + 1);
        lvl.removeWall(nx, ny);
        lvl.removeWall(nx + 1, ny + 1);
        lvl.removeWall(nx - 1, ny - 1);
        lvl.removeWall(nx + 1, ny - 1);
        lvl.removeWall(nx - 1, ny + 1);
    }

    generateLevelLayout(lvl, x, y) {
        const crawler = new DrunkenWalker(x, y);

        let branch_start_point = [];

        if((x < 0) || (x > lvl.size-1)){
            
            return branch_start_point;
        }
        if( (y < 0) || (y > lvl.size-1)){
            return branch_start_point;
        }

        this.carveOutWalls(lvl, x, y);

        for (let i = 1; i < 300; i++) {
            crawler.takeNextStep();
            const nx = Math.floor(crawler.x);
            const ny = Math.floor(crawler.y);

            if (Math.random() < 0.03) {
                branch_start_point.push([nx, ny]);
            }

            this.carveOutWalls(lvl, nx, ny);
        }

        return branch_start_point;
    }
}

export { LevelManager };