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
import { Courtjester } from "./courtjester.js";
import { Elephant } from "./elephant.js";
import { Gorilla } from "./gorilla.js";
import { Giraffe } from "./giraffe.js";
import { Demilich } from "./demilich.js";
import { Undead } from "./undead.js";
import { Gloomkaiser } from "./gloomkaiser.js";
import { Consort } from "./consort.js"
import { Dragonkin } from "./dragonkin.js";
import { SSSM } from "./sssm.js";
import { SSSMClone } from "./sssmclone.js";
import { Demon } from "./demon.js";
import { Heptagram } from "../pickups/heptagram.js";
import { Barno } from "./barno.js";


const UNIT_LUT = {
    "crb": Crab,
    "8poid": Octopoid,
    "pp": PrincePagurus,
    "giga":Gigathraumatrix,
    "gladi":Gladiator,
    "jester":Courtjester,
    "babar":Elephant,
    "gor":Gorilla,
    "grf":Giraffe,
    "lch":Demilich,
    "ud":Undead,
    "dmn":Demon,
    "gkz":Gloomkaiser,
    "con":Consort,
    "dgk":Dragonkin,
    "ssm": SSSM,
    "ssm_clone": SSSMClone,
    "barno":Barno,
    "slb": ScrollLightningbolt,
    "sfb":ScrollFireball,
    "hppu": HPPickup,
    "acpu": ACPickup,
    "abpu": ABPickup,
    "heptagram":Heptagram
}

export {UNIT_LUT};
