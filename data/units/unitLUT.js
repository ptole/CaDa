import { Crab } from "./crab.js"
import { PrincePagurus } from "./princepagurus.js";
import { ABPickup } from "./abpickup.js";
import { HPPickup } from "./hppickup.js";
import { ACPickup } from "./acpickup.js";

const UNIT_LUT = {
    "crb": Crab,
    "pp": PrincePagurus,



    "hppu": HPPickup,
    "acpu": ACPickup,
    "abpu": ABPickup
}

export {UNIT_LUT};
