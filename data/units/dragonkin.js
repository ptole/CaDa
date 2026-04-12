import { Entity } from "../../modules/entity.js";
import { LOG, AM } from "../../main.js";


class Dragonkin extends Entity {

    constructor() {
        super();
        super.name = "Dragonkin";
        super.description = "Foul brood of Meldrarrian the Consort.";
        super.sprite = AM.sprites["dragonkin"];
        super.ab = 0;
        super.ac = 5;
        super.hp = 5;
        super.db = 0;
        super.dd = 3;
    }
}

export { Dragonkin };