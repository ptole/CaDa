import { Entity } from "../../modules/entity.js";
import { LOG, AM } from "../../main.js";
import { rollDice } from "../../modules/utils/dice.js";


class Octopoid extends Entity {

    constructor() {
        super();
        super.name = "Octopoid";
        super.description = "Unholy offspring of fisherman's wife. Attacks 8 times.";
        super.sprite = AM.sprites["octopoid"];
        super.ab = -8;
        super.ac = 8;
        super.hp = 8;
        super.db = 0;
        super.dd = 1;
        super.attack = this.multiattack;
    }

    multiattack(target) {
        for (let i = 0; i < 8; i++) {
            let d20 = rollDice(20);
            let rslt = d20 + this.ab;
            LOG.innerHTML += `${this.name} attacks ${target.name}<br>`;

            if (rslt >= target.ac) {
                LOG.innerHTML += `${this.name} rolls ${d20} + ${this.ab} = ${rslt} and hits!<br>`;
                let dmgdice = rollDice(this.dd);
                rslt = dmgdice + this.db;
                LOG.innerHTML += `${this.name} hits ${target.name} for ${dmgdice} + ${this.db} = ${rslt}<br>`;
                target.takeDamage(rslt);
            } else {
                LOG.innerHTML += `${this.name} rolls ${d20} + ${this.ab} = ${rslt} and misses<br>`;
            }

            LOG.scrollTop = LOG.scrollHeight;

            AM.audio["attack_1"].play();
        }
    }
}

export { Octopoid };