import { Entity } from "../../modules/entity.js";
import { LOG, AM } from "../../main.js";
import { Ladder } from "./ladder.js";
import { rollDice } from "../../modules/utils/dice.js";


class Courtjester extends Entity {

    dicelist = [2,3,4,6,8,10,12];

    constructor() {
        super();
        super.name = "High Court Jester D'Zanni";
        super.description = "Pagliacci's misanthropic cousin.";
        super.sprite = AM.sprites["jester"];
        super.sprite_offset_x = -16;
        super.sprite_offset_y = -32;
        super.ab = 2;
        super.ac = 15;
        super.hp = 10;
        super.db = 0;
        super.dd = "random";
        super.trigger = this.bossTrigger;
        super.remove = this.bossDeath;
        super.attack = this.jesterAttack;
    }

    bossTrigger() {
        this.active = true;
        AM.audio["pressure"].pause();

        AM.audio["boss"].loop = true;
        AM.audio["boss"].play();

        LOG.innerHTML += `${this.name}:<br>`;
        LOG.innerHTML += `"Life is a joke and this world is a circus. Give your nose a squeeze, hero, and listen. Which one of us is the fool?"<br>`;
        LOG.scrollTop = LOG.scrollHeight;

    }

    jesterAttack(target) {
            let d20 = rollDice(20);
            let rslt = d20 + this.ab;
            LOG.innerHTML += `${this.name} attacks ${target.name}<br>`;
    
            if (rslt >= target.ac) {
                LOG.innerHTML += `${this.name} rolls ${d20} + ${this.ab} = ${rslt} and hits!<br>`;
                let lolrandom = this.dicelist[rollDice(7)];
                let dmgdice = rollDice(lolrandom);
                rslt = dmgdice + this.db;
                LOG.innerHTML += `${this.name} hits ${target.name} for ${dmgdice} + ${this.db} = ${rslt}<br>`;
                target.takeDamage(rslt);
            } else {
                LOG.innerHTML += `${this.name} rolls ${d20} + ${this.ab} = ${rslt} and misses<br>`;
            }
    
            LOG.scrollTop = LOG.scrollHeight;
    
            AM.audio["attack_1"].play();
        };

    bossDeath() {
        let ldr = new Ladder(4);
        ldr.id = 125;
        ldr.grid_x = this.grid_x;
        ldr.grid_y = this.grid_y;
        ldr.paid = 127;
        ldr.map = this.map;


        this.map.removeEntity(this);

        AM.audio["boss"].pause();

        AM.audio["pressure"].loop = true;
        AM.audio["pressure"].play();

        LOG.innerHTML += `${this.name}:<br>`;
        LOG.innerHTML += `"The curtain calls."<br>`;
        LOG.innerHTML += `${this.name} dies<br> A way to ascend the castle has been revealed.<br>`;
        LOG.scrollTop = LOG.scrollHeight;
        AM.audio["death_1"].play();

        this.map.addPickup(ldr);
        this.map.GRID[ldr.grid_x][ldr.grid_y] = 125;
    }

}

export { Courtjester };