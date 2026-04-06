import { Entity } from "../../modules/entity.js";
import { LOG, AM } from "../../main.js";


class Gorilla extends Entity {

    constructor() {
        super();
        super.name = "Circus animal";
        super.description = "Recently emancipated animal who has eaten its captors.";
        super.sprite = AM.sprites["gorilla"];
        super.ab = 0;
        super.ac = 10;
        super.hp = 10;
        super.db = 0;
        super.dd = 8;
    }
}

export { Gorilla };