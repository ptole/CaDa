class Level {
    GRID = [];      //array of uint8arrays (id's)
    entities = [];  //array of objects
    enemies = {};   //object, id : object
    walls = [];     //array of [x,y] pairs
    pickups = [];   //array of objects
    effects = [];   //array of objects

    inactives; //array of entities. basically enemies but inactives.
    freeSpaceForSpawn; //this is getting way too complicated

    size = 100;

    constructor() {
        this.GRID = [];
        this.entities = [];
        this.enemies = {};
        this.walls = [];
        this.inactives = [];
        this.freeSpaceForSpawn = [];
        this.pickups = [];
        this.effects = [];

        for (let i = 0; i < this.size; i++) {
            this.GRID.push(new Uint8Array(this.size));
        }

        for (let i = 0; i < this.size; i++) {
            for (let j = 0; j < this.size; j++) {
                this.addWall(i, j);
            }
        }
    }

    triggerInactives(x, y) {
        let indecies = [];
        for (let i = 0; i < this.inactives.length; i++) {
            if (Math.abs(this.inactives[i].grid_x - x) <= 7) {
                if (Math.abs(this.inactives[i].grid_y - y) <= 7) {
                    indecies.push(i);
                    this.inactives[i].trigger();
                }
            }
        }
        for (let i = 0; i < indecies.length; i++) {
            this.inactives.splice(indecies[i], 1);
        }
    }

    addEnemy(entity) {
        if (!Object.keys(this.enemies).includes(entity.id.toString()))
            this.enemies[entity.id] = entity;

        this.addEntity(entity);
        this.inactives.push(entity);
    }

    addEntity(entity) {
        if (!this.entities.some(e => e.id === entity.id))
            this.entities.push(entity);
    }

    addPickup(pickup) {
        this.pickups.push(pickup);
    }

    removePickup(pickup){
        let index;
        for(let i = 0; i< this.pickups.length; i++){
            if(pickup.paid === this.pickups[i].paid){
                index = i;
            }
        }

        this.pickups.splice(index,1);

        pickup.active = false;
        pickup.level = undefined;
        this.GRID[pickup.grid_x][pickup.grid_y] = 0;

        pickup.grid_x = undefined;
        pickup.grid_y = undefined;
    }

    addWall(x, y) {
        if (this.GRID[x][y] != 127) {
            this.walls.push([x, y]);
            this.GRID[x][y] = 127;
        }
    }

    removeWall(x, y) {
        //Exclude borders
        if(x === 0){return;} else if(y === 0){return;} else if(x === this.size-1){return;} else if(y === this.size-1){return;}
        for (let i = 0; i < this.walls.length; i++) {
            if ((this.walls[i][0] === x) && (this.walls[i][1] === y)) {
                this.walls.splice(i, 1);
                this.GRID[x][y] = 0;
                this.freeSpaceForSpawn.push([x, y]);
            }
        }
    }

    removeEntity(e) {

        e.active = false;
        e.level = undefined;
        this.GRID[e.grid_x][e.grid_y] = 0;

        e.grid_x = undefined;
        e.grid_y = undefined;

        let index;
        for (let i = 0; i < this.entities.length; i++) {
            if (this.entities[i].id === e.id) {
                index = i;
            }
        }

        this.entities.splice(index, 1);

        if (Object.keys(this.enemies).includes(e.id)) {
            delete this.enemies[e.id];
        }
    }

    getEnemyById(id) {
        if(id === 0 || id === 125 || id === 127 || id === 1){
            return undefined;
        }
        return this.enemies[id.toString()];
    }

    getEnemyByCoord(x, y) {
        return this.getEnemyById(this.GRID[x][y]);
    }

    getEntityByCoord(x, y) {
        let rslt;
        for (let i = 0; i < this.entities.length; i++) {
            if ((this.entities[i].grid_x === x) && (this.entities[i].grid_y === y)) {
                rslt = this.entities[i];
            }

        }
        return rslt;
    }

    isEnemy(x, y) {
        return Object.keys(this.enemies).includes(this.GRID[x][y].toString());
    }

    getPickupByCoord(x, y) {
        let rslt;
        for (let i = 0; i < this.pickups.length; i++) {
            if ((this.pickups[i].grid_x === x) && (this.pickups[i].grid_y === y)) {
                rslt = this.pickups[i];
            }

        }
        return rslt;
    }
}

export { Level };