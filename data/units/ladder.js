import { Entity } from "../../modules/entity.js";
import { LOG, AM, PLAYER, LM } from "../../main.js";


class Ladder extends Entity {

    target_level

    constructor(tgt) {
        super();
        this.target_level = tgt;
        super.name = "Ladder";
        super.description = `Ascend to the next level of Castle Darkholm.<br>`;
        super.sprite = AM.sprites["ladder"];
        super.active = false;
        super.remove = this.consume;
        super.id = 125;
        super.sprite_offset_y = -64;
    }

    consume(){
        this.map.removePickup(this);
        LOG.innerHTML += `You climb upwards towards your ultimate goal.<br>`;
        LOG.scrollTop = LOG.scrollHeight;
        AM.audio["door"].play();

        LM.loadLevel(this.tgt);
        
    }
}

export { Ladder };