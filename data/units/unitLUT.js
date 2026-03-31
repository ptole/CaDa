import { Crab } from "./crab.js"
import { PrincePagurus } from "./princepagurus.js";
import { ABPickup } from "./abpickup.js";
import { HPPickup } from "./hppickup.js";
import { ACPickup } from "./acpickup.js";
import { Gigathraumatrix } from "./gigathraumatrix.js";
import { Gladiator } from "./gladiator.js";


const UNIT_LUT = {
    "crb": Crab,
    "pp": PrincePagurus,
    "giga":Gigathraumatrix,
    "gladi":Gladiator,



    "hppu": HPPickup,
    "acpu": ACPickup,
    "abpu": ABPickup
}

export {UNIT_LUT};
