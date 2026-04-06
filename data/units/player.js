import { Entity } from "../../modules/entity.js";
import { LOG, AM } from "../../main.js";
import { rollDice } from "../../modules/utils/dice.js";


class Player extends Entity {

    level = 1;
    current_xp = 0;
    nxt_lvl = 5;

    abilities = {
        "1": undefined,
        "2": undefined,
        "3": undefined
    }

    constructor() {
        super();
        super.id = 1;
        super.name = "You";
        super.description = "Final hope of mankind";
        super.remove = this.playerDeath;
        super.attack = this.playerAttack;
        super.active = true;
        super.sprite = AM.sprites["hero"];

        super.hp = 10;
        super.ab = 0;
        super.ac = 10;
        super.db = 0;
        super.dd = 6;

    }

    playerDeath() {
        super.active = false;

        LOG.innerHTML += `You have died, and with you dies all hope for this world.<br>`;
        LOG.scrollTop = LOG.scrollHeight;
        AM.audio["death_1"].play();
        AM.audio["boss"].pause();
        AM.audio["pressure"].pause();
        AM.audio["gameover"].play();
    }

    playerAttack(target) {
        let d20 = rollDice(20);
        let rslt = d20 + this.ab;
        LOG.innerHTML += `${this.name} attack ${target.name}<br>`;

        if (rslt >= target.ac) {
            LOG.innerHTML += `${this.name} roll ${d20} + ${this.ab} = ${rslt} and hit!<br>`;
            let dmgdice = rollDice(this.dd);
            rslt = dmgdice + this.db;
            LOG.innerHTML += `${this.name} hit ${target.name} for ${dmgdice} + ${this.db} = ${rslt}<br>`;
            target.takeDamage(rslt);
        } else {
            LOG.innerHTML += `${this.name} roll ${d20} + ${this.ab} = ${rslt} and miss<br>`;
        }

        LOG.scrollTop = LOG.scrollHeight;

        AM.audio["attack_1"].play();
    };

    addXP(amount) {
        this.current_xp += amount;

        if (this.current_xp >= this.nxt_lvl) {
            let diff = this.current_xp - this.nxt_lvl;
            this.lvlUp(diff);
        }
    }

    lvlUp(diff) {
        this.current_xp = diff;
        this.level++;

        if (this.hp < (10 + this.level)) {
            this.hp = (10 + this.level);
        }

        if (this.level % 2 === 0) {
            this.ab++;
        }

        if (this.level % 4 === 0) {
            this.db++;
            this.ac++;
        }

        AM.audio["lvlup"].play();
        LOG.innerHTML += `${this.name} are filled with faith and hope as you ascend to level ${this.level}!<br>`;
        LOG.scrollTop = LOG.scrollHeight;
    }

    addAbility(a) {
        let i = 0;
        for (const [key, value] of Object.entries(this.abilities)) {
            if (value === undefined) {
                i = key;
                break;
            }
        }

        if (i !== "0") {
            this.abilities[i] = a;
            return parseInt(i);
        } else {
            return i;
        }
    }

    useAbility(slot,dir_x,dir_y){
        this.abilities[slot.toString()].use(this.grid_x, this.grid_y, dir_x,dir_y);
        this.abilities[slot.toString()] = undefined;
    }

}

export { Player };