import { Entity } from "../../modules/entity.js";
import { LOG, AM } from "../../main.js";


class Demon extends Entity {

    constructor() {
        super();
        super.name = "Demon";
        super.description = "Enslaved monster from the eighth circle of hell.";
        super.sprite = AM.sprites["troll"];
        super.ab = 2;
        super.ac = 16;
        super.hp = 15;
        super.db = 2;
        super.dd = 8;
    }
}

export { Demon };