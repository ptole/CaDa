import { PriorityQueue } from "./utils/PQ.js";
import { LOG, AM, PLAYER } from "../main.js";
import { rollDice } from "./utils/dice.js";

class Entity {
    id;
    active = false;
    screen_x;
    screen_y;
    grid_x;
    grid_y;

    sprite;
    sprite_offset_x = 0;
    sprite_offset_y = 0;

    move = this.basicMove;
    attack = this.basicAttack;
    remove = this.basicDeath;
    description;
    name;
    hp = 1;
    map;        //This nomenclature sucks, but for sanitys sake "level" is the gamey power level of player so this had to be changed
    ab = 0;     //attack bonus
    ac = 10;    //armour class
    db = 0;     //damage bonus
    dd = 3;     //damage dice

    xp_yield = 1;

    trigger = this.basicTrigger;

    paid; //passive id, meant to separate different pickups from eachother

    basicTrigger() {
        this.active = true;
    }

    basicMove(target) {
        if (!this.active)
            return;

        const dx = target.grid_x - this.grid_x;
        const dy = target.grid_y - this.grid_y;

        const nx = this.grid_x + Math.sign(dx);
        const ny = this.grid_y + Math.sign(dy);

        if (this.map.GRID[nx][ny] === 1) {
            this.attack(target, this.map.GRID);
        }
        else if (this.map.GRID[nx][ny] === 0) {
            this.map.GRID[this.grid_x][this.grid_y] = 0;
            this.grid_x = nx;
            this.grid_y = ny;
            this.map.GRID[this.grid_x][this.grid_y] = this.id;
        }
    };

    basicAttack(target) {
        let d20 = rollDice(20);
        let rslt = d20 + this.ab;
        LOG.innerHTML += `${this.name} attacks ${target.name}<br>`;

        if (rslt >= target.ac) {
            LOG.innerHTML += `${this.name} rolls ${d20} + ${this.ab} = ${rslt} and hits!<br>`;
            let dmgdice = rollDice(this.dd);
            rslt = dmgdice + this.db;
            LOG.innerHTML += `${this.name} hits ${target.name} for ${dmgdice} + ${this.db} = ${rslt}<br>`;
            target.hp -= rslt;
        } else {
            LOG.innerHTML += `${this.name} rolls ${d20} + ${this.ab} = ${rslt} and misses<br>`;
        }

        LOG.scrollTop = LOG.scrollHeight;

        AM.audio["attack_1"].play();

        if (target.hp < 1) {
            target.remove();
        }
    };

    basicDeath() {
        this.map.removeEntity(this);

        LOG.innerHTML += `${this.name} dies<br>`;
        LOG.innerHTML += `You gained ${this.xp_yield} XP<br>`;
        PLAYER.addXP(this.xp_yield);
        LOG.scrollTop = LOG.scrollHeight;
        AM.audio["death_1"].play();
    }
};

export { Entity };