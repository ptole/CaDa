import { pixelToGrid } from "./modules/utils/translations.js";
import { Entity } from "./modules/entity.js";
import { sleep } from "./modules/utils/sleep.js"
import { LevelManager } from "./modules/levelManager.js";
import { AssetManager } from "./modules/assetManager.js";
import { Player } from "./data/units/player.js";
import { printWordByWord } from "./modules/utils/slowprint.js";

/* mainmenu stuff */
const intro = "Grand Wizard Barnogoth is preparing a great spell that will create and bring forth the eighth deadly sin into the world. Nobody knows what it is, but this has to be stopped. <br> <br> Nations and kings have buried their hatchets for the moment, and are laying siege upon the castle of the dark wizard. <br> Dragons, demons and skeletons come pouring out of the castle, but the soldiers of the alliance hold their line. They have chosen from amongst them their greatest hero, who through a secret passage has gained entry to the lowest level of Darkholm Castle with only one mission: To stop and vanquish Barnogoth. <br> <br> The world is counting on (You). <br> <br> Press &lt;Enter&gt; to begin. <br> <br> Controls: <br> &lt;Arrows&gt; or &lt;WASD&gt; to move, &lt;Space&gt; to stand still, &lt;Left Click&gt; to inspect objects.";
window.onload = (event) => {

  const m = document.getElementById("main-content");

  printWordByWord(m, intro, 50);
  const startGameEvent = async function (event) {
    if (event.key === "Enter") {

      window.removeEventListener("keypress", startGameEvent);
      m.remove();
      await init();

    }
  }

  window.addEventListener("keypress", startGameEvent);
  window.addEventListener("resize", handleResize);
};
/*----------------------------------*/




const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");
const LOG = document.querySelector("#log");
const TXTBOX = document.querySelector("#textbox");
const HP = document.querySelector("#hp");
const AC = document.querySelector("#ac");
const AB = document.querySelector("#ab");
const DMG = document.querySelector("#dmg");
const LVL_UI = document.querySelector("#level");
const EXP = document.querySelector("#exp");
const NXTLVL = document.querySelector("#nextlvl");

const AM = new AssetManager();

const LM = new LevelManager();
const PLAYER = new Player();

var grid_width = 0;
var grid_height = 0;

var grid_offset_x = 0;
var grid_offset_y = 0;

const TILE_SIZE = 64;





async function init() {

  LM.loadLevel(1);
  await sleep(1000);

  canvas.removeAttribute("hidden");
  TXTBOX.style.display = "flex";

  document.addEventListener("keydown", keyDownHandler);
  canvas.addEventListener("click", mouseClickHandler);

  canvas.width = window.innerWidth - (window.innerWidth) % TILE_SIZE;
  canvas.height = window.innerHeight * 0.9 - (window.innerHeight * 0.9) % TILE_SIZE;

  const size = getGridScaleFromScreenSize();

  grid_width = size.w;
  grid_height = size.h;



  AM.audio["pressure"].loop = true;
  AM.audio["pressure"].play();
  updateUI();

  calcGridOffset();

  draw();
}

function getGridScaleFromScreenSize() {
  const w = Math.trunc(canvas.width / TILE_SIZE);
  const h = Math.trunc(canvas.height / TILE_SIZE);
  return { w, h };
}

function drawGrid() {
  ctx.beginPath();
  ctx.strokeStyle = "rgba(126, 126, 126, 0.31)";

  for (let i = 0; i < grid_width; i++) {
    for (let j = 0; j < grid_height; j++) {
      ctx.strokeRect(i * TILE_SIZE, j * TILE_SIZE, TILE_SIZE, TILE_SIZE);
    }
  }
  ctx.closePath();
}

function drawEntities() {
  LM.currentLevel.entities.forEach(e => {
    drawEntity(e);
  });
}

function drawPickups() {
  LM.currentLevel.pickups.forEach(e => {
    ctx.drawImage(e.sprite, ((e.grid_x - grid_offset_x) * TILE_SIZE) + e.sprite_offset_x, ((e.grid_y - grid_offset_y) * TILE_SIZE) + e.sprite_offset_y);
  });
}

function drawEntity(e) {
  ctx.drawImage(e.sprite, ((e.grid_x - grid_offset_x) * TILE_SIZE) + e.sprite_offset_x, ((e.grid_y - grid_offset_y) * TILE_SIZE) + e.sprite_offset_y);
}

function drawPlayer() {
  ctx.drawImage(PLAYER.sprite, (PLAYER.grid_x - grid_offset_x) * TILE_SIZE, (PLAYER.grid_y - grid_offset_y) * TILE_SIZE);
}

function drawWall(x, y) {
  ctx.beginPath();
  ctx.fillStyle = "rgba(126, 126, 126, 0.50)";
  ctx.fillRect((x - grid_offset_x) * TILE_SIZE, (y - grid_offset_y) * TILE_SIZE, TILE_SIZE, TILE_SIZE);
  ctx.closePath();
}

function drawWalls() {
  LM.currentLevel.walls.forEach(w => {
    drawWall(w[0], w[1]);
  });
}

function updateUI() {
  HP.innerHTML = PLAYER.hp;
  AB.innerHTML = PLAYER.ab;
  AC.innerHTML = PLAYER.ac;
  DMG.innerHTML = `d${PLAYER.dd} + ${PLAYER.db}`;
  LVL_UI.innerHTML = PLAYER.level;
  EXP.innerHTML = PLAYER.current_xp;
  NXTLVL.innerHTML = PLAYER.nxt_lvl;
}

function draw() {

  ctx.beginPath();
  ctx.fillStyle = "#000000";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.closePath();

  drawGrid();
  drawWalls();
  drawPickups();
  drawEntities();
  drawPlayer();
}



function handleResize() {
  canvas.width = window.innerWidth - (window.innerWidth) % TILE_SIZE;
  canvas.height = window.innerHeight * 0.9 - (window.innerHeight * 0.9) % TILE_SIZE;

  const { w, h } = getGridScaleFromScreenSize();

  grid_width = w;
  grid_height = h;

  draw();
}

function processTurn() {
  LM.currentLevel.entities.forEach(e => {
    e.move(PLAYER);
  });
  updateUI();
}

function handleMovement() { }

function keyDownHandler(e) {
  if (!PLAYER.active) return;
  let endturn = false;

  if (e.key === "Right" || e.key === "ArrowRight" || e.key === "d") {
    const nx = PLAYER.grid_x + 1;
    const ny = PLAYER.grid_y;

    if (LM.currentLevel.GRID[nx][ny] === 0) {

      LM.currentLevel.GRID[PLAYER.grid_x][PLAYER.grid_y] = 0;
      PLAYER.grid_x += 1;
      LM.currentLevel.GRID[PLAYER.grid_x][PLAYER.grid_y] = 1;

      endturn = true;
    } else if (LM.currentLevel.isEnemy(nx, ny)) {
      PLAYER.attack(LM.currentLevel.getEnemyByCoord(nx, ny));
      endturn = true;
    } else if (LM.currentLevel.GRID[nx][ny] === 125) {
      LM.currentLevel.getPickupByCoord(nx, ny).remove();
      endturn = true;
    }
  }

  else if (e.key === "Left" || e.key === "ArrowLeft" || e.key === "a") {
    const nx = PLAYER.grid_x - 1;
    const ny = PLAYER.grid_y;

    if (LM.currentLevel.GRID[nx][ny] === 0) {

      LM.currentLevel.GRID[PLAYER.grid_x][PLAYER.grid_y] = 0;
      PLAYER.grid_x -= 1;
      LM.currentLevel.GRID[PLAYER.grid_x][PLAYER.grid_y] = 1;

      endturn = true;
    } else if (LM.currentLevel.isEnemy(nx, ny)) {
      PLAYER.attack(LM.currentLevel.getEnemyByCoord(nx, ny));
      endturn = true;
    } else if (LM.currentLevel.GRID[nx][ny] === 125) {
      LM.currentLevel.getPickupByCoord(nx, ny).remove();
      endturn = true;
    }
  }

  else if (e.key === "Up" || e.key === "ArrowUp" || e.key === "w") {
    const nx = PLAYER.grid_x;
    const ny = PLAYER.grid_y - 1;

    if (LM.currentLevel.GRID[nx][ny] === 0) {

      LM.currentLevel.GRID[PLAYER.grid_x][PLAYER.grid_y] = 0;
      PLAYER.grid_y -= 1;
      LM.currentLevel.GRID[PLAYER.grid_x][PLAYER.grid_y] = 1;

      endturn = true;
    } else if (LM.currentLevel.isEnemy(nx, ny)) {
      PLAYER.attack(LM.currentLevel.getEnemyByCoord(nx, ny));
      endturn = true;
    } else if (LM.currentLevel.GRID[nx][ny] === 125) {
      LM.currentLevel.getPickupByCoord(nx, ny).remove();
      endturn = true;
    }
  }

  else if (e.key === "Down" || e.key === "ArrowDown" || e.key === "s") {
    const nx = PLAYER.grid_x;
    const ny = PLAYER.grid_y + 1;

    if (LM.currentLevel.GRID[nx][ny] === 0) {

      LM.currentLevel.GRID[PLAYER.grid_x][PLAYER.grid_y] = 0;
      PLAYER.grid_y += 1;
      LM.currentLevel.GRID[PLAYER.grid_x][PLAYER.grid_y] = 1;

      endturn = true;
    } else if (LM.currentLevel.isEnemy(nx, ny)) {
      PLAYER.attack(LM.currentLevel.getEnemyByCoord(nx, ny));
      endturn = true;
    } else if (LM.currentLevel.GRID[nx][ny] === 125) {
      LM.currentLevel.getPickupByCoord(nx, ny).remove();
      endturn = true;
    }
  }

  else if (e.key === " " || e.code === "Space" || e.key === "Space" || e.keyCode === 32) {
    endturn = true;
  }

  if (endturn) {
    calcGridOffset();
    LM.currentLevel.triggerInactives(PLAYER.grid_x, PLAYER.grid_y);
    processTurn();
    draw();
  }
};

function mouseClickHandler(e) {
  let { x, y } = pixelToGrid(e.clientX, e.clientY, 0, 0, TILE_SIZE);
  x += grid_offset_x;
  y += grid_offset_y;
  const id = LM.currentLevel.GRID[x][y];
  if ((id != 0) && (id != 125)) {
    if (LM.currentLevel.isEnemy(x, y)) {
      const e = LM.currentLevel.getEnemyById(id);
      LOG.innerHTML += `- ${e.name} -<br> ${e.description}<br>`;
      LOG.innerHTML += `HP: ${e.hp} AC: ${e.ac} AB: ${e.ab} DMG: ${e.dd}+${e.db}<br>`;
      LOG.scrollTop = LOG.scrollHeight;
    }
  }else{
    const p = LM.currentLevel.getPickupByCoord(x,y);
    LOG.innerHTML += `- ${p.name} -<br> ${p.description}<br>`;
    LOG.scrollTop = LOG.scrollHeight;
  }

}

function calcGridOffset() {
  grid_offset_x = Math.floor(PLAYER.grid_x - (grid_width / 2));
  grid_offset_y = Math.floor(PLAYER.grid_y - (grid_height / 2));
}

export { LOG, AM, LM, PLAYER, updateUI, draw, calcGridOffset };