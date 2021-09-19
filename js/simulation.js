import Physics from './physics.js';
import Graphics from './graphics.js';
import { SetUpInputHandlers } from './input-handler.js';

export default class Simulation {
    constructor() {
        console.log('Constructing simulation...');
        this.physics = new Physics();
        SetUpInputHandlers(this.physics.state);
        this.graphics = new Graphics(this.physics.state.boxPosition);
        console.log('Simulation constructed!');

        this.animate();
    }

    animate() {
        this.physics.updateBoxState();
        this.graphics.drawScene(this.physics.state.boxPosition);
        window.requestAnimationFrame(this.animate.bind(this));
    }
}

var simulation = new Simulation();
