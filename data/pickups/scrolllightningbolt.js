import { Entity } from "../../modules/entity.js";
import { LOG, AM, PLAYER } from "../../main.js";
import { Lightningbolt } from "../abilities/lightningbolt.js";


class ScrollLightningbolt extends Entity {

    ability;

    constructor(dummy) {
        super();
        this.ability = new Lightningbolt();
        super.name = "Scroll of Lightning bolt";
        super.description = `Shoot a bolt of lightning, dealing 5d6 damage in a line.`;
        super.sprite = AM.sprites["scroll_lightning"];
        super.active = false;
        super.remove = this.consume;
        super.id = 125;
    }

    consume(){
        this.map.removePickup(this);
        PLAYER.addAbility(this.ability);
        LOG.innerHTML += `You pick up ${this.name}<br>`;
        LOG.scrollTop = LOG.scrollHeight;
        AM.audio["pickup"].play();

    }
}

export { ScrollLightningbolt };