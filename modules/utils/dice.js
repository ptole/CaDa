export function rollDice(d) {
    return Math.floor((Math.random() * d) + 1);
}

export function rollMultipleDice(c, d) {
    let rslt = 0;
    for (let i = 0; i < c; i++) {
        rslt += rollDice(d);
    }

    return rslt;
}