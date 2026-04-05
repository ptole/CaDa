import { Ability } from "./ability.js";
import { LM, AM, LOG, PLAYER } from "../../main.js";
import { pseudoray } from "../../modules/utils/pseudoray.js";
import { Effect } from "../../modules/effect.js";
import { rollDice } from "../../modules/utils/dice.js";
import { rollMultipleDice } from "../../modules/utils/dice.js";

class Lightningbolt extends Ability {

    effect;
    dd = 6;
    dcount = 5;

    constructor() {
        super();
        super.use = this.cast;
        super.name = "Lightning bolt";
        super.description = "5d6 damage in a line";
        this.effect = new Effect(AM.sprites["lightning"], []);
    }

    cast(origin_x, origin_y, dir_x, dir_y) {
        const path = pseudoray(origin_x, origin_y, dir_x, dir_y, LM.currentLevel.GRID);

        this.effect.coord_list = path;
        LM.currentLevel.effects.push(this.effect);

        LOG.innerHTML += `You cast ${this.name}<br>`;
        LOG.scrollTop = LOG.scrollHeight;

        path.forEach(e => {
            let enemy = LM.currentLevel.getEnemyById(LM.currentLevel.GRID[e[0]][e[1]]);
            if (enemy) {

                const dmg = rollMultipleDice(this.dcount,this.dd);
                LOG.innerHTML += `${enemy.name} takes ${dmg} damage!<br>`;
                LOG.scrollTop = LOG.scrollHeight;

                enemy.takeDamage(dmg);
            } else if(PLAYER.grid_x === e[0] && PLAYER.grid_y === e[1]){
                const dmg = rollMultipleDice(this.dcount,this.dd);
                LOG.innerHTML += `${PLAYER.name} takes ${dmg} damage!<br>`;
                LOG.scrollTop = LOG.scrollHeight;
                PLAYER.takeDamage(dmg);
            }
        });

        AM.audio["magic"].play();
    }
}

export { Lightningbolt };