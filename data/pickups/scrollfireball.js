import { Entity } from "../../modules/entity.js";
import { LOG, AM, PLAYER } from "../../main.js";
import { Fireball } from "../abilities/fireball.js";


class ScrollFireball extends Entity {

    ability;

    constructor(dummy) {
        super();
        this.ability = new Fireball();
        super.name = "Scroll of Fireball";
        super.description = `Shoot a fireball, dealing 5d6 damage in a 1 tile radius.`;
        super.sprite = AM.sprites["scroll"];
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

export { ScrollFireball };