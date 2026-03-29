class DrunkenWalker {
    x;
    y;
    theta;

    constructor(x,y){
        this.x = x;
        this.y = y;
        this.theta = 2 * Math.PI * Math.random();
    }

    takeNextStep() {

        const step_size = Math.random() + 0.5;
        const dtheta = -0.4 + 0.8 * Math.random();

        this.theta += dtheta;

        this.x += step_size * Math.cos(this.theta);
        this.y += step_size * Math.sin(this.theta);

    }

}

export { DrunkenWalker };