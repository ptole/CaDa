import { Entity } from "../../modules/entity.js";
import { LOG, AM } from "../../main.js";


class Undead extends Entity {

    constructor() {
        super();
        super.name = "Undead";
        super.description = "Dead castle servant, risen to serve once again.";
        super.sprite = AM.sprites["undead"];
        super.ab = -1;
        super.ac = 5;
        super.hp = 5;
        super.db = 0;
        super.dd = 4;
        super.xp_yield = 0;
    }
}

export { Undead };