import { Crab } from "./crab.js"
import { PrincePagurus } from "./princepagurus.js";
import { ABPickup } from "../pickups/abpickup.js";
import { HPPickup } from "../pickups/hppickup.js";
import { ACPickup } from "../pickups/acpickup.js";
import { Gigathraumatrix } from "./gigathraumatrix.js";
import { Gladiator } from "./gladiator.js";
import { ScrollFireball } from "../pickups/scrollfireball.js";


const UNIT_LUT = {
    "crb": Crab,
    "pp": PrincePagurus,
    "giga":Gigathraumatrix,
    "gladi":Gladiator,


    "sfb":ScrollFireball,
    "hppu": HPPickup,
    "acpu": ACPickup,
    "abpu": ABPickup
}

export {UNIT_LUT};
