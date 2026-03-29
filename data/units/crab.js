import { Entity } from "../../modules/entity.js";
import { LOG, AM } from "../../main.js";


class Crab extends Entity {

    constructor() {
        super();
        super.name = "Crab";
        super.description = "Crustacean bred for war.";
        super.sprite = AM.sprites["crab"];
        super.ab = 0;
        super.ac = 5;
        super.hp = 5;
        super.db = 0;
        super.dd = 3;
    }
}

export { Crab };