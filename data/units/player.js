import { Entity } from "../../modules/entity.js";
import { LOG, AM } from "../../main.js";


class Player extends Entity {

    constructor() {
        super();
        super.id = 1;
        super.name = "The Hero";
        super.description = "Final hope of mankind";
        super.remove = this.playerDeath;
        super.active = true;
        super.sprite = AM.sprites["hero"];

        super.hp = 10;
        super.ab = 0;
        super.ac = 10;
        super.db = 0;
        super.dd = 6;
    
    }

    playerDeath(){
        super.active = false;

        LOG.innerHTML += `You have died, and with you dies all hope for this world.<br>`;
        LOG.scrollTop = LOG.scrollHeight;
        AM.audio["death_1"].play();
    }
}

export { Player };