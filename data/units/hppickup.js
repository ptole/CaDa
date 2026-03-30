import { Entity } from "../../modules/entity.js";
import { LOG, AM, PLAYER } from "../../main.js";


class HPPickup extends Entity {

    hpgain;

    constructor(hpgain) {
        super();
        this.hpgain = hpgain;
        super.name = "Health pickup";
        super.description = `Gain ${this.hpgain} HP`;
        super.sprite = AM.sprites["heart"];
        super.active = false;
        super.remove = this.consume;
        super.id = 125;
    }

    consume(){
        this.map.removePickup(this);
        PLAYER.hp += this.hpgain;
        LOG.innerHTML += `You are healed for ${this.hpgain}<br>`;
        LOG.scrollTop = LOG.scrollHeight;
        AM.audio["pickup"].play();

    }
}

export { HPPickup };