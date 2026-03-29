import { Entity } from "../../modules/entity.js";
import { LOG, AM } from "../../main.js";

class Door extends Entity{
    linked_entities;

    constructor(){
        super();
        super.remove = this.kickDoor;
        super.name = "Door";
        super.description = "A door. Can be kicked open.";
    }

    kickDoor(){
        this.linked_entities.forEach(e => {
            e.active = true;
        });

        super.level.GRID[super.grid_x][super.grid_y] = 0;
        super.level.entities.splice(super.level.entities.indexOf(super.id), 1);

        LOG.innerHTML += `Door opened`;
        LOG.scrollTop = LOG.scrollHeight;
        AM.audio["door"].play();
    }
}

export {Door};