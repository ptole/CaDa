import { Entity } from "../../modules/entity.js";
import { LOG, AM, PLAYER } from "../../main.js";


class Heptagram extends Entity {

    constructor() {
        super();
        super.sprite = AM.sprites["heptagram"];
        super.active = false;
        super.remove = this.consume;
        super.id = 124;
        super.sprite_offset_x = -192;
        super.sprite_offset_y = -192;
        super.grid_x = 25;
        super.grid_y = 25;
    }

    consume(){
    }
}

export { Heptagram };