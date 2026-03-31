import { Entity } from "../../modules/entity.js";
import { LOG, AM } from "../../main.js";


class Gladiator extends Entity {

    constructor() {
        super();
        super.name = "Gladiator";
        super.description = "Enslaved warrior, honed and refined in endless combat.";
        super.sprite = AM.sprites["gladiator"];
        super.ab = 1;
        super.ac = 12;
        super.hp = 8;
        super.db = 1;
        super.dd = 6;
    }
}

export { Gladiator };