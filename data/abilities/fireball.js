import { Ability } from "./ability.js";
import { LM, AM, LOG, PLAYER } from "../../main.js";
import { pseudoray } from "../../modules/utils/pseudoray.js";
import { Effect } from "../../modules/effect.js";
import { rollDice } from "../../modules/utils/dice.js";
import { rollMultipleDice } from "../../modules/utils/dice.js";

class Fireball extends Ability {

    effect;
    dd = 6;
    dcount = 5;

    constructor() {
        super();
        super.use = this.cast;
        super.name = "Fireball";
        super.description = "5d6 fire damage";
        this.effect = new Effect(AM.sprites["fire"], []);
    }

    cast(origin_x, origin_y, dir_x, dir_y) {
        const path = pseudoray(origin_x, origin_y, dir_x, dir_y, LM.currentLevel.GRID);
        const end = path.pop();

        const area = [];
        area.push([end[0] - 1, end[1] + 1])
        area.push([end[0], end[1] + 1])
        area.push([end[0] + 1, end[1] + 1])
        area.push([end[0] - 1, end[1]])
        area.push([end[0], end[1]])
        area.push([end[0] + 1, end[1]])
        area.push([end[0] - 1, end[1] - 1])
        area.push([end[0], end[1] - 1])
        area.push([end[0] + 1, end[1] - 1])

        this.effect.coord_list = area;
        LM.currentLevel.effects.push(this.effect);

        LOG.innerHTML += `You cast ${this.name}<br>`;
        LOG.scrollTop = LOG.scrollHeight;

        area.forEach(e => {
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
    }
}

export { Fireball };