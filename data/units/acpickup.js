import { Entity } from "../../modules/entity.js";
import { LOG, AM, PLAYER } from "../../main.js";


class ACPickup extends Entity {

    acgain;

    constructor(armourgain) {
        super();
        this.acgain = armourgain;
        super.name = "Armour pickup";
        super.description = `Gain ${this.acgain} AC`;
        super.sprite = AM.sprites["shield"];
        super.active = false;
        super.remove = this.consume;
        super.id = 125;
    }

    consume(){
        this.map.removePickup(this);
        PLAYER.ac += this.acgain;
        LOG.innerHTML += `You gained ${this.acgain} AC<br>`;
        LOG.scrollTop = LOG.scrollHeight;
        AM.audio["pickup"].play();
    }
}

export { ACPickup };