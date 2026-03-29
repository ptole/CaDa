import assets from "../data/assets.json" with { type: "json" };

class AssetManager {
    audio;
    sprites;

    constructor() {
        this.audio = {};
        this.sprites = {};

        this.loadAudio(assets.assets.audio);
        this.loadSprites(assets.assets.sprites);
    }

    loadAudio(data) {
        for (const [key,value] of Object.entries(data)){
            this.audio[value.name] = new Audio(value.path);
        }
    }
    loadSprites(data) {
        for (const [key,value] of Object.entries(data)){
            let sprt = document.createElement("img");
            sprt.src = value.path;
            this.sprites[value.name] = sprt;
        }
    }
}

export { AssetManager };