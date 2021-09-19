import Physics from './physics.js';
import Graphics from './graphics.js';

export default class Simulation {
    constructor() {
        console.log('Constructing simulation...');
        this.physics = new Physics();
        this.graphics = new Graphics();
        console.log('Simulation constructed!');
        
        // Redraw the scene if page is resized
        window.addEventListener('resize', function(event) {
            this.graphics.fitToContainer();
            this.graphics.drawScene(this.physics.state.boxPosition);
        });
        

        this.animate();
    }
    animate() {
        this.physics.updateBoxPosition();
        this.graphics.drawScene(this.physics.state.boxPosition);
        window.requestAnimationFrame(this.animate.bind(this));
    }
}

var simulation = new Simulation();
