import { Entity } from "../../modules/entity.js";
import { LOG, AM } from "../../main.js";


class PrincePagurus extends Entity {

    constructor() {
        super();
        super.name = "Prince Pagurus";
        super.description = "Scion of aquatic royalty and general of seventy legions of war crabs.";
        super.sprite = AM.sprites["merfolk_big"];
        super.sprite_offset_x = -16;
        super.sprite_offset_y = -32;
        super.ab = 2;
        super.ac = 15;
        super.hp = 10;
        super.db = 1;
        super.dd = 4;
        super.trigger = this.bossTrigger;
        super.remove = this.bossDeath;
    }

    bossTrigger() {
        this.active = true;
        AM.audio["pressure"].pause();

        AM.audio["boss"].loop = true;
        AM.audio["boss"].play();

        LOG.innerHTML += `${this.name}:<br>`;
        LOG.innerHTML += `"A mere mortal trying to challenge us? The audacity! Prepare to drown toe-haver!"<br>`;
        LOG.scrollTop = LOG.scrollHeight;

    }

    bossDeath() {
        this.map.removeEntity(this);

        AM.audio["boss"].pause();

        AM.audio["pressure"].loop = true;
        AM.audio["pressure"].play();

        LOG.innerHTML += `${this.name} dies<br>`;
        LOG.scrollTop = LOG.scrollHeight;
        AM.audio["death_1"].play();
    }

}

export { PrincePagurus };