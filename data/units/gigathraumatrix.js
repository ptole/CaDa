import { Entity } from "../../modules/entity.js";
import { LOG, AM } from "../../main.js";
import { Ladder } from "./ladder.js";


class Gigathraumatrix extends Entity {

    constructor() {
        super();
        super.name = "Dark Blademaster Gigathraumatrix";
        super.description = "The most feared duelist of all time.";
        super.sprite = AM.sprites["giga"];
        super.sprite_offset_x = -16;
        super.sprite_offset_y = -32;
        super.ab = 2;
        super.ac = 14;
        super.hp = 10;
        super.db = 2;
        super.dd = 10;
        super.trigger = this.bossTrigger;
        super.remove = this.bossDeath;
    }

    bossTrigger() {
        this.active = true;
        AM.audio["pressure"].pause();

        AM.audio["boss"].loop = true;
        AM.audio["boss"].play();

        LOG.innerHTML += `${this.name}:<br>`;
        LOG.innerHTML += `"You stand before the mightiest warrior of all the realms. There will be no shame in your defeat."<br>`;
        LOG.scrollTop = LOG.scrollHeight;

    }

    bossDeath() {
        let ldr = new Ladder(2);
        ldr.id = 125;
        ldr.grid_x = this.grid_x;
        ldr.grid_y = this.grid_y;
        ldr.paid = 127;
        ldr.map = this.map;


        this.map.removeEntity(this);

        AM.audio["boss"].pause();

        AM.audio["pressure"].loop = true;
        AM.audio["pressure"].play();

        LOG.innerHTML += `${this.name} dies<br> A way to ascend the castle has been revealed.<br>`;
        LOG.scrollTop = LOG.scrollHeight;
        AM.audio["death_1"].play();

        this.map.addPickup(ldr);
        this.map.GRID[ldr.grid_x][ldr.grid_y] = 125;
    }

}

export { Gigathraumatrix };