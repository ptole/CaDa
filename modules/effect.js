class Effect {
    sprite;
    coord_list;
    sprite_offset_x = 0;
    sprite_offset_y = 0;

    constructor(sprite, coord_list) {
        this.sprite = sprite;
        this.coord_list = coord_list;
    }
}

export { Effect };