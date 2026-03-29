import { Entity } from "../../modules/entity.js";
import { LOG, AM } from "../../main.js";


class PrincePagurus extends Entity {

    constructor() {
        super();
        super.name = "Prince Pagurus";
        super.description = "Scion of aquatic royalty and general of seventy legions of war crabs.";
        super.sprite = AM.sprites["merfolk_big"];
        super.sprite_offset_x = -16;
        super.sprite_offset_y = -32;
        super.ab = 2;
        super.ac = 15;
        super.hp = 10;
        super.db = 1;
        super.dd = 4;
    }
}

export { PrincePagurus };