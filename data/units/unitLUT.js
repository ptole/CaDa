import { Crab } from "./crab.js"
import { Octopoid } from "./octopoid.js";
import { PrincePagurus } from "./princepagurus.js";
import { ABPickup } from "../pickups/abpickup.js";
import { HPPickup } from "../pickups/hppickup.js";
import { ACPickup } from "../pickups/acpickup.js";
import { Gigathraumatrix } from "./gigathraumatrix.js";
import { Gladiator } from "./gladiator.js";
import { ScrollFireball } from "../pickups/scrollfireball.js";
import { ScrollLightningbolt } from "../pickups/scrolllightningbolt.js";


const UNIT_LUT = {
    "crb": Crab,
    "8poid": Octopoid,
    "pp": PrincePagurus,
    "giga":Gigathraumatrix,
    "gladi":Gladiator,

    "slb": ScrollLightningbolt,
    "sfb":ScrollFireball,
    "hppu": HPPickup,
    "acpu": ACPickup,
    "abpu": ABPickup
}

export {UNIT_LUT};
