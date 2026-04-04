import { Entity } from "../../modules/entity.js";
import { LOG, AM, PLAYER } from "../../main.js";


class ABPickup extends Entity {

    abgain;

    constructor(abgain) {
        super();
        this.abgain = abgain;
        super.name = "Attack pickup";
        super.description = `Gain ${this.abgain} AB`;
        super.sprite = AM.sprites["weapons"];
        super.active = false;
        super.remove = this.consume;
        super.id = 125;
    }

    consume(){
        this.map.removePickup(this);
        PLAYER.ab += this.abgain;
        LOG.innerHTML += `You gained ${this.abgain} AB<br>`;
        LOG.scrollTop = LOG.scrollHeight;
        AM.audio["pickup"].play();
    }
}

export { ABPickup };