import { Entity } from "../../modules/entity.js";
import { LOG, AM } from "../../main.js";
import { Ladder } from "./ladder.js";
import { rollDice } from "../../modules/utils/dice.js";


class Barno extends Entity {

    constructor() {
        super();
        super.name = "Grand Wizard Barnogoth";
        super.description = "Self-made man, self-made divinity, self-made wizard.";
        super.sprite = AM.sprites["barno"];
        super.sprite_offset_x = -16;
        super.sprite_offset_y = -32;
        super.ab = 2;
        super.ac = 20;
        super.hp = 50;
        super.db = 2;
        super.dd = 12;
        super.trigger = this.bossTrigger;
        super.remove = this.bossDeath;
    }

    bossTrigger() {
        this.active = true;
        AM.audio["pressure"].pause();

        AM.audio["boss"].loop = true;
        AM.audio["boss"].play();

        //LOG.innerHTML += `${this.name}:<br>`;
        //LOG.innerHTML += `<br>`;
        //LOG.scrollTop = LOG.scrollHeight;

    }

    bossDeath() {

        this.map.removeEntity(this);

        AM.audio["boss"].pause();

        AM.audio["pressure"].loop = true;
        AM.audio["pressure"].play();

        LOG.innerHTML += `${this.name}:<br>`;
        LOG.innerHTML += `<br>`;
        LOG.scrollTop = LOG.scrollHeight;
        AM.audio["death_1"].play();
    }

}

export { Barno };