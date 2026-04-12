import { Entity } from "../../modules/entity.js";
import { LOG, AM } from "../../main.js";


class SSSMClone extends Entity {

    constructor() {
        super();
        super.name = "Clone";
        super.description = "Defective and flawed clone of the Sorceror Supreme himself.";
        super.sprite = AM.sprites["sssm_clone"];
        super.ab = 0;
        super.ac = 5;
        super.hp = 5;
        super.db = 0;
        super.dd = 3;
    }
}

export { SSSMClone };